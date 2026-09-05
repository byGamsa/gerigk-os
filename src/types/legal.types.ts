export interface PostalAddress {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

// Required legal notice details (§ 5 DDG, § 18 Abs. 2 MStV)
export interface LegalInfo {
  // Full first and last name
  name: string;
  // Address for service – no PO box
  address: PostalAddress;
  email: string;
  // Second fast contact channel (phone or contact form URL) – recommended
  phone: string | null;
  // Responsible for journalistic-editorial content (§ 18 Abs. 2 MStV); `null` = same person as above
  responsible: { name: string; address: PostalAddress } | null;
  // Website hosting provider (for the privacy policy)
  hosting: { name: string; address: string };
  // Privacy policy date, e.g. "September 2026"
  privacyUpdated: string;
}
