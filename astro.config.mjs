// @ts-check
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://www.larskleiner.de',
  output: 'static',
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  redirects: {
    '/': '/de/',
  },
})
