import type { PageLoad } from './$types';
import { getBlogPost } from '$lib/blog';
import { normalizeLocale } from '$lib/i18n';

export const load: PageLoad = async ({ params }) => {
	return getBlogPost(params.slug, normalizeLocale(params.lang));
};
