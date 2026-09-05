import type { InfoSectionData, RelatedLink } from '../../System.types';

export interface InfoSectionProps {
  section: InfoSectionData;
  // Extra "Related links" bar below the content
  links?: readonly RelatedLink[];
  defaultOpen?: boolean;
}
