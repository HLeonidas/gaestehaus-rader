export type Accommodation = {
	key: number;
	slug: string;
	title: string;
	subtitle: string;
	description: string[];
	images: {
		main: string;
		gallery: string[];
	};
	attributes: {
		size: string;
		floor: string;
		view: string;
		guests: string;
	};
	amenities: string[];
	floorplanImage: string;
	pricePerNightBase: number;
	priceMatrix: Array<{ period: string; pricePerNight: string; extraPerson: string }>;
	reviews: Array<{ name: string; rating: number; text: string }>;
	cardMeta: string;
	badgeLabel?: string | null;
	typeLabel: string;
	detailMeta: string;
	detailBody: string;
};

export const accommodations: Accommodation[] = [
	{
		key: 1,
		slug: 'nr-3',
		title: 'Nº 3',
		subtitle: 'Helles Apartment mit Balkon',
		description: [
			'Großzügig geschnittenes Appartement mit viel Tageslicht und warmen Holzoberflächen.',
			'Ideal für Familien oder Paare, die die Bergluft am Balkon genießen möchten.',
		],
		images: {
			main: '/images/room-1.jpg',
			gallery: ['/images/balkon-ausblick.jpg', '/images/house-summer.jpg', '/images/gitschtal.jpg'],
		},
		attributes: {
			size: '45 m²',
			floor: '1. OG',
			view: 'Bergblick',
			guests: '2–4 Gäste',
		},
		amenities: ['wifi', 'balcony', 'mountain', 'coffee'],
		floorplanImage: '/images/room-1.jpg',
		pricePerNightBase: 150,
		priceMatrix: [
			{ period: 'Nebensaison', pricePerNight: '€ 150', extraPerson: '€ 10' },
			{ period: 'Hauptsaison', pricePerNight: '€ 170', extraPerson: '€ 10' },
			{ period: 'Winter', pricePerNight: '€ 180', extraPerson: '€ 10' },
		],
		reviews: [
			{ name: 'Maria S.', rating: 5, text: 'Sehr gemütlich, perfekte Lage und super sauber.' },
			{ name: 'Thomas K.', rating: 4, text: 'Toller Balkon und viel Platz für die Familie.' },
		],
		cardMeta: '45 m² · 2–4 Gäste · Bergblick',
		badgeLabel: 'Beliebt',
		typeLabel: 'Apartment',
		detailMeta: '45 m² · 2–4 Gäste',
		detailBody: 'Großzügiges Apartment mit Balkon und Blick auf die Berge.',
	},
	{
		key: 2,
		slug: 'nr-2',
		title: 'Nº 2',
		subtitle: 'Ruhiges Apartment mit Talblick',
		description: [
			'Ruhig gelegenes Appartement mit hochwertigen Materialien und klaren Linien.',
			'Perfekt für Gäste, die Privatsphäre und einen entspannten Rückzugsort suchen.',
		],
		images: {
			main: '/images/room-2.jpg',
			gallery: ['/images/house-winter.jpg', '/images/balkon-ausblick.jpg', '/images/gitschtal.jpg'],
		},
		attributes: {
			size: '32 m²',
			floor: 'EG',
			view: 'Talblick',
			guests: '2 Gäste',
		},
		amenities: ['wifi', 'balcony', 'coffee'],
		floorplanImage: '/images/room-2.jpg',
		pricePerNightBase: 120,
		priceMatrix: [
			{ period: 'Nebensaison', pricePerNight: '€ 120', extraPerson: '€ 10' },
			{ period: 'Hauptsaison', pricePerNight: '€ 135', extraPerson: '€ 10' },
			{ period: 'Winter', pricePerNight: '€ 145', extraPerson: '€ 10' },
		],
		reviews: [
			{ name: 'Claudia M.', rating: 5, text: 'Sehr ruhig und geschmackvoll eingerichtet.' },
			{ name: 'Peter L.', rating: 4, text: 'Perfekt für zwei, schöner Ausblick.' },
		],
		cardMeta: '32 m² · 2 Gäste · Talblick',
		badgeLabel: 'Exklusiv',
		typeLabel: 'Apartment',
		detailMeta: '32 m² · 2 Gäste',
		detailBody: 'Ruhiges Apartment mit Talblick und hochwertiger Ausstattung.',
	},
	{
		key: 3,
		slug: 'nr-1',
		title: 'Nº 1',
		subtitle: 'Gemütliches Apartment mit Waldblick',
		description: [
			'Gemütliches Appartement mit naturverbundenem Flair und viel Ruhe.',
			'Ideal für Paare oder Alleinreisende, die abschalten möchten.',
		],
		images: {
			main: '/images/room-3.jpg',
			gallery: ['/images/house-summer.jpg', '/images/balkon-ausblick.jpg', '/images/gitschtal.jpg'],
		},
		attributes: {
			size: '28 m²',
			floor: '1. OG',
			view: 'Waldblick',
			guests: '1–2 Gäste',
		},
		amenities: ['wifi', 'kitchen', 'parking'],
		floorplanImage: '/images/room-3.jpg',
		pricePerNightBase: 110,
		priceMatrix: [
			{ period: 'Nebensaison', pricePerNight: '€ 110', extraPerson: '€ 10' },
			{ period: 'Hauptsaison', pricePerNight: '€ 125', extraPerson: '€ 10' },
			{ period: 'Winter', pricePerNight: '€ 135', extraPerson: '€ 10' },
		],
		reviews: [
			{ name: 'Lukas R.', rating: 5, text: 'Sehr gemütlich und super ruhig gelegen.' },
			{ name: 'Sophie B.', rating: 4, text: 'Perfekt für ein entspanntes Wochenende.' },
		],
		cardMeta: '28 m² · 1–2 Gäste · Waldblick',
		badgeLabel: null,
		typeLabel: 'Apartment',
		detailMeta: '28 m² · 1–2 Gäste',
		detailBody: 'Gemütliches Apartment mit Waldblick und Kochnische.',
	},
];

export const accommodationBySlug = (slug: string) =>
	accommodations.find((accommodation) => accommodation.slug === slug);
