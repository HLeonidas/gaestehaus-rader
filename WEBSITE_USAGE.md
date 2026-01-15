# Website Usage and Legal Checklist (Draft)

This site belongs to a hotel that lets guests book apartments through an external booking system embedded via an iframe.
This document explains the intended site usage and outlines legal items to implement later (EU/AT focus).

## Usage Overview

- Purpose: Present the hotel, rooms/apartments, prices, and local experiences, then hand off booking to the embedded provider.
- Booking flow: Users interact with an external booking system inside an iframe; the actual reservation and payment happen outside our infrastructure.
- Content sources: Images are AI-generated or taken by our staff. We ensure we have the rights to use them on the site.

## Booking System (Iframe) Notes

- The booking provider controls the booking form, checkout, and payment.
- The iframe may set cookies or process personal data. This must be disclosed.
- If the provider is a separate data controller, this must be stated in the privacy policy.
- If the provider acts as a processor, a Data Processing Agreement (DPA) is required.

## Legal Pages to Implement (EU/AT)

- Impressum (legal notice) per Austrian law (ECG/UGB):
  - Business name, legal form, address
  - Contact details (email, phone)
  - Responsible person for content
  - Company register details (if applicable)
  - VAT ID (if applicable)
- Privacy policy (GDPR):
  - Data controller identity and contact
  - Purposes and legal bases for processing
  - Categories of personal data collected
  - Recipients of data, including the booking provider
  - International transfers (if any), safeguards
  - Retention periods
  - Data subject rights and how to exercise them
  - Right to lodge a complaint with the Austrian DPA
- Cookie and tracking disclosure:
  - List all cookies from our site and the iframe provider
  - Consent banner for non-essential cookies (ePrivacy)
  - Explain how to withdraw consent
- Terms and conditions / booking terms:
  - Reservation rules, payment terms, cancellation policy
  - House rules, check-in/check-out times
  - Tourist tax, fees, and pricing notes
- Accessibility statement:
  - Describe current accessibility status and contact for issues
- Image rights note:
  - Disclose that images are AI-generated or staff-made, and confirm usage rights

## Additional Compliance Items to Consider

- Hosting and logs:
  - Identify hosting provider and log data usage in the privacy policy
- Analytics:
  - If used, add consent and disclose data processing details
- Marketing contacts:
  - If a newsletter or contact form exists, add double opt-in and consent records
- Children:
  - If marketing to minors is possible, add age-related notices
- Security:
  - TLS/HTTPS, backups, and access controls for any data we handle

## Content and UX Notes

- Clearly label the booking iframe as an external system.
- Provide fallback contact info in case the booking system is unavailable.
- Link to legal pages in the footer on every page.

## Open Questions (to finalize later)

- Who is the booking provider and are they a controller or processor?
- Do they transfer data outside the EU/EEA?
- Which cookies are set by the iframe and by our site?
- Do we use analytics, maps, or external fonts that require consent?
