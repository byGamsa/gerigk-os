import type { LegalInfo } from '@/types';

// Legal notice details – enter your real data; [bracketed] values are placeholders and trigger a warning
export const legalConfig: LegalInfo = {
  name: '[Vor- und Nachname]',
  address: {
    street: '[Straße und Hausnummer]',
    postalCode: '[PLZ]',
    city: '[Ort]',
    country: 'Deutschland',
  },
  email: '[E-Mail-Adresse]',
  phone: '[Telefonnummer]',
  responsible: null,
  hosting: {
    name: '[Hosting-Anbieter, z. B. Netlify, Vercel, Strato]',
    address: '[Anschrift des Hosting-Anbieters]',
  },
  privacyUpdated: 'September 2026',
};
