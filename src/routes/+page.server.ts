import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  // NOTE: this used to also select profile_skills ( skills ( name, type ) )
  // for the skill badges under each card, but `skills`/`profile_skills` were
  // dropped from the DB app-wide (see root CLAUDE.md's "Dropped" tables
  // list) — that embed made this whole query 400 at PostgREST ("Could not
  // find a relationship between 'profiles' and 'profile_skills'"), silently
  // swallowed here since only `data` was destructured, so the featured
  // section always rendered empty. `skills` stays in the mapped shape below
  // (always []) purely so the existing template's `{#if profile.skills...}`
  // guard keeps working — no skill-badge data source exists to replace it
  // with; that's redesign scope, not this fix-forward pass.
  const { data: profiles } = await supabase
    .from('profiles')
    .select(`
      slug,
      first_name,
      last_name,
      avatar_url,
      city
    `)
    .eq('is_featured', true)
    .eq('is_published', true)
    .limit(4);

  type RawProfile = {
    slug: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    city: string | null;
  };

  const featuredProfiles = (profiles as RawProfile[] ?? []).map((p) => ({
    slug: p.slug,
    name: [p.first_name, p.last_name].filter(Boolean).join(' ') || p.slug,
    avatarUrl: p.avatar_url ?? null,
    city: p.city ?? null,
    skills: [] as string[],
  }));

  return { featuredProfiles };
};
