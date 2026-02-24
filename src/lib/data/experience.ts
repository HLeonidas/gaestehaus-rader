import type { ComponentType } from 'svelte';
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

export type ExperienceEvent = {
	id: string;
	season: SeasonKey;
	activities: ActivityFilterKey[];
	icon: ComponentType;
	kickerKey: string;
	titleKey: string;
	descriptionKey?: string;
	image: string;
	className?: string;
	badgeKey?: string;
	titleSize?: string;
	layout?: string;
	metaKeys?: string[];
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
		kickerKey: 'experiences.event.summer.hike.kicker',
		titleKey: 'experiences.event.summer.hike.title',
		descriptionKey: 'experiences.event.summer.hike.description',
		image: '/images/Umgebung/summer-hike.jpg',
		layout: 'summer',
		className: 'c1',
		titleSize: 'text-2xl',
		metaKeys: ['experiences.event.summer.hike.meta1', 'experiences.event.summer.hike.meta2'],
	},
	{
		id: 'summer-lake',
		season: 'summer',
		activities: ['lakes', 'family'],
		icon: Waves,
		kickerKey: 'experiences.event.summer.lake.kicker',
		titleKey: 'experiences.event.summer.lake.title',
		descriptionKey: 'experiences.event.summer.lake.description',
		image: '/images/Umgebung/summer-lake.png',
		layout: 'summer',
		className: 'c2',
		titleSize: 'text-xl',
		metaKeys: ['experiences.event.summer.lake.meta1', 'experiences.event.summer.lake.meta2'],
	},
	{
		id: 'summer-lift',
		season: 'summer',
		activities: ['hiking', 'family'],
		icon: CableCar,
		kickerKey: 'experiences.event.summer.lift.kicker',
		titleKey: 'experiences.event.summer.lift.title',
		descriptionKey: 'experiences.event.summer.lift.description',
		image: '/images/Umgebung/summer-lift.png',
		layout: 'summer',
		className: 'c4',
		titleSize: 'text-2xl',
		metaKeys: ['experiences.event.summer.lift.meta1', 'experiences.event.summer.lift.meta2'],
	},
	{
		id: 'summer-bike',
		season: 'summer',
		activities: ['active'],
		icon: Bike,
		kickerKey: 'experiences.event.summer.bike.kicker',
		titleKey: 'experiences.event.summer.bike.title',
		descriptionKey: 'experiences.event.summer.bike.description',
		image: '/images/Umgebung/summer-bike.jpg',
		layout: 'summer',
		className: 'c3',
		titleSize: 'text-xl',
		metaKeys: ['experiences.event.summer.bike.meta1', 'experiences.event.summer.bike.meta2'],
	},
	{
		id: 'summer-sunset',
		season: 'summer',
		activities: ['lakes', 'family'],
		icon: Waves,
		kickerKey: 'experiences.event.summer.sunset.kicker',
		titleKey: 'experiences.event.summer.sunset.title',
		descriptionKey: 'experiences.event.summer.sunset.description',
		image: '/images/Umgebung/freibad.png',
		titleSize: 'text-xl',
		metaKeys: ['experiences.meta.cooling', 'experiences.meta.easy'],
		badgeKey: 'experiences.badge.favorite',
	},
	{
		id: 'summer-gorge',
		season: 'summer',
		activities: ['hiking', 'family'],
		icon: Footprints,
		kickerKey: 'experiences.event.summer.gorge.kicker',
		titleKey: 'experiences.event.summer.gorge.title',
		descriptionKey: 'experiences.event.summer.gorge.description',
		image: '/images/Umgebung/summer-bike.jpg',
		titleSize: 'text-xl',
		metaKeys: ['experiences.meta.boardwalks', 'experiences.meta.waterfalls'],
		badgeKey: 'experiences.badge.topExperience',
	},
	{
		id: 'summer-regional-food',
		season: 'summer',
		activities: ['culture', 'family'],
		icon: Mountain,
		kickerKey: 'experiences.event.summer.food.kicker',
		titleKey: 'experiences.event.summer.food.title',
		descriptionKey: 'experiences.event.summer.food.description',
		image: '/images/Umgebung/summer-hike.jpg',
		titleSize: 'text-xl',
		metaKeys: ['experiences.meta.panorama', 'experiences.meta.panoramaroad'],
		badgeKey: 'experiences.badge.insider',
	},
	{
		id: 'winter-ski',
		season: 'winter',
		activities: ['winter', 'active', 'family'],
		icon: Snowflake,
		kickerKey: 'experiences.event.winter.ski.kicker',
		titleKey: 'experiences.event.winter.ski.title',
		descriptionKey: 'experiences.event.winter.ski.description',
		image: '/images/Umgebung/ski_nassfeld.jpg',
		layout: 'winter',
		className: 'c1',
		titleSize: 'text-2xl',
		metaKeys: ['experiences.event.winter.ski.meta1', 'experiences.event.winter.ski.meta2'],
		badgeKey: 'experiences.badge.topExperience',
	},
	{
		id: 'winter-ice',
		season: 'winter',
		activities: ['winter', 'lakes', 'family'],
		icon: Snowflake,
		kickerKey: 'experiences.event.winter.ice.kicker',
		titleKey: 'experiences.event.winter.ice.title',
		descriptionKey: 'experiences.event.winter.ice.description',
		image: '/images/Umgebung/winter-ice.jpg',
		layout: 'winter',
		className: 'c2',
		badgeKey: 'experiences.badge.popular',
		titleSize: 'text-xl',
		metaKeys: ['experiences.event.winter.ice.meta1', 'experiences.event.winter.ice.meta2'],
	},
	{
		id: 'winter-hike',
		season: 'winter',
		activities: ['winter', 'family', 'active'],
		icon: Snowflake,
		kickerKey: 'experiences.event.winter.hike.kicker',
		titleKey: 'experiences.event.winter.hike.title',
		descriptionKey: 'experiences.event.winter.hike.description',
		image: '/images/Umgebung/ski_weißbriach.JPG',
		layout: 'winter',
		className: 'c3',
		titleSize: 'text-xl',
		metaKeys: ['experiences.event.winter.hike.meta1', 'experiences.event.winter.hike.meta2'],
	},
	{
		id: 'winter-crosscountry',
		season: 'winter',
		activities: ['winter', 'active'],
		icon: Mountain,
		kickerKey: 'experiences.event.winter.crosscountry.kicker',
		titleKey: 'experiences.event.winter.crosscountry.title',
		descriptionKey: 'experiences.event.winter.crosscountry.description',
		image: '/images/Umgebung/winter-crosscountry.jpg',
		layout: 'winter',
		className: 'c4',
		titleSize: 'text-2xl',
		metaKeys: [
			'experiences.event.winter.crosscountry.meta1',
			'experiences.event.winter.crosscountry.meta2',
		],
	},
	{
		id: 'winter-snowshoe',
		season: 'winter',
		activities: ['winter', 'hiking'],
		icon: Footprints,
		kickerKey: 'experiences.event.winter.snowshoe.kicker',
		titleKey: 'experiences.event.winter.snowshoe.title',
		descriptionKey: 'experiences.event.winter.snowshoe.description',
		image: '/images/Umgebung/winter-hike.jpg',
		titleSize: 'text-xl',
		metaKeys: ['experiences.meta.sonnenalpe', 'experiences.meta.tressdorferalm'],
		badgeKey: 'experiences.badge.recommended',
	},
	{
		id: 'winter-sledding',
		season: 'winter',
		activities: ['winter', 'family'],
		icon: Users,
		kickerKey: 'experiences.event.winter.sledding.kicker',
		titleKey: 'experiences.event.winter.sledding.title',
		descriptionKey: 'experiences.event.winter.sledding.description',
		image: '/images/Umgebung/winter-ski.jpg',
		titleSize: 'text-xl',
		metaKeys: ['experiences.meta.litruns', 'experiences.meta.familyfun'],
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
