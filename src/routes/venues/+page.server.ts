import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import type { PageServerLoad } from './$types';

const PAGE_SIZE = 50;

export const load: PageServerLoad = async () => {
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  const [{ data: venues }, { data: countryRows }] = await Promise.all([
    supabase
      .from('venues')
      .select('id, name, description, type, city, country_code, site, photo, hubspot_company_id, flagged, reported')
      .eq('reported', false)
      .order('name', { ascending: true })
      .range(0, PAGE_SIZE - 1),
    supabase
      .from('venues')
      .select('country_code')
      .eq('reported', false)
      .not('country_code', 'is', null)
      .order('country_code', { ascending: true }),
  ]);

  const seen = new Set<string>();
  const countryCodes: string[] = [];
  for (const row of countryRows ?? []) {
    if (row.country_code && !seen.has(row.country_code)) {
      seen.add(row.country_code);
      countryCodes.push(row.country_code);
    }
  }

  return {
    venues: venues ?? [],
    countryCodes,
    pageSize: PAGE_SIZE,
  };
};
