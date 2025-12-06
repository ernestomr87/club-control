"use server";

import { createClient } from "@/lib/supabase/server"; // O tu cliente admin si tienes uno configurado
import { StudentSchema, StudentFormValues } from "./schemas/student";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createStudentAction(prevState: any, formData: FormData) {
  console.log(formData);

  // 1. Parse FormData to JS Object
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    birthDate: formData.get("birthDate") as string,
    address: {
      street: (formData.get("address_street") as string) || "",
      zipCode: (formData.get("address_zipCode") as string) || "",
      city: (formData.get("address_city") as string) || "",
      province: (formData.get("address_province") as string) || "",
    },
    bankAccount: (formData.get("bankAccount") as string) || "",
    playHand: formData.get("playHand") as string,
    level: formData.get("level") as string,
    isAffiliate: formData.get("isAffiliate") === "on",
    affiliationDate: (formData.get("affiliationDate") as string) || undefined,
  };

  // 2. Validate with Zod
  const validated = StudentSchema.safeParse(rawData);

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const data = validated.data;
  const supabase = await createClient();

  // 3. Create Auth User (invite by email)
  const { data: authData, error: authError } =
    await supabase.auth.admin.inviteUserByEmail(data.email, {
      data: {
        full_name: `${data.firstName} ${data.lastName}`,
        role: "student",
      },
    });

  if (authError)
    return { message: "Error inviting user: " + authError.message };

  const userId = authData.user.id;

  // 4. Insert Base Profile
  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    birth_date: data.birthDate,
    address: data.address, // JSONB field
    bank_account: data.bankAccount,
    role: "student",
  });

  if (profileError)
    return { message: "Error creating profile: " + profileError.message };

  // 5. Insert Player Profile
  const { error: playerError } = await supabase.from("player_profiles").insert({
    user_id: userId,
    play_hand: data.playHand,
    level: data.level,
    is_affiliate: data.isAffiliate,
    affiliation_date: data.affiliationDate || null,
  });

  if (playerError)
    return { message: "Error saving player data: " + playerError.message };

  revalidatePath("/students");
  redirect("/students");
}

export async function getStudents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      *,
      player_profiles (
        level,
        play_hand,
        is_affiliate
      )
    `
    )
    .eq("role", "student")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching students:", error);
    return [];
  }

  return data;
}
