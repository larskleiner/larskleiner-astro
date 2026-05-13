const translations = {
  de: {
    about: 'Impressum',
    privacy: 'Datenschutzerklärung',
    description: 'Hallo, ich bin Lars Kleiner. Webentwickler, Drupal-Experte, Radfahrer und Hobbyfotograf.',
    tagline: 'Webentwickler · Drupal · Läufer & Radfahrer',
    backLink: '← Zurück',
    linkedinSub: 'Aktuelles Profil',
    drupalSub: 'drupal.org Dashboard',
    githubSub: 'Open source',
    stravaSub: 'Aktivitäten',
    instagramSub: 'Lieblingsfotos',
    flickrSub: 'Älteres Portfolio',
  },
  en: {
    about: 'About',
    privacy: 'Privacy policy',
    description: "Hello, I'm Lars Kleiner. Web developer, Drupal expert, cyclist and amateur photographer.",
    tagline: 'Web Developer · Drupal · Runner & Cyclist',
    backLink: '← Back',
    linkedinSub: 'Current profile',
    drupalSub: 'drupal.org Dashboard',
    githubSub: 'Open source',
    stravaSub: 'Activities',
    instagramSub: 'Favourite photos',
    flickrSub: 'Older portfolio',
  },
} as const

type Locale = keyof typeof translations

export function useTranslations(lang: string) {
  const locale: Locale = lang in translations ? (lang as Locale) : 'de'
  return translations[locale]
}
