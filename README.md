# larskleiner.de

Personal website for Lars Kleiner — web developer, Drupal expert, cyclist and amateur photographer.

Built with [Astro](https://astro.build), Bootstrap 5, and Astro's built-in i18n. Migrated from Nuxt 3.

## Structure

```
src/
  i18n/
    translations.ts     # DE/EN strings + useTranslations() helper
  layouts/
    BaseLayout.astro    # HTML document, head, hreflang, Bootstrap, Google Font
  components/
    Nav.astro           # Language switcher
    Footer.astro        # Copyright + nav links
  pages/
    de/                 # German pages (/de/)
    en/                 # English pages (/en/)
  styles/
    main.css            # Custom styles (Bootstrap 5 + overrides)
public/
  favicon.ico
```

## i18n

Both locales are URL-prefixed (`/de/` and `/en/`). Root `/` redirects to `/de/`. Default locale is German.

## Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build static site to `./dist/` |
| `npm run preview` | Preview the build locally |
| `npx astro check` | TypeScript check |
