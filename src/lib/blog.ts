import { error } from '@sveltejs/kit';
import { defaultLocale, normalizeLocale, type Locale } from '$lib/i18n';

type BlogModule = {
	default: unknown;
	metadata: {
		title: string;
		date: string;
		description?: string;
		slug?: string;
		lang?: Locale;
		author?: string;
		authorSlug?: string;
	};
};

const modules = import.meta.glob<BlogModule>('/src/content/blog/*.md');

function getFilenameSlug(path: string) {
	return path.split('/').pop()?.replace(/\.md$/, '');
}

function getPostLocale(metadata: BlogModule['metadata']) {
	return normalizeLocale(metadata.lang ?? defaultLocale);
}

export async function getBlogPosts(locale: Locale = defaultLocale) {
	const posts = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const post = await resolver();
			const filenameSlug = getFilenameSlug(path);

			return {
				title: post.metadata.title,
				date: post.metadata.date,
				description: post.metadata.description,
				slug: post.metadata.slug ?? filenameSlug,
				lang: getPostLocale(post.metadata),
				author: post.metadata.author ?? null,
				authorSlug: post.metadata.authorSlug ?? null
			};
		})
	);

	return posts
		.filter((post) => post.lang === locale)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string, locale: Locale = defaultLocale) {
	for (const [path, resolver] of Object.entries(modules)) {
		const post = await resolver();
		const filenameSlug = getFilenameSlug(path);
		const postSlug = post.metadata.slug ?? filenameSlug;
		const postLocale = getPostLocale(post.metadata);

		if (postSlug === slug && postLocale === locale) {
			return {
				content: post.default,
				meta: {
					...post.metadata,
					slug: postSlug,
					lang: postLocale
				}
			};
		}
	}

	throw error(404, `Post not found: ${slug}`);
}
