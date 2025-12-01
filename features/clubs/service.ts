import 'server-only'; // Asegura que esto nunca se filtre al cliente
import { createClient } from '@/lib/supabase/server';

export async function getClubsByOwner(userId: string) {
  const supabase = await createClient();
  // Next.js 16 cache tag system
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('owner_id', userId);
    
  if (error) throw error;
  return data;
}
