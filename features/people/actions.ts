'use server';

import { createClient } from '@/lib/supabase/server'; // O tu cliente admin si tienes uno configurado
import { StudentSchema, StudentFormValues } from './schemas/student';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createStudentAction(prevState: any, formData: FormData) {
  // 1. Parsear FormData a Objeto JS (un poco de magia manual o usar librerías)
  const rawData = {
    firstName: formData.get('firstName'),
    // ... mapear resto de campos
    isAffiliate: formData.get('isAffiliate') === 'on',
  };

  // 2. Validar con Zod
  const validated = StudentSchema.safeParse(rawData);
  
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const data = validated.data;
  const supabase = await createClient();

  // 3. Lógica de Negocio: Crear Usuario Auth (Simulado aquí)
  // En un CRM real, el admin suele invitar al usuario por email
  const { data: authData, error: authError } = await supabase.auth.admin.inviteUserByEmail(data.email, {
    data: { 
        full_name: `${data.firstName} ${data.lastName}`,
        role: 'student'
    } 
    // Esto envía un email mágico de "Configura tu password" al alumno
  });

  if (authError) return { message: "Error al invitar usuario: " + authError.message };

  const userId = authData.user.id;

  // 4. Insertar Perfil Base
  const { error: profileError } = await supabase.from('profiles').insert({
    id: userId,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    birth_date: data.birthDate,
    address: data.address,
    role: 'student'
  });

  if (profileError) return { message: "Error creando perfil" };

  // 5. Insertar Perfil Deportivo (Solo si es Alumno/Afiliado)
  const { error: playerError } = await supabase.from('player_profiles').insert({
    user_id: userId,
    play_hand: data.playHand,
    level: data.level,
    is_affiliate: data.isAffiliate,
    affiliation_date: data.affiliationDate || null,
  });

  if (playerError) return { message: "Error guardando datos deportivos" };

  revalidatePath('/dashboard/students');
  redirect('/dashboard/students');
}

export async function getStudents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      player_profiles (
        level,
        play_hand,
        is_affiliate
      )
    `)
    .eq('role', 'student')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching students:', error);
    return [];
  }

  return data;
}
