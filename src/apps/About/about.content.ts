import { osConfig } from '@/config/os.config';
import type { AboutContent } from './About.types';

// Sources: CV, LinkedIn and GitHub profile – no phone number or third-party contact data on purpose
export const aboutContent: AboutContent = {
  name: osConfig.owner,
  role: { de: 'Full-Stack Developer · Medieninformatik-Student', en: 'Full-stack developer · Computer science student' },
  location: { de: 'Stuttgart · Hochschule der Medien', en: 'Stuttgart · Stuttgart Media University' },
  intro: {
    de: 'Full-Stack-Entwickler und IT-Coach mit Fokus auf digitale Lösungen, die echte Probleme lösen. Mir sind Qualität, Klarheit und Produkte wichtig, die Unternehmen wachsen lassen und effizienter machen. Aktuell studiere ich Medieninformatik an der HdM Stuttgart und schreibe meine Bachelorarbeit bei der Mercedes-Benz AG.',
    en: 'Full-stack developer and IT coach focused on building digital solutions that solve real problems. I care about quality, clarity and products that help businesses grow and work more efficiently. I currently study computer science and media at Stuttgart Media University and write my bachelor thesis at Mercedes-Benz AG.',
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
      title: { de: 'Bachelorand', en: 'Bachelor thesis student' },
      org: 'Mercedes-Benz AG · Böblingen',
      period: { de: 'Sep 2026 – heute', en: 'Sep 2026 – present' },
    },
    {
      title: { de: 'Werkstudent & Praktikant – Fullstack Webentwicklung', en: 'Working student & intern – full-stack web development' },
      org: 'Mercedes-Benz AG · Böblingen',
      period: { de: 'Mär 2025 – Aug 2026', en: 'Mar 2025 – Aug 2026' },
      text: {
        de: 'Zentrale Webanwendung zur digitalen Nachrüstung von Sonderausstattungen: Frontend und Backend, Abrechnungssystem und Integration interner Schnittstellen – mit Angular, AWS und Kubernetes.',
        en: 'Central web application for digitally retrofitting optional equipment: frontend and backend, billing system and integration of internal interfaces – with Angular, AWS and Kubernetes.',
      },
    },
    {
      title: { de: 'Portfoliomanager (freiberuflich)', en: 'Portfolio manager (freelance)' },
      org: 'Nextise · Kodschul.com · Stuttgart',
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
      title: { de: 'B.Sc. Medieninformatik', en: 'B.Sc. Computer Science and Media' },
      org: 'Hochschule der Medien · Stuttgart',
      period: { de: 'seit 2023', en: 'since 2023' },
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
        de: 'Schwerpunkte Mathematik und Informatik; Schülersprecher, SMV und Mitglied der Schulkonferenz.',
        en: 'Focus on mathematics and computer science; student representative, student council and member of the school conference.',
      },
    },
  ],
  skills: [
    { label: { de: 'Sprachen', en: 'Languages' }, items: ['TypeScript', 'JavaScript', 'Java', 'C#', 'Python'] },
    { label: 'Frontend', items: ['React', 'React Native', 'Angular', 'Vue / Nuxt', 'Tailwind CSS'] },
    { label: { de: 'Backend & Daten', en: 'Backend & data' }, items: ['Node.js', 'PostgreSQL', 'MongoDB'] },
    { label: 'DevOps & Cloud', items: ['Git', 'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'] },
    { label: { de: 'Games & XR', en: 'Games & XR' }, items: ['Unity', 'Virtual Reality'] },
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
      title: { de: 'Jugendleiter & Schülermentor', en: 'Youth leader & student mentor' },
      org: 'KSJ Rottenburg-Stuttgart',
      period: { de: 'seit 2017', en: 'since 2017' },
      text: {
        de: 'Organisation und Leitung von Gruppenaktivitäten, Workshops, Exkursionen und Freizeiten.',
        en: 'Organising and leading group activities, workshops, excursions and camps.',
      },
    },
  ],
};
