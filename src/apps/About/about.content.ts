import { osConfig } from '@/config/os.config';
import type { AboutContent } from './About.types';

// Sources: CV, LinkedIn and GitHub profile – no phone number or third-party contact data on purpose
export const aboutContent: AboutContent = {
  name: osConfig.owner,
  photo: '/about/portrait.webp',
  role: { de: 'Full-Stack Developer · Medieninformatik-Student', en: 'Full-stack developer · Computer science student' },
  location: { de: 'Stuttgart · Hochschule der Medien', en: 'Stuttgart · Stuttgart Media University' },
  intro: {
    de: 'Full-Stack-Entwickler und IT-Coach mit Fokus auf digitale Lösungen, die echte Probleme lösen. Mir sind Qualität, Klarheit und Produkte wichtig, die Unternehmen wachsen lassen und effizienter machen. Ich studiere Medieninformatik an der HdM Stuttgart, entwickle bei der Mercedes-Benz AG und habe die Softwarefirma Dendree mitgegründet.',
    en: 'Full-stack developer and IT coach focused on building digital solutions that solve real problems. I care about quality, clarity and products that help businesses grow and work more efficiently. I study computer science and media at Stuttgart Media University, develop software at Mercedes-Benz AG and co-founded the software company Dendree.',
  },
  contact: [
    { label: 'GitHub', href: 'https://github.com/byGamsa' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lars-gerigk/' },
    { label: 'E-Mail', href: 'mailto:larsgerigk@gmx.de' },
  ],
  highlights: [
    {
      title: 'Gaia Protocol',
      meta: { de: 'gamescom 2026 · RAW Talent Booth', en: 'gamescom 2026 · RAW Talent Booth' },
      text: {
        de: 'VR-Spiel aus einem HdM-Teamprojekt – erst auf der MediaNight gezeigt, dann in Köln auf der gamescom einem internationalen Publikum präsentiert.',
        en: 'VR game from an HdM team project – first shown at the MediaNight, then presented to an international audience at gamescom in Cologne.',
      },
    },
    {
      title: 'Stream Scheduler',
      meta: { de: 'Uni-Projekt → eigenes Produkt', en: 'University project → own product' },
      text: {
        de: 'Planungstool für Livestreams: Sendepläne, Specials, Sponsorings und Teams an einem Ort. Wird nach der MediaNight gemeinsam weiterentwickelt.',
        en: 'Planning tool for livestreams: schedules, specials, sponsorships and teams in one place. Developed further as a team after the MediaNight.',
      },
    },
    {
      title: 'Dendree',
      meta: { de: 'Meine Softwarefirma', en: 'My software company' },
      text: {
        de: 'Individuelle Software für ambitionierte Unternehmen – von Web-Plattformen über Mobile Apps bis zu KI-Lösungen, end-to-end entwickelt.',
        en: 'Custom-built software for ambitious businesses – from web platforms to mobile apps and AI solutions, built end to end.',
      },
      href: 'https://dendree.de',
    },
  ],
  experience: [
    {
      title: { de: 'Mitgründer', en: 'Co-founder' },
      org: 'Dendree GbR · Stuttgart',
      period: { de: 'Nov 2026 – heute', en: 'Nov 2026 – present' },
      text: {
        de: 'Web-Plattformen, Apps und KI-Werkzeuge für Unternehmen: Frontend und Backend mit Next.js, FastAPI und Supabase sowie Betrieb der Server-Infrastruktur mit Terraform und Docker.',
        en: 'Web platforms, apps and AI tools for businesses: frontend and backend with Next.js, FastAPI and Supabase, plus running the server infrastructure with Terraform and Docker.',
      },
    },
    {
      title: { de: 'Full-Stack-Webentwickler', en: 'Full-stack web developer' },
      org: 'Mercedes-Benz AG · Böblingen',
      period: { de: 'Mär 2025 – heute', en: 'Mar 2025 – present' },
      text: {
        de: 'Zentrale Webanwendung zur digitalen Nachrüstung von Sonderausstattungen: Frontend und Backend, Abrechnungssystem und Integration interner Schnittstellen – mit Angular, AWS und Kubernetes.',
        en: 'Central web application for digitally retrofitting optional equipment: frontend and backend, billing system and integration of internal interfaces – with Angular, AWS and Kubernetes.',
      },
    },
    {
      title: { de: 'Portfolio Manager', en: 'Portfolio manager' },
      org: 'Nextise GmbH · Stuttgart',
      period: { de: 'Nov 2023 – heute', en: 'Nov 2023 – present' },
      text: {
        de: 'Konzeption und Durchführung von Softwareschulungen, Leitung eines Entwicklerteams und maßgeschneiderte Lösungen für Kunden wie Volkswagen AG, TÜV Nord und Uni Stuttgart.',
        en: 'Designing and teaching software trainings, leading a team of developers and building tailored solutions for clients such as Volkswagen AG, TÜV Nord and the University of Stuttgart.',
      },
    },
    {
      title: { de: 'Studentische Hilfskraft', en: 'Student assistant' },
      org: 'Hochschule der Medien Stuttgart',
      period: { de: 'Sep 2024 – Aug 2025', en: 'Sep 2024 – Aug 2025' },
      text: { de: 'Unterstützung in der Lehre mit Python.', en: 'Teaching support with Python.' },
    },
  ],
  education: [
    {
      title: { de: 'M.Sc. Computer Science and Media (geplant)', en: 'M.Sc. Computer Science and Media (planned)' },
      org: 'Hochschule der Medien · Stuttgart',
      period: { de: 'ab Mär 2027', en: 'from Mar 2027' },
    },
    {
      title: { de: 'B.Sc. Medieninformatik', en: 'B.Sc. Computer Science and Media' },
      org: 'Hochschule der Medien · Stuttgart',
      period: { de: 'seit Mär 2023', en: 'since Mar 2023' },
      text: {
        de: 'Verbindet technische und kreative Aspekte der Softwareentwicklung. Schwerpunkte: Künstliche Intelligenz, Virtual Reality, Webentwicklung sowie Datenbank- und Anwendungsentwicklung.',
        en: 'Combines technical and creative aspects of software development. Focus: artificial intelligence, virtual reality, web development, database and application development.',
      },
    },
    {
      title: { de: 'Allgemeine Hochschulreife', en: 'A levels (Abitur)' },
      org: 'Albertus-Magnus-Gymnasium · Stuttgart',
      period: { de: '2014 – 2022', en: '2014 – 2022' },
      text: {
        de: 'Schwerpunkte Mathematik und Informatik; engagiert in SMV und KSJ, Schülersprecher und Mitglied der Schulkonferenz.',
        en: 'Focus on mathematics and computer science; active in the student council and KSJ, student representative and member of the school conference.',
      },
    },
  ],
  skills: [
    { label: { de: 'Sprachen', en: 'Languages' }, items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#'] },
    { label: 'Frontend', items: ['React', 'Next.js', 'React Native', 'Angular', 'Vue / Nuxt', 'Tailwind CSS'] },
    { label: { de: 'Backend & Daten', en: 'Backend & data' }, items: ['FastAPI', 'Node.js', 'PostgreSQL', 'Supabase', 'MongoDB'] },
    { label: 'DevOps & Cloud', items: ['Git', 'Docker', 'Terraform', 'GitHub Actions', 'Kubernetes', 'AWS'] },
    { label: { de: 'Games, XR & Desktop', en: 'Games, XR & desktop' }, items: ['Unity', 'Virtual Reality', 'Tauri'] },
    {
      label: { de: 'Persönlich', en: 'Personal' },
      items: [
        { de: 'Teamfähigkeit', en: 'Teamwork' },
        { de: 'Analytisches Denken', en: 'Analytical thinking' },
        { de: 'Entscheidungskompetenz', en: 'Decision-making' },
        { de: 'Kreativ & fleißig', en: 'Creative & hard-working' },
      ],
    },
  ],
  volunteering: [
    {
      title: { de: 'Betreuer', en: 'Supervisor' },
      org: 'UNICEF-Kinderspielstadt Stutengarten',
      period: { de: 'seit 2019', en: 'since 2019' },
    },
    {
      title: { de: 'Jugendleiter', en: 'Youth leader' },
      org: 'Katholische Studierende Jugend · Stuttgart',
      period: { de: 'Apr 2017 – Mär 2023', en: 'Apr 2017 – Mar 2023' },
      text: {
        de: 'Gruppenstunden, Workshops und Freizeiten geplant und geleitet.',
        en: 'Planned and led group sessions, workshops and camps.',
      },
    },
  ],
  awards: [
    {
      title: { de: 'Finalist bei Jugend gründet', en: 'Finalist at Jugend gründet' },
      org: 'Bundesministerium für Bildung und Forschung',
      period: { de: 'Mai 2021', en: 'May 2021' },
      text: {
        de: '18. Platz unter bundesweit 3.726 Teilnehmenden.',
        en: '18th place among 3,726 participants nationwide.',
      },
    },
    {
      title: { de: 'Python-Grundkurs', en: 'Python foundation course' },
      org: 'Coding Academy',
      period: { de: 'Aug 2023', en: 'Aug 2023' },
      text: {
        de: 'Im Rahmen des IT-Designers-Sponsoring-Programms.',
        en: 'As part of the IT-Designers sponsorship programme.',
      },
    },
  ],
};
