import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import type { PageServerLoad } from './$types';

const PAGE_SIZE = 50;

export const load: PageServerLoad = async () => {
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  const [{ data: venues }, { data: locationRows }] = await Promise.all([
    supabase
      .from('venues')
      .select('id, name, description, type, city, country_code, site, photo, hubspot_company_id, flagged, reported, facebook, instagram, linkedin, twitter, youtube, whatsapp, rating, reviews')
      .eq('reported', false)
      .order('name', { ascending: true })
      .range(0, PAGE_SIZE - 1),
    supabase
      .from('locations')
      .select('name, iso_code')
      .eq('is_active', true)
      .order('name', { ascending: true }),
  ]);

  return {
    venues: venues ?? [],
    locations: (locationRows ?? []) as { name: string; iso_code: string }[],
    pageSize: PAGE_SIZE,
  };
};
