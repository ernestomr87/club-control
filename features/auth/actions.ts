'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AuthSchema } from './schema';
import { revalidatePath } from 'next/cache';

export type AuthState = {
  error?: string | null;
  success?: boolean;
};

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const data = Object.fromEntries(formData);
  const parsed = AuthSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Datos inválidos. Revisa los campos." };
  }

  const supabase = await createClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function registerAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const data = Object.fromEntries(formData);
  const parsed = AuthSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Datos inválidos." };
  }

  const supabase = await createClient();

  // Necesitas configurar la URL del sitio en Supabase Dashboard -> Auth -> URL Configuration
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      // Redirige aquí tras confirmar email
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard&verified=true`, 
    },
  });

  if (error) {
    return { error: error.message };
  }


  return { success: true, error: null };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}
