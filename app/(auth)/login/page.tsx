import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Suspense } from 'react';

// Metadata para SEO y título de pestaña
export const metadata: Metadata = {
  title: 'Iniciar Sesión | Club Manager',
  description: 'Accede a tu panel de control de gestión deportiva',
};

export default async function LoginPage() {
  // 1. Verificar sesión en el servidor (rápido y seguro)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Si ya existe usuario, lo mandamos al dashboard directamente
  if (user) {
    redirect('/dashboard');
  }

  // 3. Renderizamos el Client Component que contiene el formulario
  return (
    <main className="flex items-center justify-center min-h-screen">
      {/* Suspense es opcional aquí, pero buena práctica si el componente creciera */}
      <Suspense fallback={<div>Cargando formulario...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
