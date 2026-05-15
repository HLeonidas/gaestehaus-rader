import type { ComponentType } from 'svelte';
import type { Lang } from '$lib/i18n';
import {
	Bike,
	CableCar,
	Footprints,
	Mountain,
	MountainSnow,
	PersonStanding,
	Route,
	Snowflake,
	Users,
	Utensils,
	Waves,
} from 'lucide-svelte';

export type SeasonKey = 'summer' | 'winter';
export type ActivityFilterKey = 'hiking' | 'active' | 'winter' | 'family' | 'lakes' | 'culture';
type LocalizedText = Record<Lang, string>;
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ExperienceLinkType = 'google' | 'nassfeld' | 'bergfex' | 'website';
export type ExperienceLink = {
	urlType: ExperienceLinkType;
	url: string;
	label?: LocalizedText;
};

export type ExperienceEvent = {
	id: string;
	season: SeasonKey;
	activities: ActivityFilterKey[];
	icon: ComponentType;
	kicker: LocalizedText;
	title: LocalizedText;
	description?: LocalizedText;
	image: string;
	className?: string;
	badge?: LocalizedText;
	badgeTier?: 'top' | 'tip';
	titleSize?: string;
	layout?: string;
	meta?: LocalizedText[];
	location?: LocalizedText;
	driveMinutes?: number;
	distanceKm?: number;
	durationHours?: string;
	difficulty?: Difficulty;
	elevationGainM?: number;
	seasonMonths?: string;
	links?: ExperienceLink[];
	indoor?: boolean;
};

export type DestinationCard = {
	id: string;
	activities: ActivityFilterKey[];
	icon: ComponentType;
	kickerKey: string;
	titleKey: string;
	bodyKey: string;
	tagsBySeason: Record<SeasonKey, string[]>;
};

export type ActivityFilter = {
	id: ActivityFilterKey;
	icon: ComponentType;
	labelKey: string;
};

export type SectionLink = {
	id: string;
	labelKey: string;
};

export type FestivalCard = {
	id: string;
	icon: string;
	accentClass: string;
	kicker: LocalizedText;
	title: LocalizedText;
	body: LocalizedText;
	highlights: LocalizedText[];
	tipLabel: LocalizedText;
	seasonBadge: LocalizedText;
};

export type FestivalSection = {
	kicker: LocalizedText;
	title: LocalizedText;
	intro: LocalizedText;
	note: LocalizedText;
	eventInfo: LocalizedText;
	eventInfoUrl: string;
	cards: FestivalCard[];
};

export const experienceEvents: ExperienceEvent[] = [
	{
		id: 'summer-hike',
		season: 'summer',
		activities: ['hiking', 'family'],
		icon: Mountain,
		kicker: { de: 'Wandern', en: 'Hiking' },
		title: { de: 'Reißkofel & Almen', en: 'Reißkofel & alpine huts' },
		description: {
			de: 'Zwischen Weißbriach und den Karnischen Alpen warten aussichtsreiche Wege - von Genussrunden bis zur echten Gipfeltour.',
			en: 'From scenic rounds to real summit hikes, beautiful trails run between Weissbriach and the Carnic Alps.',
		},
		image: '/images/Umgebung/napal-alm.jpg',
		location: { de: 'Weißbriach / Napalalm', en: 'Weissbriach / Napalalm' },
		driveMinutes: 25,
		distanceKm: 18,
		durationHours: '5-7',
		difficulty: 'medium',
		elevationGainM: 1200,
		seasonMonths: 'Jun-Oct',
		links: [{ urlType: 'google', url: 'https://www.google.com/maps/search/?api=1&query=Radniger+Alm' }],
		indoor: false,
		layout: 'summer',
		className: 'c1',
		titleSize: 'text-2xl',
		meta: [
			{ de: '25 min Anfahrt', en: '25 min drive' },
			{ de: '5-7 h Dauer', en: '5-7 h duration' },
			{ de: 'Mittel • +1.200 hm', en: 'Moderate • +1,200 m ascent' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
	},
	{
		id: 'summer-gorge',
		season: 'summer',
		activities: ['hiking', 'family'],
		icon: Footprints,
		kicker: { de: 'Natur-Highlight', en: 'Nature highlight' },
		title: { de: 'Garnitzenklamm', en: 'Garnitzenklamm Gorge' },
		description: {
			de: 'Spektakuläre Schlucht mit Holzstegen und Wasserfällen, fotografisch extrem stark und perfekt für einen Tagesausflug.',
			en: 'A spectacular gorge with wooden walkways and waterfalls, highly photogenic and perfect for a day trip.',
		},
		image: '/images/Umgebung/garnitzenklamm.jpg',
		location: { de: 'Möderndorf / Hermagor', en: 'Moederndorf / Hermagor' },
		driveMinutes: 30,
		distanceKm: 10.1,
		durationHours: '4',
		difficulty: 'medium',
		elevationGainM: 863,
		seasonMonths: 'May-Oct',
		links: [
			{ urlType: 'nassfeld', url: 'https://www.nassfeld.at/de/Tour/Wanderung-durch-die-Garnitzenklamm_t_35284' },
			{ urlType: 'google', url: 'https://www.google.com/maps/search/?api=1&query=Garnitzenklamm' },
		],
		indoor: false,
		titleSize: 'text-xl',
		meta: [
			{ de: 'Tiefster Punkt: 610 hm', en: 'Lowest point: 610 m' },
			{ de: 'Höchster Punkt: 1188 hm', en: 'Highest point: 1188 m' },
			{ de: 'Abstieg: 863 hm', en: 'Descent: 863 m' },
			{ de: 'Mittel • +863 hm', en: 'Moderate • +863 m ascent' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
		badge: { de: 'Top Erlebnis', en: 'Top experience' },
		badgeTier: 'top',
	},
	{
		id: 'summer-lift',
		season: 'summer',
		activities: ['hiking', 'family'],
		icon: CableCar,
		kicker: { de: 'Bergbahnen', en: 'Lifts' },
		title: { de: 'Sommer am Nassfeld', en: 'Summer at Nassfeld' },
		description: {
			de: 'Mit der Bahn hinauf, Panorama atmen, und oben wartet die Hütte.',
			en: 'Ride up by cable car, breathe in the panorama, and a mountain hut is waiting above.',
		},
		image: '/images/Umgebung/nassfeld-lift.jpg',
		location: { de: 'Nassfeld', en: 'Nassfeld' },
		driveMinutes: 35,
		distanceKm: 30,
		durationHours: '3-4',
		difficulty: 'easy',
		seasonMonths: 'Jun-Sep',
		links: [{ urlType: 'google', url: 'https://www.google.com/maps/search/?api=1&query=Nassfeld+Sommerbergbahnen' }],
		indoor: false,
		layout: 'summer',
		className: 'c4',
		titleSize: 'text-2xl',
		meta: [
			{ de: '35 min Anfahrt', en: '35 min drive' },
			{ de: '3-4 h Dauer', en: '3-4 h duration' },
			{ de: 'Leicht', en: 'Easy' },
			{ de: 'Familienfreundlich', en: 'Family-friendly' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
	},
	{
		id: 'summer-sunset',
		season: 'summer',
		activities: ['lakes', 'family'],
		icon: Waves,
		kicker: { de: 'Freibad', en: 'Outdoor pool' },
		title: { de: 'Freibad in Weißbriach', en: 'Outdoor Pool in Weissbriach' },
		description: {
			de: 'Freibad mit Bergblick, Liegewiese und viel Platz für entspannte Sommertage mit der Familie.',
			en: 'Outdoor pool with mountain views, sunbathing lawns, and plenty of space for relaxed summer days with the family.',
		},
		image: '/images/Umgebung/freibad-weissbriach.jpg',
		location: { de: 'Weißbriach', en: 'Weissbriach' },
		driveMinutes: 3,
		distanceKm: 1,
		durationHours: '2-4',
		difficulty: 'easy',
		seasonMonths: 'Jun-Sep',
		links: [{ urlType: 'google', url: 'https://www.google.com/maps/search/?api=1&query=Freibad+Weissbriach' }],
		indoor: false,
		titleSize: 'text-xl',
		meta: [
			{ de: '3 min Anfahrt', en: '3 min drive' },
			{ de: '2-4 h Dauer', en: '2-4 h duration' },
			{ de: 'Leicht', en: 'Easy' },
			{ de: 'Familienfreundlich', en: 'Family-friendly' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
		badge: { de: 'Lieblingsspot', en: 'Favorite spot' },
		badgeTier: 'tip',
	},
	{
		id: 'summer-lake',
		season: 'summer',
		activities: ['lakes', 'family'],
		icon: Waves,
		kicker: { de: 'Seen', en: 'Lakes' },
		title: { de: 'Pressegger See genießen', en: 'Enjoy Lake Pressegger See' },
		description: {
			de: 'Warmer Badesee mit großzügigen Liegeflächen und Familienzonen - ideal für entspannte Sommertage am Wasser.',
			en: 'Warm bathing lake with spacious sunbathing areas and family zones, ideal for relaxed summer days by the water.',
		},
		image: '/images/Umgebung/presseggersee.jpg',
		location: { de: 'Pressegger See', en: 'Lake Pressegger See' },
		driveMinutes: 22,
		distanceKm: 18,
		durationHours: '2-6',
		difficulty: 'easy',
		seasonMonths: 'May-Sep',
		links: [{ urlType: 'google', url: 'https://www.google.com/maps/search/?api=1&query=Pressegger+See' }],
		indoor: false,
		layout: 'summer',
		className: 'c2',
		titleSize: 'text-xl',
		meta: [
			{ de: '22 min Anfahrt', en: '22 min drive' },
			{ de: 'Halbtags oder ganztags', en: 'Half-day or full-day' },
			{ de: 'Leicht', en: 'Easy' },
			{ de: 'Familienfreundlich', en: 'Family-friendly' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
	},
	{
		id: 'summer-bike',
		season: 'summer',
		activities: ['active'],
		icon: Bike,
		kicker: { de: 'Radfahren', en: 'Cycling' },
		title: { de: 'Gailtalradweg R3', en: 'Gailtal cycle path R3' },
		description: {
			de: 'Ruhig rollen, Berge links und rechts, und zwischendurch ein Eis am Fluss.',
			en: 'Roll easy with mountains on both sides, then grab an ice cream by the river.',
		},
		image: '/images/Umgebung/radfahren.jpg',
		location: { de: 'Gailtal', en: 'Gailtal' },
		driveMinutes: 10,
		distanceKm: 83.8,
		durationHours: '6',
		difficulty: 'easy',
		elevationGainM: 107,
		seasonMonths: 'Apr-Oct',
		links: [{ urlType: 'nassfeld', url: 'https://www.nassfeld.at/de/Tour/R3-Gailtalradweg_t_35036' }],
		indoor: false,
		layout: 'summer',
		className: 'c3',
		titleSize: 'text-xl',
		meta: [
			{ de: 'Tiefster Punkt: 489 hm', en: 'Lowest point: 489 m' },
			{ de: 'Höchster Punkt: 700 hm', en: 'Highest point: 700 m' },
			{ de: 'Abfahrt: 290 hm', en: 'Descent: 290 m' },
			{ de: 'Familienfreundlich', en: 'Family-friendly' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
	},
	{
		id: 'summer-golz',
		season: 'summer',
		activities: ['hiking', 'active'],
		icon: Mountain,
		kicker: { de: 'Bergtour', en: 'Mountain tour' },
		title: { de: 'Golz (2.004 m)', en: 'Golz (2,004 m)' },
		description: {
			de: 'Markanter Aussichtsberg in den Gailtaler Alpen bei Hermagor: technisch unschwierig, aber konditionell fordernd. Beliebte Zustiege führen über Radnig/Radniger Alm oder vom Weißensee via Kohlröslhütte.',
			en: 'Distinctive viewpoint peak in the Gailtal Alps near Hermagor: technically easy but physically demanding. Popular routes start from Radnig/Radniger Alm or from Weissensee via Kohlroeslhuette.',
		},
		image: '/images/Umgebung/aussicht-vom-golz.jpg',
		location: { de: 'Golz bei Hermagor', en: 'Golz near Hermagor' },
		driveMinutes: 25,
		distanceKm: 13.8,
		durationHours: '7',
		difficulty: 'medium',
		elevationGainM: 1300,
		seasonMonths: 'Jun-Oct',
		links: [{ urlType: 'nassfeld', url: 'https://www.nassfeld.at/de/Tour/Golz-2004-m-uber-die-Radniger-Alm_t_35104' }],
		indoor: false,
		titleSize: 'text-xl',
		meta: [
			{ de: 'Tiefster Punkt: 731 hm', en: 'Lowest point: 731 m' },
			{ de: 'Höchster Punkt: 2004 hm', en: 'Highest point: 2004 m' },
			{ de: 'Abstieg: 1300 hm', en: 'Descent: 1300 m' },
			{ de: 'Mittel • +1300 hm', en: 'Moderate • +1300 m ascent' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
		badge: { de: 'Geheimtipp', en: 'Insider tip' },
		badgeTier: 'tip',
	},
	{
		id: 'winter-ski',
		season: 'winter',
		activities: ['winter', 'active', 'family'],
		icon: MountainSnow,
		kicker: { de: 'Skifahren', en: 'Skiing' },
		title: { de: 'Nassfeld: Sun Ski World', en: 'Nassfeld: Sun Ski World' },
		description: {
			de: 'Kärntens größtes Skigebiet mit Schneesicherheit, modernen Liften sowie Hütten und Après-Ski, ideal als wichtigster Winter-Tagesausflug.',
			en: 'Carinthia’s largest ski area with reliable snow, modern lifts, mountain huts and après-ski, your top winter day-trip choice.',
		},
		image: '/images/Umgebung/ski_nassfeld.jpg',
		location: { de: 'Nassfeld', en: 'Nassfeld' },
		driveMinutes: 20,
		distanceKm: 22,
		durationHours: '4-8',
		difficulty: 'medium',
		seasonMonths: 'Dec-Apr',
		links: [{ urlType: 'google', url: 'https://www.google.com/maps/search/?api=1&query=Nassfeld+Ski' }],
		indoor: false,
		layout: 'winter',
		className: 'c1',
		titleSize: 'text-2xl',
		meta: [
			{ de: '20 min Anfahrt', en: '20 min drive' },
			{ de: '4-8 h Dauer', en: '4-8 h duration' },
			{ de: 'Leicht bis fortgeschritten', en: 'Beginner to advanced' },
			{ de: 'Familienfreundlich', en: 'Family-friendly' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
		badge: { de: 'Top Erlebnis', en: 'Top experience' },
		badgeTier: 'top',
	},
	{
		id: 'winter-ice',
		season: 'winter',
		activities: ['winter', 'lakes', 'family'],
		icon: Snowflake,
		kicker: { de: 'Eis', en: 'Ice' },
		title: { de: 'Weißensee: Natureiswelt', en: 'Weißensee: Natural Ice World' },
		description: {
			de: 'Internationale Winterbühne mit Europas größter präparierter Natureisfläche, Eislaufen, Winterwandern und Langlauf direkt am See.',
			en: 'International winter highlight with Europe’s largest prepared natural ice surface, plus skating, winter walking, and lakeside cross-country routes.',
		},
		image: '/images/Umgebung/eis.JPG',
		location: { de: 'Weißensee', en: 'Lake Weissensee' },
		driveMinutes: 20,
		distanceKm: 16,
		durationHours: '2-5',
		difficulty: 'easy',
		seasonMonths: 'Jan-Feb',
		links: [{ urlType: 'google', url: 'https://www.google.com/maps/search/?api=1&query=Weissensee+Eislaufen' }],
		indoor: false,
		layout: 'winter',
		className: 'c2',
		badge: { de: 'Highlight', en: 'Highlight' },
		badgeTier: 'top',
		titleSize: 'text-xl',
		meta: [
			{ de: '20 min Anfahrt', en: '20 min drive' },
			{ de: '2-5 h Dauer', en: '2-5 h duration' },
			{ de: 'Leicht', en: 'Easy' },
			{ de: 'Familienfreundlich', en: 'Family-friendly' },
			{ de: 'Outdoor (wetterabhängig)', en: 'Outdoor (weather-dependent)' },
		],
	},
	{
		id: 'winter-hike',
		season: 'winter',
		activities: ['winter', 'family', 'active'],
		icon: PersonStanding,
		kicker: { de: 'Skigebiet', en: 'Ski area' },
		title: { de: 'Skigebiet Weißbriach', en: 'Weissbriach Ski Area' },
		description: {
			de: 'Klein, übersichtlich und familienfreundlich, perfekt für Anfänger und Kinder ohne Stress und lange Wartezeiten.',
			en: 'Small, manageable, and family-friendly, perfect for beginners and kids without stress or long lift queues.',
		},
		image: '/images/Umgebung/skigebiet-weissbriach-2.jpg',
		location: { de: 'Weißbriach', en: 'Weissbriach' },
		driveMinutes: 3,
		distanceKm: 1,
		durationHours: '2-6',
		difficulty: 'easy',
		seasonMonths: 'Dec-Mar',
		links: [{ urlType: 'google', url: 'https://maps.app.goo.gl/rYn8wPFzfDwo5Phg6' }],
		indoor: false,
		layout: 'winter',
		className: 'c3',
		titleSize: 'text-xl',
		meta: [
			{ de: '3 min Anfahrt', en: '3 min drive' },
			{ de: '2-6 h Dauer', en: '2-6 h duration' },
			{ de: 'Leicht-Mittel', en: 'Easy-Moderate' },
			{ de: 'Familienfreundlich', en: 'Family-friendly' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
	},
	{
		id: 'winter-crosscountry',
		season: 'winter',
		activities: ['winter', 'active'],
		icon: Route,
		kicker: { de: 'Loipenregion', en: 'Trail region' },
		title: { de: 'Gitschtaler Loipen', en: 'Gitschtal Trails' },
		description: {
			de: 'Weißbriach Loipe und Gitschtal Genussloipe in sonniger Tallage, ideal für ruhige Wintertage abseits des Trubels.',
			en: 'Weissbriach trail and Gitschtal Genussloipe in a sunny valley setting, great for calm winter days away from crowds.',
		},
		image: '/images/Umgebung/weissbriach.jpg',
		location: { de: 'Gitschtal', en: 'Gitschtal valley' },
		driveMinutes: 5,
		distanceKm: 3,
		durationHours: '1-3',
		difficulty: 'medium',
		seasonMonths: 'Dec-Mar',
		links: [{ urlType: 'bergfex', url: 'https://www.bergfex.at/kaernten/langlaufen/gitschtal/loipenplan/' }],
		indoor: false,
		layout: 'winter',
		className: 'c4',
		titleSize: 'text-2xl',
		meta: [
			{ de: '5 min Anfahrt', en: '5 min drive' },
			{ de: '1-3 h Dauer', en: '1-3 h duration' },
			{ de: 'Leicht-Mittel', en: 'Easy-Moderate' },
			{ de: 'Familienfreundlich', en: 'Family-friendly' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
	},
	{
		id: 'winter-snowshoe',
		season: 'winter',
		activities: ['winter', 'hiking'],
		icon: Footprints,
		kicker: { de: 'Schneeschuh in Weißbriach', en: 'Snowshoe at Weissbriach' },
		title: { de: 'Schneeschuh in Weißbriach', en: 'Snowshoe at Weissbriach' },
		description: {
			de: 'Tressdorfer Alm, Sonnenalpe Nassfeld und Garnitzenalm Wintertour bieten Panorama, Ruhe und echte Winter-Natur.',
			en: 'Tressdorfer Alm, Sonnenalpe Nassfeld, and the Garnitzenalm winter tour offer panorama, quiet, and true alpine winter nature.',
		},
		image: '/images/Umgebung/schnee-wanderung.jpg',
		location: { de: 'Weißbriach', en: 'Weissbriach' },
		driveMinutes: 5,
		distanceKm: 3,
		durationHours: '2-4',
		difficulty: 'medium',
		elevationGainM: 500,
		seasonMonths: 'Dec-Mar',
		links: [{ urlType: 'google', url: 'https://maps.app.goo.gl/rYn8wPFzfDwo5Phg6' }],
		indoor: false,
		titleSize: 'text-xl',
		meta: [
			{ de: '5 min Anfahrt', en: '5 min drive' },
			{ de: '2-4 h Dauer', en: '2-4 h duration' },
			{ de: 'Mittel • +500 hm', en: 'Moderate • +500 m ascent' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
		badge: { de: 'Empfohlen', en: 'Recommended' },
		badgeTier: 'tip',
	},
	{
		id: 'winter-sledding',
		season: 'winter',
		activities: ['winter', 'family'],
		icon: Users,
		kicker: { de: 'Rodeln', en: 'Sledding' },
		title: { de: 'Rodeln: Nassfeld & Weißbriach', en: 'Sledding: Nassfeld & Weissbriach' },
		description: {
			de: 'Beleuchtete Rodelstrecken und Abendprogramm für Familien, kombiniert mit der ruhigen Winterstimmung im Gitschtal.',
			en: 'Lit sledding runs and evening family programs, combined with the calm winter atmosphere of the Gitschtal valley.',
		},
		image: '/images/Umgebung/skigebiet-weissbriach.jpg',
		location: { de: 'Nassfeld & Weißbriach', en: 'Nassfeld & Weissbriach' },
		driveMinutes: 15,
		distanceKm: 12,
		durationHours: '1-3',
		difficulty: 'easy',
		seasonMonths: 'Dec-Mar',
		links: [
			{ urlType: 'nassfeld', url: 'https://www.nassfeld.at/de/Winter-World/Outdoor-Relax-World/Rodeln/Rodelbahnen' },
			{ urlType: 'google', url: 'https://maps.app.goo.gl/F7EhZWnqo8N3tZWi9' },
		],
		indoor: false,
		titleSize: 'text-xl',
		meta: [
			{ de: '10-20 min Anfahrt', en: '10-20 min drive' },
			{ de: '1-3 h Dauer', en: '1-3 h duration' },
			{ de: 'Leicht', en: 'Easy' },
			{ de: 'Familienfreundlich', en: 'Family-friendly' },
			{ de: 'Outdoor', en: 'Outdoor' },
		],
	},
];

export const experienceSeasonContent: Record<
	SeasonKey,
	{ kickerKey: string; titleKey: string; subtitleKey: string; bg: string }
> = {
	summer: {
		kickerKey: 'experiences.season.summer.kicker',
		titleKey: 'experiences.season.summer.title',
		subtitleKey: 'experiences.season.summer.subtitle',
		bg: '/images/Haus/gaestehaus-sommer.jpg',
	},
	winter: {
		kickerKey: 'experiences.season.winter.kicker',
		titleKey: 'experiences.season.winter.title',
		subtitleKey: 'experiences.season.winter.subtitle',
		bg: '/images/Haus/gaestehaus-winter.png',
	},
};

export const destinationCards: DestinationCard[] = [
	{
		id: 'nassfeld',
		activities: ['winter', 'hiking', 'active', 'family'],
		icon: Mountain,
		kickerKey: 'experiences.destinations.nassfeld.kicker',
		titleKey: 'experiences.destinations.nassfeld.title',
		bodyKey: 'experiences.destinations.nassfeld.body',
		tagsBySeason: {
			summer: [
				'experiences.destinations.tags.summer',
				'experiences.destinations.tags.hiking',
				'experiences.destinations.tags.panorama',
			],
			winter: [
				'experiences.destinations.tags.winter',
				'experiences.destinations.tags.ski',
				'experiences.destinations.tags.panorama',
			],
		},
	},
	{
		id: 'weissensee',
		activities: ['lakes', 'family'],
		icon: Waves,
		kickerKey: 'experiences.destinations.weissensee.kicker',
		titleKey: 'experiences.destinations.weissensee.title',
		bodyKey: 'experiences.destinations.weissensee.body',
		tagsBySeason: {
			summer: [
				'experiences.destinations.tags.clearLake',
				'experiences.destinations.tags.natureCalm',
				'experiences.destinations.tags.summerWinterHighlight',
			],
			winter: [
				'experiences.destinations.tags.clearLake',
				'experiences.destinations.tags.natureCalm',
				'experiences.destinations.tags.summerWinterHighlight',
			],
		},
	},
	{
		id: 'presseggersee',
		activities: ['lakes', 'family'],
		icon: Waves,
		kickerKey: 'experiences.destinations.presseggersee.kicker',
		titleKey: 'experiences.destinations.presseggersee.title',
		bodyKey: 'experiences.destinations.presseggersee.body',
		tagsBySeason: {
			summer: [
				'experiences.destinations.tags.warmWater',
				'experiences.destinations.tags.familyIdeal',
				'experiences.destinations.tags.shortDrive',
			],
			winter: [
				'experiences.destinations.tags.warmWater',
				'experiences.destinations.tags.familyIdeal',
				'experiences.destinations.tags.shortDrive',
			],
		},
	},
	{
		id: 'genussregion',
		activities: ['culture'],
		icon: Utensils,
		kickerKey: 'experiences.destinations.genussregion.kicker',
		titleKey: 'experiences.destinations.genussregion.title',
		bodyKey: 'experiences.destinations.genussregion.body',
		tagsBySeason: {
			summer: [
				'experiences.destinations.tags.enjoy',
				'experiences.destinations.tags.regional',
				'experiences.destinations.tags.slowfood',
			],
			winter: [
				'experiences.destinations.tags.culture',
				'experiences.destinations.tags.regional',
				'experiences.destinations.tags.enjoy',
			],
		},
	},
];

export const activityFilters: ActivityFilter[] = [
	{
		id: 'hiking',
		icon: Mountain,
		labelKey: 'experiences.interests.hiking',
	},
	{
		id: 'active',
		icon: Bike,
		labelKey: 'experiences.interests.active',
	},
	{
		id: 'family',
		icon: Users,
		labelKey: 'experiences.interests.family',
	},
	{
		id: 'lakes',
		icon: Waves,
		labelKey: 'experiences.interests.lakes',
	},
	{
		id: 'culture',
		icon: Utensils,
		labelKey: 'experiences.interests.culture',
	},
	{
		id: 'winter',
		icon: Snowflake,
		labelKey: 'experiences.interests.winter',
	},
];

export const experienceSectionLinks: SectionLink[] = [
	{ id: 'aktivitaeten', labelKey: 'experiences.nav.activities' },
	{ id: 'traditionelle-feste', labelKey: 'experiences.nav.festivals' },
	{ id: 'gaestecard', labelKey: 'experiences.nav.guestcard' },
];

export const experienceSectionTrackingLinks: SectionLink[] = [
	{ id: 'aktivitaeten', labelKey: 'experiences.nav.activities' },
	{ id: 'highlights', labelKey: 'experiences.nav.highlights' },
	{ id: 'traditionelle-feste', labelKey: 'experiences.nav.festivals' },
	{ id: 'gaestecard', labelKey: 'experiences.nav.guestcard' },
];

export const experienceFestivalSection: FestivalSection = {
	kicker: { de: 'Lokale Empfehlung', en: 'A local tip' },
	title: {
		de: 'Traditionelle Feste im Gitschtal',
		en: 'Traditional festivals in the Gitschtal',
	},
	intro: {
		de: 'Wer das Gitschtal nicht nur sehen, sondern auch schmecken möchte, erlebt bei Festen, Kirchtagen und kleinen Dorfveranstaltungen Gailtaler Speck, Almkäse, Kasnudeln, Reindling und saisonale Produkte dort, wo sie zur Region gehören.',
		en: 'If you want to do more than just see the Gitschtal, local festivals, church fairs, and small village gatherings let you taste Gailtaler Speck, alpine cheese, Kasnudeln, Reindling, and seasonal products where they belong.',
	},
	note: {
		de: 'Viele Termine sind saisonabhängig. Wir prüfen diese Hinweise regelmäßig und sagen Ihnen vor Ihrem Aufenthalt gerne, was während Ihres Urlaubs gerade gut passt.',
		en: 'Many dates depend on the season and the local calendar. We review these pointers regularly and are happy to tell you what fits best during your stay.',
	},
	eventInfo: {
		de: 'Nähere Informationen zu den einzelnen Veranstaltungen findet ihr unter:',
		en: 'You can find more information about individual events at:',
	},
	eventInfoUrl: 'https://www.nassfeld.at/de/Service/Events',
	cards: [
		{
			id: 'village-festivals',
			icon: '🎉',
			accentClass: 'bg-amber-200/30',
			kicker: { de: 'Dorffeste', en: 'Village festivals' },
			title: { de: 'Dorffeste mit echter Nähe', en: 'Village festivals with real local warmth' },
			body: {
				de: 'Hier sitzt man nicht anonym am Rand, sondern mittendrin: mit Musik, Gesprächen, regionalen Getränken und kleinen Speisen, die einen Sommerabend in Weißbriach besonders machen.',
				en: 'You are not just watching from the sidelines here. With music, conversation, regional drinks, and simple local food, these gatherings turn a summer evening in Weissbriach into something memorable.',
			},
			highlights: [
				{ de: 'Kuhfladentombola in Weißbriach, kultig und mit viel Schmäh', en: 'The Kuhfladentombola in Weissbriach, quirky, local, and full of humour' },
				{ de: 'Feuerwehrfeste und Zeltfeste mit Musik, Begegnungen und echter Stimmung', en: 'Fire brigade and marquee festivals with music, friendly encounters, and a genuine local mood' },
				{ de: 'Frühschoppen, wenn der Vormittag mit Musik, Getränken und regionalen Kleinigkeiten in Geselligkeit übergeht', en: 'Traditional Frühschoppen gatherings where music, drinks, and regional bites turn the morning into an easy local social experience' },
			],
			tipLabel: { de: 'Besonders schön im Sommer', en: 'Especially lovely in summer' },
			seasonBadge: { de: 'Juni bis August', en: 'June to August' },
		},
		{
			id: 'culinary-festivals',
			icon: '🥬',
			accentClass: 'bg-emerald-200/30',
			kicker: { de: 'Kulinarische Feste', en: 'Culinary festivals' },
			title: { de: 'Regionaler Genuss mit Jahreszeit', en: 'Seasonal food with a strong regional feel' },
			body: {
				de: 'Wenn Bauern, Vereine und Produzenten gemeinsam auftischen, schmeckt man, wie eng Küche und Landschaft hier zusammengehören: Gailtaler Speck, Almkäse, Kraut, Kasnudeln und Süßes wie Reindling erzählen viel über die Region.',
				en: 'When farmers, local clubs, and producers come together, you can taste how closely food and landscape belong together here: Gailtaler Speck, alpine cheese, cabbage, Kasnudeln, and sweet Reindling tell a lot about the region.',
			},
			highlights: [
				{ de: 'Krautfest in Weißbriach mit Krautgerichten, regionalen Spezialitäten und viel Dorfleben', en: 'The Krautfest in Weissbriach with cabbage dishes, regional specialities, and plenty of village life' },
				{ de: 'Bauern- und Handwerksstände mit Speck, Käse, Säften, Schnäpsen und Produkten, die wirklich aus der Region kommen', en: 'Farm and craft stalls with bacon, cheese, juices, schnapps, and products that genuinely come from the region' },
				{ de: 'Herbstliche Genussfeste, ideal nach Wanderungen oder als ruhiger Urlaubstag', en: 'Autumn food festivals that fit perfectly after a hike or as part of a slower holiday day' },
			],
			tipLabel: { de: 'Ideal für den Herbsturlaub', en: 'Ideal for an autumn stay' },
			seasonBadge: { de: 'September bis Oktober', en: 'September to October' },
		},
		{
			id: 'tradition-customs',
			icon: '🎺',
			accentClass: 'bg-indigo-200/25',
			kicker: { de: 'Tradition & Brauchtum', en: 'Tradition & customs' },
			title: { de: 'Bräuche, die wirklich gelebt werden', en: 'Traditions that are still genuinely lived' },
			body: {
				de: 'Kirchtage, Musik und kleine Brauchtumsveranstaltungen zeigen eine Seite des Gitschtals, die man nicht planen kann wie einen klassischen Ausflug. Zur Kultur gehören dabei auch Kirchtagssuppe, Tracht, Tanz und das gemeinsame Essen.',
				en: 'Church fairs, brass bands, and smaller customs-based events reveal a side of the Gitschtal that standard sightseeing cannot offer. Church-fair soup, traditional dress, dancing, and shared meals are all part of it.',
			},
			highlights: [
				{ de: 'Kirchtag in Weißbriach mit Tracht, Musik, Tanz und traditioneller Kirchtagssuppe', en: 'The Kirchtag in Weissbriach with traditional dress, music, dancing, and church-fair soup' },
				{ de: 'Alm- und Almkirchtage, klein, bodenständig und besonders stimmungsvoll', en: 'Alpine hut festivals that feel small-scale, grounded, and especially atmospheric' },
				{ de: 'Advent im Tal mit Reindling, warmen Getränken und ruhiger winterlicher Stimmung', en: 'Advent in the valley with Reindling, warm drinks, and a quiet winter atmosphere' },
			],
			tipLabel: { de: 'Je nach Saison verschieden', en: 'Different depending on the season' },
			seasonBadge: { de: 'Über das Jahr verteilt', en: 'Throughout the year' },
		},
	],
};

export const experienceQuickIdeas: Record<SeasonKey, string[]> = {
	summer: [
		'experiences.quickIdeas.summer.picknick',
		'experiences.quickIdeas.summer.farmshop',
		'experiences.quickIdeas.summer.sunsetspot',
		'experiences.quickIdeas.summer.familyprogram',
		'experiences.quickIdeas.summer.almrunde',
		'experiences.quickIdeas.summer.swimday',
	],
	winter: [
		'experiences.quickIdeas.winter.badweather',
		'experiences.quickIdeas.winter.romanticwalk',
		'experiences.quickIdeas.winter.kidsprogram',
		'experiences.quickIdeas.winter.sleddingnight',
		'experiences.quickIdeas.winter.spa',
		'experiences.quickIdeas.winter.villagemarket',
	],
};
