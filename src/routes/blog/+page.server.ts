import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const modules = import.meta.glob('/src/content/blog/*.md', { eager: true });

	const posts = Object.entries(modules).map(([path, mod]: [string, any]) => {
		const filenameSlug = path.split('/').pop()?.replace(/\.md$/, '');

		return {
			title: mod.metadata.title,
			date: mod.metadata.date,
			description: mod.metadata.description,
			slug: mod.metadata.slug ?? filenameSlug,
			author: mod.metadata.author ?? null,
			authorSlug: mod.metadata.authorSlug ?? null,
		};
	});

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { posts };
};
