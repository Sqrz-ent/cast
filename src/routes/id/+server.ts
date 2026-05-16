import { redirect } from '@sveltejs/kit';

export function GET({ url }) {
	const id = url.searchParams.get('id')?.trim().toLowerCase();

	if (!id || !/^[a-z0-9-]+$/.test(id)) {
		throw redirect(302, '/');
	}

	throw redirect(301, `https://${id}.sqrz.com`);
}
