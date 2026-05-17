import type { Lang } from '$lib/i18n';

type Localized<T> = Record<Lang, T>;

export type HomeTrustReview = {
	id: number;
	name: string;
	initials: string;
	meta: Localized<string>;
	quote: Localized<string>;
	url: string;
	rating: number;
	date?: string;
	visible: boolean;
};

export const homeTrustReviews: HomeTrustReview[] = [
	{
		id: 1,
		name: 'Antonella C.',
		initials: 'AC',
		meta: {
			de: 'vor einem Jahr',
			en: '1 year ago',
		},
		quote: {
			de: 'Die Wohnung ist gemütlich, warm und hatte alles, was wir gebraucht haben. Der Vermieter ist sehr nett und hilfsbereit.',
			en: 'The apartment is cozy, warm, and had everything we needed. The host is very kind and helpful.',
		},
		url: 'https://maps.app.goo.gl/PqN21BcSHtFLULMDA',
		rating: 5,
		visible: true,
	},
	{
		id: 2,
		name: 'Marcel D. K.',
		initials: 'MDK',
		meta: {
			de: 'vor einem Jahr',
			en: '1 year ago',
		},
		quote: {
			de: 'Sehr sauber, sehr freundliche Gastgeberin, und nach dem Schlittschuhlaufen wartete ein köstliches Gebäck. Absolut empfehlenswert.',
			en: 'Very clean, very friendly host, and after ice skating there was delicious pastry waiting. Absolutely recommended.',
		},
		url: 'https://maps.app.goo.gl/UQHCWvNw8UscDjCE8',
		rating: 5,
		visible: true,
	},
	{
		id: 3,
		name: 'Aneta S.',
		initials: 'AS',
		meta: {
			de: 'vor 7 Jahren',
			en: '7 years ago',
		},
		quote: {
			de: 'Absolut empfehlenswert! Fantastische Gastgeber, komfortable und ruhige Apartments und ein großartiger Ort für einen Aktivurlaub.',
			en: 'Absolutely recommended! Fantastic hosts, comfortable and quiet apartments, and a great base for an active holiday.',
		},
		url: 'https://maps.app.goo.gl/cXgd5iJbYPmSx2ad9',
		rating: 5,
		visible: false,
	},
	{
		id: 4,
		name: 'Elodie F.',
		initials: 'EF',
		meta: {
			de: 'vor einem Jahr',
			en: '1 year ago',
		},
		quote: {
			de: 'Vollkommen empfehlenswert! Wir haben uns wie zu Hause gefühlt, die Familie Rader hat seit drei Generationen Sinn für Gastfreundschaft. Die Wohnungen sind sauber, gut ausgerüstet, und wir konnten den Aperitif am Balkon mit einem Ausblick auf die Berge genießen.',
			en: 'Highly recommended! We felt at home, and the Rader family clearly lives hospitality across generations. The apartments are clean, well equipped, and we enjoyed an aperitif on the balcony with a mountain view.',
		},
		url: 'https://maps.app.goo.gl/qjkRhtXSWpH2yNQk7',
		rating: 5,
		visible: true,
	},
	{
		id: 5,
		name: 'Martyna P.',
		initials: 'MP',
		meta: {
			de: 'vor etwa einem Monat',
			en: 'about one month ago',
		},
		quote: {
			de: 'Eine sehr angenehme Pension, alles sauber und ordentlich, das Apartment hatte alles, was wir gebraucht haben. Die Gastgeber waren sehr freundlich und überraschten uns mit Keksen zur Begrüßung und einem kleinen Neujahrsgeschenk.',
			en: 'A very pleasant guesthouse, everything clean and tidy, and the apartment had everything we needed. The hosts were very friendly and surprised us with cookies on arrival and a small New Year gift.',
		},
		url: 'https://maps.app.goo.gl/of4g3yyWQ4bvjuba8',
		rating: 5,
		date: '2026-01-20',
		visible: true,
	},
];
