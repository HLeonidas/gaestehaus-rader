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
	reviews: Array<{ name: string; rating: number; text: string, date?: string }>;
	cardMeta: string;
	badgeLabel?: string | null;
	typeLabel: string;
	detailMeta: string;
	detailBody: string;
};

export const accommodations: Accommodation[] = [
	{
		key: 3,
		slug: 'nr-1',
		title: 'Nº 1',
		subtitle: 'Gemütliche Ferienwohnung mit Balkon',
		description: [
			'Gemütliches Appartement mit Balkon und viel Ruhe.',
			'Ideal für Paare oder Alleinreisende, die abschalten möchten.',
			'Küche mit Sitzecke, Bad mit Dusche und WC – Sicht nach Osten (1–3 Personen).',
		],
		images: {
			main: '/images/room-1.jpg',
			gallery: [
				'/images/room-1-bedroom.jpg',
				'/images/room-1-living.jpg',
				'/images/room-1-kitchen.jpg',
				'/images/room-1-balcony.jpg',
				'/images/room-1-view.jpg',
			],
		},
		attributes: {
			size: '35 m²',
			floor: '1',
			view: 'Osten',
			guests: '1–3 Personen',
		},
		amenities: [
			'balkon',
			'fernseher',
			'kueche',
			'kuehlschrank',
			'mikrowelle',
			'herd',
			'ausziehcouch',
			'wifi',
			'badezimmer',
		],
		floorplanImage: '/images/floorplan-nr-1.png',
		pricePerNightBase: 75,
		priceMatrix: [
			{ period: 'Sommer', pricePerNight: '€ 75,-', extraPerson: '€ 10,-' },
			{ period: 'Winter', pricePerNight: '€ 85,-', extraPerson: '€ 10,-' },
		],
		reviews: [
			{
				name: 'Lenka',
				rating: 5,
				date: '2023-08-15',
				text: 'Sehr gute Unterkunft in einem ruhigen Dorf. Die Besitzer sind tolle Leute, nett und hilfsbereit. Jedes Zimmer hatte eine Küche, was wir sehr zu schätzen wussten. Das Gästehaus Rader ist eine sehr gute Wahl für Familien mit Kindern. Das Haus war sauber und gut ausgestattet. Das Parken war völlig problemlos direkt neben dem Gästehaus.',
			},
		],
		cardMeta: '35 m² · 1–3 Personen · Osten',
		badgeLabel: null,
		typeLabel: 'Appartement',
		detailMeta: '35 m² · 1–3 Personen · Osten',
		detailBody: 'Gemütliche Ferienwohnung mit Balkon – Küche mit Sitzecke – Bad mit Dusche und WC – Sicht nach Osten (1–3 Personen).',
	},
	{
		key: 2,
		slug: 'nr-2',
		title: 'Nº 2',
		subtitle: 'Gemütliche Ferienwohnung mit Balkon',
		description: [
			'Gemütliche Ferienwohnung mit Balkon.',
			'Küche mit Sitzecke, Bad mit Dusche und WC – Sicht nach Osten und Westen (1–3 Personen).',
		],
		images: {
			main: '/images/room-2.jpg',
			gallery: [
				'/images/room-2-bedroom.jpg',
				'/images/room-2-bedroom-2.jpg',
				'/images/room-2-living.jpg',
				'/images/room-2-sofa.jpg',
				'/images/room-2-balcony.jpg',
			],
		},
		attributes: {
			size: '35 m²',
			floor: '1',
			view: 'Osten/Westen',
			guests: '1–3 Personen',
		},
		amenities: [
			'balkon',
			'fernseher',
			'kueche',
			'kuehlschrank',
			'mikrowelle',
			'herd',
			'wifi',
			'badezimmer',
		],
		floorplanImage: '/images/floorplan-nr-2.png',
		pricePerNightBase: 75,
		priceMatrix: [
			{ period: 'Sommer', pricePerNight: '€ 75,-', extraPerson: '€ 10,-' },
			{ period: 'Winter', pricePerNight: '€ 85,-', extraPerson: '€ 10,-' },
		],
		reviews: [
			{
				name: 'Lenka',
				rating: 5,
				date: '2023-08-15',
				text:
					'Sehr gute Unterkunft in einem ruhigen Dorf. Die Besitzer sind tolle Leute, nett und hilfsbereit. Das Haus war sauber und gut ausgestattet. Parken problemlos direkt neben dem Gästehaus.',
			},
		],
		cardMeta: '35 m² · 1–3 Personen · Osten/Westen',
		badgeLabel: null,
		typeLabel: 'Appartement',
		detailMeta: '35 m² · 1–3 Personen · Osten/Westen',
		detailBody:
			'Gemütliche Ferienwohnung mit Balkon – Küche mit Sitzecke – Bad mit Dusche und WC – Sicht nach Osten und Westen (1–3 Personen).',

	},
	{
		key: 1,
		slug: 'nr-3',
		title: 'Nº 3',
		subtitle: 'Gemütliche Ferienwohnung mit Balkon',
		description: [
			'Gemütliche Ferienwohnung mit Balkon.',
			'Küche mit Sitzecke, Bad mit Dusche und WC – Sicht nach Süden (1–2 Personen).',
		],
		images: {
			main: '/images/room-3.jpg',
			gallery: [
				'/images/room-3-bedroom.jpg',
				'/images/room-3-living.jpg',
				'/images/room-3-hallway.jpg',
				'/images/room-3-kitchen.jpg',
				'/images/room-3-view.jpg',
			],
		},
		attributes: {
			size: '28 m²',
			floor: '1',
			view: 'Süden',
			guests: '1–2 Personen',
		},
		amenities: [
			'balkon',
			'fernseher',
			'kueche',
			'kuehlschrank',
			'mikrowelle',
			'herd',
			'wifi',
			'badezimmer',
		],
		floorplanImage: '/images/floorplan-nr-3.png',
		pricePerNightBase: 65,
		priceMatrix: [
			{ period: 'Sommer', pricePerNight: '€ 65,-', extraPerson: '-' },
			{ period: 'Winter', pricePerNight: '€ 75,-', extraPerson: '-' },
		],
		reviews: [
			{
				name: 'Milena',
				rating: 5,
				text:
					'Die Gastgeber-Familie war super freundlich und sehr zuvorkommend. Sehr persönlicher Umgang. Die Lage war perfekt. Man konnte alles gut sowohl mit dem Auto als auch zu Fuß oder mit dem Fahrrad erreichen. Alles in allem war es ein toller Urlaub im schönen Österreich den wir gerne im Gästehaus Rader wiederholen möchten!',
			},
		],
		cardMeta: '28 m² · 1–2 Personen · Süden',
		badgeLabel: null,
		typeLabel: 'Appartement',
		detailMeta: '28 m² · 1–2 Personen · Süden',
		detailBody:
			'Gemütliche Ferienwohnung mit Balkon – Küche mit Sitzecke – Bad mit Dusche und WC – Sicht nach Süden (1–2 Personen).',

	}
];

export const accommodationBySlug = (slug: string) =>
	accommodations.find((accommodation) => accommodation.slug === slug);
