import { InfoSection } from '../components/InfoSection/InfoSection';
import { systemStyles as s } from '../System.styles';
import type { SystemApi } from '../useSystem';

// System › Privacy – privacy policy in collapsible sections
export function PrivacyPage({ sys }: { sys: SystemApi }) {
  return (
    <>
      <p className={s.intro}>{sys.t('system.privacyIntro')}</p>
      <div className={s.sectionsSpaced}>
        {sys.privacy.sections.map((section, i) => (
          <InfoSection key={section.id} section={section} defaultOpen={i < 2} />
        ))}
      </div>
    </>
  );
}
