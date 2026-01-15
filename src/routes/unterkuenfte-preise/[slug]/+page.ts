import { error } from '@sveltejs/kit';
import { accommodationBySlug } from '$lib/data/accommodations';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const accommodation = accommodationBySlug(params.slug);

	if (!accommodation) {
		throw error(404, 'Unterkunft nicht gefunden');
	}

	return { accommodation };
};
