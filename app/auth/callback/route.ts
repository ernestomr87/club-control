// src/app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';
  const verified = searchParams.get('verified'); // Capturamos el flag

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Construimos la URL destino
      const forwardUrl = new URL(next, origin);
      
      // Si venimos de verificar email, pasamos el parametro para mostrar el toast/alerta
      if (verified) {
        forwardUrl.searchParams.set('verified', 'true');
      }
      
      return NextResponse.redirect(forwardUrl);
    }
  }

  // Error
  return NextResponse.redirect(`${origin}/login?error=auth_code_error`);
}
