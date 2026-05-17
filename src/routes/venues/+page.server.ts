import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  const { data: venues } = await supabase
    .from('venues')
    .select('id, name')
    .order('name', { ascending: true });

  return { venues: venues ?? [] };
};
