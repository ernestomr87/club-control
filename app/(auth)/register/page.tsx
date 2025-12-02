import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { RegisterForm } from '@/features/auth/components/RegisterForm'; // (A crear abajo)

export const metadata: Metadata = {
  title: 'Crear Cuenta | Club Manager',
  description: 'Únete a la plataforma de gestión de clubes deportivos',
};

export default async function RegisterPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <RegisterForm />
    </main>
  );
}
