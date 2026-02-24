import type { ComponentType } from 'svelte';
import type { Lang } from '$lib/i18n';
import {
	Bike,
	CableCar,
	Footprints,
	Mountain,
	Snowflake,
	Users,
	Utensils,
	Waves,
} from 'lucide-svelte';

export type SeasonKey = 'summer' | 'winter';
export type ActivityFilterKey = 'hiking' | 'active' | 'winter' | 'family' | 'lakes' | 'culture';
type LocalizedText = Record<Lang, string>;

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
	titleSize?: string;
	layout?: string;
	meta?: LocalizedText[];
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
			en: 'From scenic rounds to real summit hikes, beautiful trails run between Weißbriach and the Carnic Alps.',
		},
		image: '/images/Umgebung/napal-alm.jpg',
		layout: 'summer',
		className: 'c1',
		titleSize: 'text-2xl',
		meta: [
			{ de: 'Viele Almwege in der Nähe', en: 'Many alpine trails nearby' },
			{ de: 'Beste Zeit: Juni bis Oktober', en: 'Best season: June to October' },
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
		titleSize: 'text-xl',
		meta: [
			{ de: 'Holzstege', en: 'Wooden walkways' },
			{ de: 'Wasserfälle', en: 'Waterfalls' },
		],
		badge: { de: 'Top Erlebnis', en: 'Top experience' },
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
		layout: 'summer',
		className: 'c4',
		titleSize: 'text-2xl',
		meta: [
			{ de: 'Panorama ohne langen Zustieg', en: 'Panorama without long ascents' },
			{ de: 'Perfekt für Tagesausflüge', en: 'Perfect for day trips' },
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
		image: '/images/Umgebung/freibad.png',
		titleSize: 'text-xl',
		meta: [
			{ de: 'An heißen Tagen', en: 'Great on hot days' },
			{ de: 'Kurz & erfrischend', en: 'Short and refreshing' },
		],
		badge: { de: 'Lieblingsspot', en: 'Favorite spot' },
	},
	{
		id: 'summer-lake',
		season: 'summer',
		activities: ['lakes', 'family'],
		icon: Waves,
		kicker: { de: 'Seen', en: 'Lakes' },
		title: { de: 'Weißensee genießen', en: 'Enjoy Lake Weißensee' },
		description: {
			de: 'Türkisblaues Wasser, helle Holzstege und barfuß ins Glück am Ufer.',
			en: 'Turquoise water, sunlit wooden piers, and bare feet at the shore.',
		},
		image: '/images/Umgebung/weissensee-lift.jpg',
		layout: 'summer',
		className: 'c2',
		titleSize: 'text-xl',
		meta: [
			{ de: 'Badeplätze in kurzer Fahrzeit', en: 'Swimming spots within short drive' },
			{ de: 'Ideal für Familien & Ruhetage', en: 'Great for families and relaxed days' },
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
		layout: 'summer',
		className: 'c3',
		titleSize: 'text-xl',
		meta: [
			{ de: 'Direkter Einstieg ins Radnetz', en: 'Direct access to bike routes' },
			{ de: 'Genuss- und Sporttouren möglich', en: 'Leisure and sport tours available' },
		],
	},
	{
		id: 'summer-regional-food',
		season: 'summer',
		activities: ['culture', 'family'],
		icon: Mountain,
		kicker: { de: 'Bergtour', en: 'Mountain tour' },
		title: { de: 'Golz (2.004 m)', en: 'Golz (2,004 m)' },
		description: {
			de: 'Markanter Aussichtsberg in den Gailtaler Alpen bei Hermagor: technisch unschwierig, aber konditionell fordernd. Beliebte Zustiege führen über Radnig/Radniger Alm oder vom Weißensee via Kohlröslhütte.',
			en: 'Distinctive viewpoint peak in the Gailtal Alps near Hermagor: technically easy but physically demanding. Popular routes start from Radnig/Radniger Alm or from Weissensee via Kohlroeslhuette.',
		},
		image: '/images/Umgebung/aussicht-vom-golz.jpg',
		titleSize: 'text-xl',
		meta: [
			{ de: '2.004 m Höhe', en: '2,004 m altitude' },
			{ de: 'ca. 1.300 hm', en: 'about 1,300 m ascent' },
		],
		badge: { de: 'Geheimtipp', en: 'Insider tip' },
	},
	{
		id: 'winter-ski',
		season: 'winter',
		activities: ['winter', 'active', 'family'],
		icon: Snowflake,
		kicker: { de: 'Skifahren', en: 'Skiing' },
		title: { de: 'Nassfeld: Sun Ski World', en: 'Nassfeld: Sun Ski World' },
		description: {
			de: 'Kärntens größtes Skigebiet mit Schneesicherheit, modernen Liften sowie Hütten und Après-Ski, ideal als wichtigster Winter-Tagesausflug.',
			en: 'Carinthia’s largest ski area with reliable snow, modern lifts, mountain huts and après-ski, your top winter day-trip choice.',
		},
		image: '/images/Umgebung/ski_nassfeld.jpg',
		layout: 'winter',
		className: 'c1',
		titleSize: 'text-2xl',
		meta: [
			{ de: 'Schneesicher & moderne Lifte', en: 'Snow-reliable & modern lifts' },
			{ de: 'Hütten & Après-Ski', en: 'Huts & après-ski' },
		],
		badge: { de: 'Top Erlebnis', en: 'Top experience' },
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
		layout: 'winter',
		className: 'c2',
		badge: { de: 'Highlight', en: 'Highlight' },
		titleSize: 'text-xl',
		meta: [
			{ de: 'Europas größte Natureisfläche', en: 'Europe’s largest natural ice area' },
			{ de: 'Internationales Winter-Highlight', en: 'International winter highlight' },
		],
	},
	{
		id: 'winter-hike',
		season: 'winter',
		activities: ['winter', 'family', 'active'],
		icon: Snowflake,
		kicker: { de: 'Skigebiet', en: 'Ski area' },
		title: { de: 'Skigebiet Weißbriach', en: 'Weißbriach Ski Area' },
		description: {
			de: 'Klein, übersichtlich und familienfreundlich, perfekt für Anfänger und Kinder ohne Stress und lange Wartezeiten.',
			en: 'Small, manageable, and family-friendly, perfect for beginners and kids without stress or long lift queues.',
		},
		image: '/images/Umgebung/skigebiet-weissbriach-2.jpg',
		layout: 'winter',
		className: 'c3',
		titleSize: 'text-xl',
		meta: [
			{ de: 'Familienfreundliche Pisten', en: 'Family-friendly slopes' },
			{ de: 'Keine langen Wartezeiten', en: 'No long queue times' },
		],
	},
	{
		id: 'winter-crosscountry',
		season: 'winter',
		activities: ['winter', 'active'],
		icon: Mountain,
		kicker: { de: 'Loipenregion', en: 'Trail region' },
		title: { de: 'Gitschtaler Loipen', en: 'Gitschtal Trails' },
		description: {
			de: 'Weißbriach Loipe und Gitschtal Genussloipe in sonniger Tallage, ideal für ruhige Wintertage abseits des Trubels.',
			en: 'Weißbriach trail and Gitschtal Genussloipe in a sunny valley setting, great for calm winter days away from crowds.',
		},
		image: '/images/Umgebung/weissbriach.jpg',
		layout: 'winter',
		className: 'c4',
		titleSize: 'text-2xl',
		meta: [
			{ de: 'Weißbriach Loipe', en: 'Weißbriach trail' },
			{ de: 'Gitschtal Genussloipe', en: 'Gitschtal Genussloipe' },
		],
	},
	{
		id: 'winter-snowshoe',
		season: 'winter',
		activities: ['winter', 'hiking'],
		icon: Footprints,
		kicker: { de: 'Schneeschuh am Nassfeld', en: 'Snowshoe at Nassfeld' },
		title: { de: 'Schneeschuh am Nassfeld', en: 'Snowshoe at Nassfeld' },
		description: {
			de: 'Tressdorfer Alm, Sonnenalpe Nassfeld und Garnitzenalm Wintertour bieten Panorama, Ruhe und echte Winter-Natur.',
			en: 'Tressdorfer Alm, Sonnenalpe Nassfeld, and the Garnitzenalm winter tour offer panorama, quiet, and true alpine winter nature.',
		},
		image: '/images/Umgebung/schnee-wanderung.jpg',
		titleSize: 'text-xl',
		meta: [
			{ de: 'Sonnenalpe Nassfeld', en: 'Sonnenalpe Nassfeld' },
			{ de: 'Tressdorfer Alm', en: 'Tressdorfer Alm' },
		],
		badge: { de: 'Empfohlen', en: 'Recommended' },
	},
	{
		id: 'winter-sledding',
		season: 'winter',
		activities: ['winter', 'family'],
		icon: Users,
		kicker: { de: 'Rodeln', en: 'Sledding' },
		title: { de: 'Rodeln: Nassfeld & Weißbriach', en: 'Sledding: Nassfeld & Weißbriach' },
		description: {
			de: 'Beleuchtete Rodelstrecken und Abendprogramm für Familien, kombiniert mit der ruhigen Winterstimmung im Gitschtal.',
			en: 'Lit sledding runs and evening family programs, combined with the calm winter atmosphere of the Gitschtal valley.',
		},
		image: '/images/Umgebung/skigebiet-weissbriach.jpg',
		titleSize: 'text-xl',
		meta: [
			{ de: 'Beleuchtete Rodelstrecken', en: 'Lit sledding runs' },
			{ de: 'Spaß für Familien', en: 'Family fun' },
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

