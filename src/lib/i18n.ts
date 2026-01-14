import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';

export type Lang = 'de' | 'en';

const defaultLang: Lang = 'de';
const storedLang = browser ? (localStorage.getItem('lang') as Lang | null) : null;

export const lang = writable<Lang>(storedLang ?? defaultLang);

if (browser) {
	lang.subscribe((value) => {
		localStorage.setItem('lang', value);
		document.documentElement.lang = value;
	});
}

const translations: Record<Lang, Record<string, string>> = {
	de: {
		'nav.home': 'Start',
		'nav.about': 'Über uns',
		'nav.rooms': 'Unterkünfte & Preise',
		'nav.booking': 'Jetzt buchen',
		'nav.contact': 'Kontakt',
		'hero.kicker': 'Alpine Ruhe · Kärnten',
		'hero.title': 'Ankommen, aufatmen, wohlfühlen.',
		'hero.subtitle':
			'Gästehaus Rader verbindet warmes Holz, klare Bergluft und drei liebevoll gestaltete Appartements im Gitschtal.',
		'hero.cta.primary': 'Verfügbarkeit prüfen',
		'hero.cta.secondary': 'Unterkünfte entdecken',
		'usp.title': 'Warum Gästehaus Rader',
		'usp.1.title': 'Drei individuelle Appartements',
		'usp.1.body': 'Viel Raum, alpine Materialien und moderne Ausstattung für 2–6 Personen.',
		'usp.2.title': 'Beste Lage im Gitschtal',
		'usp.2.body': 'Wandern, Skifahren und Seen in kurzer Distanz – perfekt für jede Jahreszeit.',
		'usp.3.title': 'Persönliche Gastgeber',
		'usp.3.body': 'Familiär geführt mit dem Blick fürs Detail und Insider-Tipps für Kärnten.',
		'rooms.preview.title': 'Unterkünfte & Preise',
		'rooms.preview.subtitle': 'Vergleichen Sie unsere Appartements auf einen Blick.',
		'rooms.card.1.title': 'Appartement Panorama',
		'rooms.card.1.body': 'Großzügig, sonniger Balkon, ideal für Familien.',
		'rooms.card.2.title': 'Appartement Bergblick',
		'rooms.card.2.body': 'Ruhig gelegen, hochwertig ausgestattet, viel Privatsphäre.',
		'rooms.card.3.title': 'Appartement Talblick',
		'rooms.card.3.body': 'Gemütlich, perfekt für Paare oder kleine Familien.',
		'experiences.title': 'Erlebnisse rund um das Gästehaus',
		'experiences.body':
			'Vom Skitag auf der Nassfeld-Region bis zur Sommerfrische am Weißensee – hier beginnt der Urlaub vor der Haustür.',
		'cta.title': 'Bereit für Ihre Auszeit?',
		'cta.body': 'Prüfen Sie Verfügbarkeit und sichern Sie sich Ihr Wunsch-Appartement.',
		'price.from': 'ab € 95 / Nacht',
		'experiences.card.1.title': 'Weißensee',
		'experiences.card.1.body': 'Schwimmen, SUP, Spaziergänge am Wasser.',
		'experiences.card.2.title': 'Nassfeld',
		'experiences.card.2.body': 'Skifahren und Winterwanderwege.',
		'experiences.card.3.title': 'Gitschtal',
		'experiences.card.3.body': 'Almwiesen, Panoramawege, Ruhe pur.',
		'experiences.card.4.title': 'Familienzeit',
		'experiences.card.4.body': 'Naturspielplätze und regionale Kulinarik.',
		'footer.links': 'Schnellzugriff',
		'footer.legal': 'Rechtliches',
		'footer.imprint': 'Impressum',
		'footer.privacy': 'Datenschutz',
		'footer.terms': 'AGB',
		'about.title': 'Über Gästehaus Rader',
		'about.body':
			'Hier erzählen wir die Geschichte Ihres Hauses, Ihre Werte und was den Aufenthalt besonders macht.',
		'about.card.1.title': 'Gastgeber mit Herz',
		'about.card.1.body':
			'Wir setzen auf persönliche Betreuung, regionale Empfehlungen und flexible Lösungen.',
		'about.card.2.title': 'Qualität & Details',
		'about.card.2.body':
			'Hochwertige Materialien, ruhige Farben und eine Atmosphäre zum Abschalten.',
		'about.card.3.title': 'Ganzjährig attraktiv',
		'about.card.3.body':
			'Schneereiche Winter, klare Seen im Sommer und Naturerlebnisse im Herbst.',
		'rooms.title': 'Unterkünfte & Preise',
		'rooms.body':
			'Eine klare Übersicht über Ausstattung, Größe und saisonale Preise der Appartements.',
		'booking.title': 'Verfügbarkeit & Buchung',
		'booking.body':
			'Derzeit führt die Buchung zum externen Partner. Später kann hier ein eigenes System integriert werden.',
		'contact.title': 'Kontakt',
		'contact.body':
			'Kontaktformular, Lageplan, Anreiseinfos und direkte Kontaktmöglichkeiten.',
		'booking.form.checkin': 'Anreise',
		'booking.form.checkout': 'Abreise',
		'booking.form.guests': 'Gäste',
		'booking.form.cta': 'Jetzt prüfen',
		'booking.form.note': 'Sie werden zum Buchungspartner weitergeleitet.',
		'booking.direct.title': 'Direktkontakt',
		'booking.direct.body': 'Fragen? Schreiben oder rufen Sie uns gerne an.',
		'contact.form.name': 'Name',
		'contact.form.email': 'Email',
		'contact.form.message': 'Nachricht',
		'contact.form.cta': 'Nachricht senden',
		'contact.arrival.title': 'Anreise',
		'contact.arrival.body': 'Details zu Anfahrt und Check-in folgen.'
	},
	en: {
		'nav.home': 'Home',
		'nav.about': 'About',
		'nav.rooms': 'Rooms & Prices',
		'nav.booking': 'Book now',
		'nav.contact': 'Contact',
		'hero.kicker': 'Alpine calm · Carinthia',
		'hero.title': 'Arrive, exhale, feel at home.',
		'hero.subtitle':
			'Gästehaus Rader blends warm timber, crisp mountain air, and three lovingly designed apartments in the Gitschtal.',
		'hero.cta.primary': 'Check availability',
		'hero.cta.secondary': 'Discover rooms',
		'usp.title': 'Why Gästehaus Rader',
		'usp.1.title': 'Three distinctive apartments',
		'usp.1.body': 'Spacious layouts, alpine materials, and modern comforts for 2–6 guests.',
		'usp.2.title': 'Prime Gitschtal location',
		'usp.2.body': 'Hiking, skiing, and lakes nearby – perfect for every season.',
		'usp.3.title': 'Personal hosts',
		'usp.3.body': 'Family-run with a sense for detail and insider tips for Carinthia.',
		'rooms.preview.title': 'Rooms & Prices',
		'rooms.preview.subtitle': 'Compare our apartments at a glance.',
		'rooms.card.1.title': 'Panorama Apartment',
		'rooms.card.1.body': 'Spacious, sunny balcony, ideal for families.',
		'rooms.card.2.title': 'Mountain View Apartment',
		'rooms.card.2.body': 'Quiet setting, premium finishes, lots of privacy.',
		'rooms.card.3.title': 'Valley View Apartment',
		'rooms.card.3.body': 'Cozy, perfect for couples or small families.',
		'experiences.title': 'Experiences nearby',
		'experiences.body':
			'From ski days in Nassfeld to summer escapes at Weißensee – your holiday starts right outside.',
		'cta.title': 'Ready for your getaway?',
		'cta.body': 'Check availability and secure your preferred apartment.',
		'price.from': 'from € 95 / night',
		'experiences.card.1.title': 'Weißensee',
		'experiences.card.1.body': 'Swimming, SUP, lakeside walks.',
		'experiences.card.2.title': 'Nassfeld',
		'experiences.card.2.body': 'Skiing and winter hiking trails.',
		'experiences.card.3.title': 'Gitschtal',
		'experiences.card.3.body': 'Alpine meadows, panoramic paths, pure calm.',
		'experiences.card.4.title': 'Family time',
		'experiences.card.4.body': 'Nature playgrounds and local cuisine.',
		'footer.links': 'Quick links',
		'footer.legal': 'Legal',
		'footer.imprint': 'Imprint',
		'footer.privacy': 'Privacy',
		'footer.terms': 'Terms',
		'about.title': 'About Gästehaus Rader',
		'about.body':
			'Here we share the story of your home, your values, and what makes each stay special.',
		'about.card.1.title': 'Hosts with heart',
		'about.card.1.body':
			'Personal care, local recommendations, and flexible solutions tailored to you.',
		'about.card.2.title': 'Quality & details',
		'about.card.2.body':
			'Premium materials, calm tones, and an atmosphere made for unwinding.',
		'about.card.3.title': 'Great all year',
		'about.card.3.body':
			'Snowy winters, clear summer lakes, and nature escapes every season.',
		'rooms.title': 'Rooms & Prices',
		'rooms.body':
			'A clear overview of amenities, size, and seasonal pricing for each apartment.',
		'booking.title': 'Availability & Booking',
		'booking.body':
			'Booking currently redirects to our external partner. Later, this can be upgraded to a full in-house system.',
		'contact.title': 'Contact',
		'contact.body':
			'Contact form, map, travel information, and direct ways to reach us.',
		'booking.form.checkin': 'Check-in',
		'booking.form.checkout': 'Check-out',
		'booking.form.guests': 'Guests',
		'booking.form.cta': 'Check now',
		'booking.form.note': 'You will be redirected to our booking partner.',
		'booking.direct.title': 'Direct contact',
		'booking.direct.body': 'Questions? Send us a message or give us a call.',
		'contact.form.name': 'Name',
		'contact.form.email': 'Email',
		'contact.form.message': 'Message',
		'contact.form.cta': 'Send message',
		'contact.arrival.title': 'Arrival',
		'contact.arrival.body': 'Directions and check-in details will follow.'
	}
};

export const t = derived(lang, ($lang) => {
	return (key: string) => translations[$lang][key] ?? translations[defaultLang][key] ?? key;
});

export const setLang = (value: Lang) => lang.set(value);
