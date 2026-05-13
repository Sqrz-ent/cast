import type { PageServerLoad } from './$types';
import { defaultLocale } from '$lib/i18n';
import { getBlogPosts } from '$lib/blog';

export const load: PageServerLoad = async () => {
	return {
		posts: await getBlogPosts(defaultLocale),
		locale: defaultLocale
	};
};
