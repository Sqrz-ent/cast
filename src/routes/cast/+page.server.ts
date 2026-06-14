import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import { error as httpError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);

	const { data: profiles, error: profilesError } = await supabase
		.from('profiles')
		.select(
			`
      slug,
      first_name,
      last_name,
      avatar_url,
      city,
      profile_skills (
        skills ( name, type )
      )
    `
		)
		.eq('is_published', true)
		.eq('is_featured', true)
		.order('created_at', { ascending: false })
		.limit(100);

	if (profilesError) {
		throw httpError(500, 'Unable to load cast profiles');
	}

	type RawProfile = {
		slug: string;
		first_name: string | null;
		last_name: string | null;
		avatar_url: string | null;
		city: string | null;
		profile_skills: { skills: { name: string; type: string } | null }[];
	};

	const featuredProfiles = ((profiles as RawProfile[]) ?? []).map((p) => ({
		slug: p.slug,
		name: [p.first_name, p.last_name].filter(Boolean).join(' ') || p.slug,
		avatarUrl: p.avatar_url ?? null,
		city: p.city ?? null,
		skills: p.profile_skills
			.map((ps) => ps.skills)
			.filter((s): s is { name: string; type: string } => s?.type === 'skill')
			.map((s) => s.name)
			.slice(0, 3)
	}));

	return { featuredProfiles };
};
