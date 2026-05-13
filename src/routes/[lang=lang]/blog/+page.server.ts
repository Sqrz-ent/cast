import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/blog';
import { normalizeLocale } from '$lib/i18n';

export const load: PageServerLoad = async ({ params }) => {
	const locale = normalizeLocale(params.lang);

	return {
		posts: await getBlogPosts(locale),
		locale
	};
};
