import type { Lang } from '$lib/i18n';

type Localized<T> = Record<Lang, T>;

export type Accommodation = {
	key: number;
	slug: string;
	title: string;
	subtitle: Localized<string>;
	description: Localized<string[]>;
	images: {
		main: string;
		gallery: string[];
	};
	attributes: {
		size: string;
		floor: string;
		view: Localized<string>;
		guests: Localized<string>;
	};
	amenities: string[];
	floorplanImage: string;
	pricePerNightBase: number;
	priceMatrix: Array<{
		season: Localized<string>;
		period: Localized<string>;
		pricePerNight: string;
		minStay: Localized<string>;
		extraPerson: Localized<string>;
	}>;
	reviews: Array<{ name: string; rating: number; text: string; date?: string }>;
	cardMeta: Localized<string>;
	badgeLabel?: string | null;
	typeLabel: Localized<string>;
	detailMeta: Localized<string>;
	detailBody: Localized<string>;
};

export const accommodations: Accommodation[] = [
	{
		key: 3,
		slug: 'nr-1',
		title: 'Nº 1',
		subtitle: {
			de: 'Helle Ferienwohnung mit Balkon und Morgensonne',
			en: 'Bright apartment with balcony and morning sun',
		},
		description: {
			de: [
				'Genießen Sie erholsame Tage in unserem liebevoll eingerichteten Appartement mit Balkon und herrlicher Aussicht.',
				'Ideal für Paare oder Alleinreisende, die Ruhe suchen und neue Energie tanken möchten.',
				'Das Appartement verfügt über eine voll ausgestattete Küche mit gemütlicher Sitzecke, ein Badezimmer mit Dusche und WC sowie einen sonnigen Balkon mit Blick nach Osten. Geeignet für 1–3 Personen.',
			],
			en: [
				'Enjoy relaxing days in our lovingly furnished apartment with balcony and a beautiful view.',
				'Ideal for couples or solo travelers seeking peace and a chance to recharge.',
				'The apartment features a fully equipped kitchen with a cozy dining nook, a bathroom with shower and toilet, and a sunny balcony facing east. Suitable for 1-3 guests.',
			],
		},
		images: {
			main: '/images/1/main.jpg',
			gallery: [
				'/images/1/dining-room.jpg',
				'/images/1/living-room.jpg',
				'/images/1/balcony.jpg',
				'/images/1/balcony-seating.jpg',
				'/images/1/bedroom.jpg',
			],
		},
		attributes: {
			size: '35 m²',
			floor: '1',
			view: {
				de: 'Osten',
				en: 'East',
			},
			guests: {
				de: '1-3 Personen',
				en: '1-3 guests',
			},
		},
		amenities: ['balkon', 'fernseher', 'kueche', 'ausziehcouch', 'wifi', 'badezimmer'],
		floorplanImage: '/images/1/floorplan.png',
		pricePerNightBase: 75,
		priceMatrix: [
			{
				season: {
					de: 'Sommer',
					en: 'Summer',
				},
				period: {
					de: '01. Apr - 30. Sep',
					en: 'Apr 01 - Sep 30',
				},
				pricePerNight: '€ 75,-',
				minStay: {
					de: '3 Nächte',
					en: '3 nights',
				},
				extraPerson: {
					de: '€ 10,- pro Nacht',
					en: '€ 10,- per night',
				},
			},
			{
				season: {
					de: 'Winter',
					en: 'Winter',
				},
				period: {
					de: '20. Dez - 06. Jan',
					en: 'Dec 20 - Jan 06',
				},
				pricePerNight: '€ 85,-',
				minStay: {
					de: '3 Nächte',
					en: '3 nights',
				},
				extraPerson: {
					de: '€ 10,- pro Nacht',
					en: '€ 10,- per night',
				},
			},
		],
		reviews: [
			{
				name: 'Lenka',
				rating: 5,
				date: '2023-08-15',
				text:
					'Sehr gute Unterkunft in einem ruhigen Dorf. Die Besitzer sind tolle Leute, nett und hilfsbereit. Jedes Zimmer hatte eine Küche, was wir sehr zu schätzen wussten. Das Gästehaus Rader ist eine sehr gute Wahl für Familien mit Kindern. Das Haus war sauber und gut ausgestattet. Das Parken war völlig problemlos direkt neben dem Gästehaus.',
			},
		],
		cardMeta: {
			de: '35 m² · 1-3 Personen · Osten',
			en: '35 m² · 1-3 guests · East',
		},
		badgeLabel: null,
		typeLabel: {
			de: 'Appartement',
			en: 'Apartment',
		},
		detailMeta: {
			de: '35 m² · 1-3 Personen · Osten',
			en: '35 m² · 1-3 guests · East',
		},
		detailBody: {
			de: 'Helle Ferienwohnung mit Balkon und Morgensonne - Küche mit Sitzecke - Bad mit Dusche und WC - Balkon mit Blick nach Osten (1-3 Personen).',
			en: 'Bright apartment with balcony and morning sun - kitchen with dining nook - bathroom with shower and toilet - east-facing balcony (1-3 guests).',
		},
	},
	{
		key: 2,
		slug: 'nr-2',
		title: 'Nº 2',
		subtitle: {
			de: 'Charmante Dachgeschosswohnung mit Balkon',
			en: 'Charming top-floor apartment with balcony',
		},
		description: {
			de: [
				'Unser gemütliches Dachgeschoss-Appartement verbindet alpine Behaglichkeit mit lichtdurchfluteten Räumen.',
				'Genießen Sie morgens die Sonne aus Osten und abends den Blick Richtung Westen – direkt vom Balkon aus.',
				'Die Wohnung verfügt über eine voll ausgestattete Küche mit Sitzecke, ein Badezimmer mit Dusche und WC sowie zwei gemütliche Schlafbereiche. Ideal für 1–3 Personen, die Komfort und Ruhe schätzen.',
			],
			en: [
				'Our cozy top-floor apartment blends alpine comfort with light-filled rooms.',
				'Enjoy morning sun from the east and evening views to the west right from the balcony.',
				'The apartment features a fully equipped kitchen with dining nook, a bathroom with shower and toilet, and two cozy sleeping areas. Ideal for 1-3 guests who value comfort and quiet.',
			],
		},
		images: {
			main: '/images/2/main.jpg',
			gallery: [
				'/images/2/single-bed.png',
				'/images/2/room-detail.png',
				'/images/2/dresser.png',
				'/images/2/kitchen.png',
			],
		},
		attributes: {
			size: '35 m²',
			floor: '1',
			view: {
				de: 'Osten/Westen',
				en: 'East/West',
			},
			guests: {
				de: '1-3 Personen',
				en: '1-3 guests',
			},
		},
		amenities: ['balkon', 'fernseher', 'kueche', 'ausziehcouch', 'wifi', 'badezimmer'],
		floorplanImage: '/images/2/floorplan.png',
		pricePerNightBase: 75,
		priceMatrix: [
			{
				season: {
					de: 'Sommer',
					en: 'Summer',
				},
				period: {
					de: '01. Apr - 30. Sep',
					en: 'Apr 01 - Sep 30',
				},
				pricePerNight: '€ 75,-',
				minStay: {
					de: '3 Nächte',
					en: '3 nights',
				},
				extraPerson: {
					de: '€ 10,- pro Nacht',
					en: '€ 10,- per night',
				},
			},
			{
				season: {
					de: 'Winter',
					en: 'Winter',
				},
				period: {
					de: '20. Dez - 06. Jan',
					en: 'Dec 20 - Jan 06',
				},
				pricePerNight: '€ 85,-',
				minStay: {
					de: '3 Nächte',
					en: '3 nights',
				},
				extraPerson: {
					de: '€ 10,- pro Nacht',
					en: '€ 10,- per night',
				},
			},
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
		cardMeta: {
			de: '35 m² · 1-3 Personen · Osten/Westen',
			en: '35 m² · 1-3 guests · East/West',
		},
		badgeLabel: null,
		typeLabel: {
			de: 'Appartement',
			en: 'Apartment',
		},
		detailMeta: {
			de: '35 m² · 1-3 Personen · Osten/Westen',
			en: '35 m² · 1-3 guests · East/West',
		},
		detailBody: {
			de: 'Helle Ferienwohnung mit Balkon und Panoramaausblick - Küche mit Sitzecke - Bad mit Dusche und WC - Sicht nach Osten und Westen (1-3 Personen).',
			en: 'Bright apartment with balcony and panoramic view - kitchen with dining nook - bathroom with shower and toilet - east and west views (1-3 guests).',
		},
	},
	{
		key: 1,
		slug: 'nr-3',
		title: 'Nº 3',
		subtitle: {
			de: 'Sonnige Ferienwohnung mit Südbalkon und Gartenblick',
			en: 'Sunny apartment with south-facing balcony and garden view',
		},
		description: {
			de: [
				'Dieses helle Appartement bietet viel Raum zum Entspannen und Wohlfühlen.',
				'Durch die Südausrichtung genießen Sie den ganzen Tag Sonne und einen schönen Blick in den Garten.',
				'Mit voll ausgestatteter Küche, gemütlicher Sitzecke, Bad mit Dusche/WC und Balkon ist die Wohnung ideal für 1–2 Personen.',
			],
			en: [
				'This bright apartment offers plenty of space to relax and unwind.',
				'Thanks to the south-facing orientation, you can enjoy sunshine all day and a lovely garden view.',
				'With a fully equipped kitchen, cozy dining nook, bathroom with shower/toilet, and a balcony, the apartment is ideal for 1-2 guests.',
			],
		},
		images: {
			main: '/images/3/main.jpg',
			gallery: [
				'/images/3/view.jpeg',
				'/images/3/kitchen-tools.jpeg',
				'/images/3/sofa.jpeg',
				'/images/3/bed.jpeg',
				'/images/3/shoe-rack.jpeg',
			],
		},
		attributes: {
			size: '28 m²',
			floor: '1',
			view: {
				de: 'Süden',
				en: 'South',
			},
			guests: {
				de: '1-2 Personen',
				en: '1-2 guests',
			},
		},
		amenities: ['balkon', 'fernseher', 'kueche', 'wifi', 'badezimmer'],
		floorplanImage: '/images/3/floorplan.png',
		pricePerNightBase: 65,
		priceMatrix: [
			{
				season: {
					de: 'Sommer',
					en: 'Summer',
				},
				period: {
					de: '01. Apr - 30. Sep',
					en: 'Apr 01 - Sep 30',
				},
				pricePerNight: '€ 65,-',
				minStay: {
					de: '3 Nächte',
					en: '3 nights',
				},
				extraPerson: {
					de: '/',
					en: '/',
				},
			},
			{
				season: {
					de: 'Winter',
					en: 'Winter',
				},
				period: {
					de: '20. Dez - 06. Jan',
					en: 'Dec 20 - Jan 06',
				},
				pricePerNight: '€ 75,-',
				minStay: {
					de: '3 Nächte',
					en: '3 nights',
				},
				extraPerson: {
					de: '/',
					en: '/',
				},
			},
		],
		reviews: [
			{
				name: 'Milena',
				rating: 5,
				text:
					'Die Gastgeber-Familie war super freundlich und sehr zuvorkommend. Sehr persönlicher Umgang. Die Lage war perfekt. Man konnte alles gut sowohl mit dem Auto als auch zu Fuß oder mit dem Fahrrad erreichen. Alles in allem war es ein toller Urlaub im schönen Österreich den wir gerne im Gästehaus Rader wiederholen möchten!',
			},
		],
		cardMeta: {
			de: '28 m² · 1-2 Personen · Süden',
			en: '28 m² · 1-2 guests · South',
		},
		badgeLabel: null,
		typeLabel: {
			de: 'Appartement',
			en: 'Apartment',
		},
		detailMeta: {
			de: '28 m² · 1-2 Personen · Süden',
			en: '28 m² · 1-2 guests · South',
		},
		detailBody: {
			de: 'Sonnige Ferienwohnung mit Südbalkon und Gartenblick - Küche mit Sitzecke - Bad mit Dusche und WC - Südausrichtung (1-2 Personen).',
			en: 'Sunny apartment with south-facing balcony and garden view - kitchen with dining nook - bathroom with shower and toilet - south-facing (1-2 guests).',
		},
	},
];

export const accommodationBySlug = (slug: string) =>
	accommodations.find((accommodation) => accommodation.slug === slug);
