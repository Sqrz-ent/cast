import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob('/src/content/blog/*.md');

	for (const [path, resolver] of Object.entries(modules)) {
		const post = (await resolver()) as any;
		const filenameSlug = path.split('/').pop()?.replace(/\.md$/, '');
		const slug = post.metadata.slug ?? filenameSlug;

		if (slug === params.slug) {
			return {
				content: post.default,
				meta: post.metadata
			};
		}
	}

	throw error(404, `Post not found: ${params.slug}`);
};
