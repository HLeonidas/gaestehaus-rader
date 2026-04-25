import type { Accommodation } from '$lib/data/accommodations';
import type { Lang } from '$lib/i18n';

const localeToLanguageTag: Record<Lang, string> = {
	de: 'de-AT',
	en: 'en',
};

const defaultVacationImagePaths = [
	'/images/Haus/gaestehaus-sommer.jpg',
	'/images/Haus/balkon-ausblick-winter.jpg',
	'/images/Haus/gaestehaus-balkon-ausblick.jpg',
	'/images/Haus/familie-hueber.jpg',
	'/images/Haus/weissbriach-kirche.jpg',
	'/images/Haus/gaestehaus-pavillon.jpg',
	'/images/Haus/gaestehaus-winter-ansicht.jpg',
	'/images/Haus/gaestehaus-tischtennis.jpg',
	'/images/Haus/gaestehaus-winter.png',
];

const geoCoordinates = {
	'@type': 'GeoCoordinates',
	latitude: 46.688407,
	longitude: 13.2549914,
} as const;

type BreadcrumbItem = {
	name: string;
	path: string;
};

type FaqQuestion = {
	question: string;
	answer: string;
};

type VacationRentalSchemaOptions = {
	accommodation: Accommodation;
	locale: Lang;
	pageUrl: string;
	siteOrigin: string;
	imagePaths: string[];
	amenityLabels: string[];
	description: string;
	mainEntityOfPage?: string;
};

const toAbsoluteUrl = (pathOrUrl: string, siteOrigin: string) => {
	if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
		return pathOrUrl;
	}

	return new URL(pathOrUrl, siteOrigin).toString();
};

const parseGuestCapacity = (guestText: string) => {
	const rangeMatch = guestText.match(/(\d+)\s*-\s*(\d+)/);
	if (rangeMatch) {
		return {
			minValue: Number.parseInt(rangeMatch[1], 10),
			maxValue: Number.parseInt(rangeMatch[2], 10),
		};
	}

	const singleMatch = guestText.match(/(\d+)/);
	if (singleMatch) {
		const value = Number.parseInt(singleMatch[1], 10);
		return { minValue: value, maxValue: value };
	}

	return null;
};

const buildAmenityFeatures = (amenityLabels: string[]) =>
	amenityLabels.map((name) => ({
		'@type': 'LocationFeatureSpecification',
		name,
		value: true,
	}));

const buildVacationImages = (paths: string[], siteOrigin: string) => {
	const explicitImages = Array.from(new Set(paths.map((path) => toAbsoluteUrl(path, siteOrigin))));
	const fallbackImages = Array.from(
		new Set(defaultVacationImagePaths.map((path) => toAbsoluteUrl(path, siteOrigin)))
	).filter((path) => !explicitImages.includes(path));
	const absoluteImages = [...explicitImages];
	const minImages = 8;

	for (const fallbackImage of fallbackImages) {
		if (absoluteImages.length >= minImages) break;
		absoluteImages.push(fallbackImage);
	}

	while (absoluteImages.length < minImages && absoluteImages.length > 0) {
		absoluteImages.push(absoluteImages[absoluteImages.length - 1]);
	}

	return absoluteImages;
};

export const buildJsonLdGraph = (nodes: Record<string, unknown>[]) =>
	JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': nodes,
	});

export const buildBreadcrumbListSchema = (items: BreadcrumbItem[], siteOrigin: string) => ({
	'@type': 'BreadcrumbList',
	itemListElement: items.map((item, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: item.name,
		item: toAbsoluteUrl(item.path, siteOrigin),
	})),
});

export const buildFaqPageSchema = (pageUrl: string, locale: Lang, questions: FaqQuestion[]) => ({
	'@type': 'FAQPage',
	'@id': `${pageUrl}#faq`,
	url: `${pageUrl}#faq`,
	inLanguage: localeToLanguageTag[locale],
	mainEntity: questions.map((item) => ({
		'@type': 'Question',
		name: item.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: item.answer,
		},
	})),
});

export const buildOfferSchema = ({
	id,
	url,
	price,
	itemOfferedId,
}: {
	id: string;
	url: string;
	price?: number;
	itemOfferedId?: string;
}) => ({
	'@type': 'Offer',
	'@id': id,
	url,
	...(typeof price === 'number' ? { price } : {}),
	priceCurrency: 'EUR',
	availability: 'https://schema.org/InStock',
	...(itemOfferedId
		? {
			itemOffered: {
				'@id': itemOfferedId,
			},
		}
		: {}),
});

export const buildVacationRentalSchema = ({
	accommodation,
	locale,
	pageUrl,
	siteOrigin,
	imagePaths,
	amenityLabels,
	description,
	mainEntityOfPage,
}: VacationRentalSchemaOptions) => {
	const guestCapacity = parseGuestCapacity(accommodation.attributes.guests[locale]);
	const amenityFeatures = buildAmenityFeatures(amenityLabels);
	const accommodationId = `${pageUrl}#accommodation`;
	const offerId = `${pageUrl}#offer`;
	const vacationRentalId = `${pageUrl}#vacation-rental`;

	const accommodationNode = {
		'@type': 'Accommodation',
		'@id': accommodationId,
		name: `${accommodation.title} – ${accommodation.typeLabel[locale]} im Gästehaus Rader`,
		accommodationCategory: accommodation.typeLabel[locale],
		floorLevel: accommodation.attributes.floor,
		...(guestCapacity
			? {
				occupancy: {
					'@type': 'QuantitativeValue',
					minValue: guestCapacity.minValue,
					maxValue: guestCapacity.maxValue,
				},
			}
			: {}),
		amenityFeature: amenityFeatures,
		floorSize: {
			'@type': 'QuantitativeValue',
			value: Number.parseFloat(accommodation.attributes.size.replace(',', '.')),
			unitCode: 'MTK',
		},
	};

	const offerNode = buildOfferSchema({
		id: offerId,
		url: pageUrl,
		price: accommodation.pricePerNightBase,
		itemOfferedId: vacationRentalId,
	});

	const vacationRentalNode = {
		'@type': 'VacationRental',
		'@id': vacationRentalId,
		name: `${accommodation.title} – ${accommodation.typeLabel[locale]} im Gästehaus Rader`,
		description,
		url: pageUrl,
		...(mainEntityOfPage ? { mainEntityOfPage } : {}),
		identifier: accommodation.slug,
		image: buildVacationImages(imagePaths, siteOrigin),
		geo: geoCoordinates,
		containedInPlace: {
			'@id': `${siteOrigin}/#lodging`,
		},
		containsPlace: {
			'@id': accommodationId,
		},
		amenityFeature: amenityFeatures,
		offers: {
			'@id': offerId,
		},
	};

	return {
		vacationRentalId,
		accommodationId,
		offerId,
		vacationRentalNode,
		accommodationNode,
		offerNode,
	};
};
