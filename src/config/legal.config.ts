import type { LegalInfo } from '@/types';

// Legal notice details – [bracketed] values are placeholders and trigger a warning
export const legalConfig: LegalInfo = {
  name: 'Lars Gerigk',
  address: {
    street: 'c/o Dendree, Kipperweg 10',
    postalCode: '70569',
    city: 'Stuttgart',
    country: 'Deutschland',
  },
  email: 'larsgerigk@gmx.de',
  phone: null,
  responsible: null,
  hosting: {
    name: 'IONOS SE',
    address: 'Elgendorfer Str. 57, 56410 Montabaur, Deutschland',
  },
  privacyUpdated: 'November 2026',
};
