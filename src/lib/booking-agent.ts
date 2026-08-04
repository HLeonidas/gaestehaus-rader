import type { Lang } from '$lib/i18n';
import { accommodations } from '$lib/data/accommodations';
import { guesthouseFacts } from '$lib/data/facts';
import { SITE_ORIGIN } from '$lib/seo';

type ToolResult = {
	content: Array<{
		type: 'text';
		text: string;
	}>;
};

type ModelContextTool = {
	name: string;
	description: string;
	inputSchema: {
		type: 'object';
		properties: Record<string, unknown>;
		required?: string[];
	};
	execute: (args: Record<string, unknown>) => Promise<ToolResult> | ToolResult;
};

type ModelContext = {
	registerTool: (tool: ModelContextTool) => { unregister?: () => void } | void;
	unregisterTool?: (name: string) => void;
};

type BookingSearchState = {
	checkIn?: string;
	checkOut?: string;
	adults?: number;
	children?: number;
	apartmentSlug?: string;
};

type RegisterBookingWebMcpOptions = {
	getLanguage: () => Lang;
	getSearchState: () => BookingSearchState;
	setSearchState: (state: BookingSearchState) => void;
	focusBookingWidget: () => void;
};

type MaybeWebMcpWindow = Window & {
	raderBookingAgent?: {
		getBookingContext: () => ReturnType<typeof buildBookingContext>;
		recommendApartments: (args: Record<string, unknown>) => ReturnType<typeof recommendApartments>;
		prepareAvailabilitySearch: (args: Record<string, unknown>) => ReturnType<typeof prepareAvailabilitySearch>;
		draftDirectInquiry: (args: Record<string, unknown>) => ReturnType<typeof draftDirectInquiry>;
	};
	__raderBookingWebMcpHandles?: Array<{ unregister?: () => void } | void>;
};

type MaybeModelContextDocument = Document & {
	modelContext?: ModelContext;
};

type MaybeModelContextNavigator = Navigator & {
	modelContext?: ModelContext;
};

const readMaxGuests = (guestLabel: string) => {
	const matches = guestLabel.match(/\d+/g);
	if (!matches?.length) return 0;
	return Number(matches.at(-1));
};

const localizedBookingPath = (lang: Lang, path: string) => {
	const trimmed = path.replace(/^\/+/, '');
	return lang === 'en' ? `/en/${trimmed.replace(/^buchen/, 'book')}` : `/${trimmed}`;
};

const toTextResult = (value: unknown): ToolResult => ({
	content: [
		{
			type: 'text',
			text: typeof value === 'string' ? value : JSON.stringify(value, null, 2),
		},
	],
});

export const buildBookingContext = (lang: Lang, state: BookingSearchState = {}) => {
	const apartments = accommodations.map((accommodation) => ({
		slug: accommodation.slug,
		title: `Appartement ${accommodation.title}`,
		subtitle: accommodation.subtitle[lang],
		url: new URL(
			localizedBookingPath(lang, `buchen/${accommodation.slug}`),
			SITE_ORIGIN
		).toString(),
		maxGuests: readMaxGuests(accommodation.attributes.guests.de),
		guestLabel: accommodation.attributes.guests[lang],
		size: accommodation.attributes.size,
		view: accommodation.attributes.view[lang],
		priceFromEurPerNight: accommodation.pricePerNightBase,
		amenities: accommodation.amenities,
	}));

	return {
		property: {
			name: guesthouseFacts.name,
			address: guesthouseFacts.address.formatted[lang],
			phones: guesthouseFacts.phones,
			email: guesthouseFacts.email,
			checkIn: lang === 'en' ? guesthouseFacts.checkInEn : guesthouseFacts.checkIn,
			checkOut: lang === 'en' ? guesthouseFacts.checkOutEn : guesthouseFacts.checkOut,
			policies: {
				pets: lang === 'en' ? 'Pets are not allowed' : 'Haustiere sind nicht erlaubt',
				smoking:
					lang === 'en'
						? 'No smoking inside the apartments'
						: 'Nichtraucher-Unterkünfte im Innenbereich',
				payment:
					lang === 'en'
						? 'Cash on site or bank transfer by arrangement'
						: 'Barzahlung vor Ort oder Überweisung nach Absprache',
			},
		},
		apartments,
		currentSearch: state,
		bookingWidget: {
			provider: 'feratel / Deskline',
			accountId: 'fa73de04-c8e1-4b05-b4a8-5697e2d52a1c',
			note:
				lang === 'en'
					? 'The final availability check, request, and booking confirmation happen in the embedded feratel booking widget.'
					: 'Die finale Verfügbarkeitsprüfung, Anfrage und Buchungsbestätigung erfolgen im eingebetteten feratel-Buchungswidget.',
		},
	};
};

export const recommendApartments = (args: Record<string, unknown>, lang: Lang) => {
	const guests = Math.max(1, Number(args.guests ?? args.adults ?? 1));
	const preferences = String(args.preferences ?? '').toLowerCase();

	const ranked = accommodations
		.map((accommodation) => {
			const maxGuests = readMaxGuests(accommodation.attributes.guests.de);
			const text = [
				accommodation.subtitle[lang],
				accommodation.detailBody[lang],
				accommodation.attributes.view[lang],
				accommodation.amenities.join(' '),
			]
				.join(' ')
				.toLowerCase();
			const preferenceScore = preferences
				.split(/[,\s]+/)
				.filter(Boolean)
				.reduce((score, token) => score + (text.includes(token) ? 1 : 0), 0);

			return {
				slug: accommodation.slug,
				title: `Appartement ${accommodation.title}`,
				fitsGuestCount: maxGuests >= guests,
				maxGuests,
				priceFromEurPerNight: accommodation.pricePerNightBase,
				reason: accommodation.detailBody[lang],
				score: (maxGuests >= guests ? 100 : 0) + preferenceScore - accommodation.pricePerNightBase / 100,
			};
		})
		.sort((left, right) => right.score - left.score);

	return {
		guests,
		recommendations: ranked,
	};
};

export const prepareAvailabilitySearch = (
	args: Record<string, unknown>,
	lang: Lang
): BookingSearchState & { summary: string; nextStep: string } => {
	const checkIn = String(args.checkIn ?? args.arrival ?? '');
	const checkOut = String(args.checkOut ?? args.departure ?? '');
	const adults = Math.max(1, Number(args.adults ?? 2));
	const children = Math.max(0, Number(args.children ?? 0));
	const apartmentSlug = String(args.apartmentSlug ?? args.apartment ?? '');
	const validApartment = accommodations.some((accommodation) => accommodation.slug === apartmentSlug)
		? apartmentSlug
		: undefined;

	return {
		checkIn,
		checkOut,
		adults,
		children,
		apartmentSlug: validApartment,
		summary:
			lang === 'en'
				? `${checkIn || 'open check-in'} to ${checkOut || 'open check-out'}, ${adults} adult(s), ${children} child(ren)`
				: `${checkIn || 'offene Anreise'} bis ${checkOut || 'offene Abreise'}, ${adults} Erwachsene, ${children} Kinder`,
		nextStep:
			lang === 'en'
				? 'Use the embedded feratel widget below to run the final availability check and complete the request.'
				: 'Nutzen Sie das eingebettete feratel-Widget darunter fuer die finale Verfuegbarkeitspruefung und Anfrage.',
	};
};

export const draftDirectInquiry = (args: Record<string, unknown>, lang: Lang) => {
	const prepared = prepareAvailabilitySearch(args, lang);
	const apartment = accommodations.find(
		(accommodation) => accommodation.slug === prepared.apartmentSlug
	);
	const subject =
		lang === 'en'
			? `Booking request ${prepared.checkIn || ''} - ${prepared.checkOut || ''}`.trim()
			: `Buchungsanfrage ${prepared.checkIn || ''} - ${prepared.checkOut || ''}`.trim();
	const body =
		lang === 'en'
			? [
					'Hello Guesthouse Rader,',
					'',
					'I would like to request availability for the following stay:',
					`Dates: ${prepared.checkIn || '-'} to ${prepared.checkOut || '-'}`,
					`Guests: ${prepared.adults} adult(s), ${prepared.children} child(ren)`,
					`Apartment: ${apartment ? `Appartement ${apartment.title}` : 'flexible'}`,
					'',
					'Kind regards,',
				].join('\n')
			: [
					'Hallo Gaestehaus Rader,',
					'',
					'ich moechte gerne die Verfuegbarkeit fuer folgenden Aufenthalt anfragen:',
					`Zeitraum: ${prepared.checkIn || '-'} bis ${prepared.checkOut || '-'}`,
					`Gaeste: ${prepared.adults} Erwachsene, ${prepared.children} Kinder`,
					`Appartement: ${apartment ? `Appartement ${apartment.title}` : 'flexibel'}`,
					'',
					'Freundliche Gruesse',
				].join('\n');

	return {
		email: guesthouseFacts.email,
		subject,
		body,
		mailto: `mailto:${guesthouseFacts.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
	};
};

const getModelContext = (): ModelContext | null => {
	if (typeof navigator !== 'undefined' && (navigator as MaybeModelContextNavigator).modelContext) {
		return (navigator as MaybeModelContextNavigator).modelContext ?? null;
	}
	if (typeof document !== 'undefined' && (document as MaybeModelContextDocument).modelContext) {
		return (document as MaybeModelContextDocument).modelContext ?? null;
	}
	return null;
};

export const registerBookingWebMcp = ({
	getLanguage,
	getSearchState,
	setSearchState,
	focusBookingWidget,
}: RegisterBookingWebMcpOptions) => {
	if (typeof window === 'undefined') return () => {};

	const win = window as MaybeWebMcpWindow;
	win.raderBookingAgent = {
		getBookingContext: () => buildBookingContext(getLanguage(), getSearchState()),
		recommendApartments: (args) => recommendApartments(args, getLanguage()),
		prepareAvailabilitySearch: (args) => prepareAvailabilitySearch(args, getLanguage()),
		draftDirectInquiry: (args) => draftDirectInquiry(args, getLanguage()),
	};

	const modelContext = getModelContext();
	if (!modelContext) return () => {};

	win.__raderBookingWebMcpHandles?.forEach((handle) => handle?.unregister?.());

	const tools: ModelContextTool[] = [
		{
			name: 'get_booking_context',
			description:
				'Get structured property, apartment, policy, contact, and current booking-search context for Guesthouse Rader.',
			inputSchema: {
				type: 'object',
				properties: {},
			},
			execute: () => toTextResult(buildBookingContext(getLanguage(), getSearchState())),
		},
		{
			name: 'recommend_apartment',
			description:
				'Recommend suitable Guesthouse Rader apartments for a guest count and optional preferences.',
			inputSchema: {
				type: 'object',
				properties: {
					guests: { type: 'number', description: 'Total guest count.' },
					preferences: {
						type: 'string',
						description: 'Optional comma-separated preferences such as balcony, south, quiet, family.',
					},
				},
				required: ['guests'],
			},
			execute: (args) => toTextResult(recommendApartments(args, getLanguage())),
		},
		{
			name: 'prepare_availability_search',
			description:
				'Prepare the visible availability-search form before the user completes the final check in the embedded feratel booking widget.',
			inputSchema: {
				type: 'object',
				properties: {
					checkIn: { type: 'string', description: 'Arrival date in YYYY-MM-DD format.' },
					checkOut: { type: 'string', description: 'Departure date in YYYY-MM-DD format.' },
					adults: { type: 'number', description: 'Number of adults.' },
					children: { type: 'number', description: 'Number of children.' },
					apartmentSlug: {
						type: 'string',
						description: 'Optional apartment slug: nr-1, nr-2, or nr-3.',
					},
				},
				required: ['checkIn', 'checkOut', 'adults'],
			},
			execute: (args) => {
				const prepared = prepareAvailabilitySearch(args, getLanguage());
				setSearchState(prepared);
				focusBookingWidget();
				return toTextResult(prepared);
			},
		},
		{
			name: 'draft_direct_inquiry',
			description:
				'Draft a direct email inquiry for Guesthouse Rader without sending it. The user remains in control of sending.',
			inputSchema: {
				type: 'object',
				properties: {
					checkIn: { type: 'string', description: 'Arrival date in YYYY-MM-DD format.' },
					checkOut: { type: 'string', description: 'Departure date in YYYY-MM-DD format.' },
					adults: { type: 'number', description: 'Number of adults.' },
					children: { type: 'number', description: 'Number of children.' },
					apartmentSlug: {
						type: 'string',
						description: 'Optional apartment slug: nr-1, nr-2, or nr-3.',
					},
				},
				required: ['checkIn', 'checkOut', 'adults'],
			},
			execute: (args) => toTextResult(draftDirectInquiry(args, getLanguage())),
		},
		{
			name: 'focus_booking_widget',
			description: 'Scroll the embedded feratel booking widget into view for the final availability check.',
			inputSchema: {
				type: 'object',
				properties: {},
			},
			execute: () => {
				focusBookingWidget();
				return toTextResult({
					ok: true,
					nextStep:
						getLanguage() === 'en'
							? 'The feratel booking widget is now in view.'
							: 'Das feratel-Buchungswidget ist jetzt im sichtbaren Bereich.',
				});
			},
		},
	];

	const handles = tools
		.map((tool) => {
			try {
				modelContext.unregisterTool?.(tool.name);
				return modelContext.registerTool(tool);
			} catch {
				return undefined;
			}
		})
		.filter(Boolean);

	win.__raderBookingWebMcpHandles = handles;

	return () => {
		handles.forEach((handle) => handle?.unregister?.());
		delete win.raderBookingAgent;
	};
};
