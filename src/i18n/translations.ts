const translations = {
  de: {
    hello: 'Hallo, ich bin Lars Kleiner. Webentwickler, Drupal-Experte, Radfahrer und Hobbyfotograf.',
    linkedin: 'Mein aktuelles Profil. Ein etwas weniger gepflegtes Profil habe ich auch auf ',
    drupal: 'Mein Dashboard auf drupal.org. Drupal ist ein auf PHP basierendes Framework das einem ermöglicht sein eigenes Content Management System zu entwickeln.',
    github: 'Mein github Konto. Überwiegend private Contributions für Drupal Projekte aber in letzter Zeit auch für JavaScript Projekte wie dieser Astro Site.',
    strava: 'Mein Profil auf Strava. Hier tracke ich meine Aktivitäten wie Rennradfahren, Laufen und Schwimmen.',
    instagram: 'Meine persönlichen Lieblingsfotos. Eine ältere Auswahl gibt es auch noch auf ',
    about: 'Impressum',
    privacy: 'Datenschutzerklärung',
    description: 'Hallo, ich bin Lars Kleiner. Webentwickler, Drupal-Experte, Radfahrer und Hobbyfotograf.',
  },
  en: {
    hello: "Hello, I'm Lars Kleiner. Web developer, Drupal expert, cyclist and amateur photographer.",
    linkedin: 'My current profile. A less up to date version is also available on ',
    drupal: 'My dashboard on drupal.org. Drupal is a PHP-based framework that allows you to build your own content management system.',
    github: 'My account on github. Mostly private contributions to Drupal projects but more recently also to JavaScript projects like this Astro site.',
    strava: 'My profile on Strava. This is where I track my activities like road cycling, running and swimming.',
    instagram: 'A selection of my favourite pictures. An older portfolio is also available on ',
    about: 'About',
    privacy: 'Privacy policy',
    description: "Hello, I'm Lars Kleiner. Web developer, Drupal expert, cyclist and amateur photographer.",
  },
} as const

type Locale = keyof typeof translations

export function useTranslations(lang: string) {
  const locale: Locale = lang in translations ? (lang as Locale) : 'de'
  return translations[locale]
}
