# Speed, SEO & Accessibility Optimisation Design

**Date:** 2026-05-13
**Site:** larskleiner.de — Astro personal website

## Overview

Optimise the Astro site across three axes: speed (remove Bootstrap dependency, self-host font), SEO (canonical, hreflang x-default, OG tags, locale-aware description), and accessibility (skip link, aria labels, descriptive alt text, contrast fix, lang attributes on bilingual pages).

---

## Section 1: CSS & Dependencies

### Bootstrap removal

Remove `bootstrap` and `@popperjs/core` from `package.json` entirely. Remove the `import 'bootstrap/dist/css/bootstrap.min.css'` and Bootstrap JS `<script>` from `src/layouts/BaseLayout.astro`.

Replace the ~15 Bootstrap utility classes used across the site with hand-written CSS appended to `src/styles/main.css`:

| Class | Rule |
|---|---|
| `.container-fluid` | `width: 100%; padding: 0 12px` |
| `.row` | `display: flex; flex-wrap: wrap; margin: 0 -12px` |
| `.col` | `flex: 1 0 0%; padding: 0 12px` |
| `.col-11` | `flex: 0 0 auto; width: 91.667%; padding: 0 12px` |
| `.col-md-1` | `flex: 0 0 auto; width: 8.333%; padding: 0 12px` at ≥768px |
| `.d-flex` | `display: flex` |
| `.flex-column` | `flex-direction: column` |
| `.justify-content-center` | `justify-content: center` |
| `.float-md-end` | `float: right` at ≥768px |
| `.mt-3` | `margin-top: 1rem` |
| `.pb-5` | `padding-bottom: 3rem` |
| `.p-3` | `padding: 1rem` |
| `.mb-3` | `margin-bottom: 1rem` |
| `.text-center` | `text-align: center` |
| `.btn` | base button styles (inline-block, padding, border-radius, transition) |
| `.btn-outline-secondary` | `color: #6c757d; border: 1px solid #6c757d` with hover inversion |

No markup changes — all existing class names in `.astro` files are preserved.

### Font self-hosting

Download `PermanentMarker-Regular.woff2` from Google Fonts and place it at `public/fonts/PermanentMarker-Regular.woff2`.

Add to `src/styles/main.css`:
```css
@font-face {
  font-family: 'Permanent Marker';
  src: url('/fonts/PermanentMarker-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Remove from `src/layouts/BaseLayout.astro`:
- `<link rel="preconnect" href="https://fonts.googleapis.com" />`
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`
- `<link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" />`

`font-display: swap` prevents invisible text during font load (FOIT).

---

## Section 2: SEO

### Files changed

**`src/i18n/translations.ts`** — add a `description` key to both locales:
- `de`: `'Hallo, ich bin Lars Kleiner. Webentwickler, Drupal-Experte, Radfahrer und Hobbyfotograf.'`
- `en`: `"Hello, I'm Lars Kleiner. Web developer, Drupal expert, cyclist and amateur photographer."`

**`src/layouts/BaseLayout.astro`** — add `description` as an optional prop (type `string | undefined`). If not provided, derive it from `lang` using the translations module. Add to `<head>`:

```html
<!-- Canonical -->
<link rel="canonical" href={canonicalUrl} />

<!-- hreflang (existing de + en, plus x-default) -->
<link rel="alternate" hreflang="de" href={deUrl} />
<link rel="alternate" hreflang="en" href={enUrl} />
<link rel="alternate" hreflang="x-default" href="https://www.larskleiner.de/de/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:locale" content={lang === 'de' ? 'de_DE' : 'en_US'} />
```

The `canonicalUrl` is `getAbsoluteLocaleUrl(lang, pagePath)` — same value already computed for the DE hreflang, just reused.

**`src/pages/de/index.astro` and `src/pages/en/index.astro`** — pass `description={t.hello}` to `<BaseLayout>`.

**`src/pages/de/about.astro`** — add `useTranslations` import and `const t = useTranslations(lang)`, change hardcoded `title="Lars Kleiner – Impressum"` to `title={\`Lars Kleiner – ${t.about}\`}` (matching the EN version).

**`src/pages/de/privacy.astro`** — same fix: add `useTranslations` import and `const t = useTranslations(lang)`, change hardcoded `title="Lars Kleiner – Datenschutzerklärung"` to `title={\`Lars Kleiner – ${t.privacy}\`}` (matching the EN version).

About and privacy pages do not need explicit `description` prop — BaseLayout falls back to the locale-aware default.

---

## Section 3: Accessibility

### Skip-to-content link

Add to `src/layouts/BaseLayout.astro` — first element inside `<body>`:
```html
<a href="#main-content" class="skip-link">Skip to content</a>
```

Wrap the `<slot />` in `<main id="main-content">`:
```html
<main id="main-content">
  <slot />
</main>
```

Add to `src/styles/main.css`:
```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 1rem;
  z-index: 9999;
  padding: 0.5rem 1rem;
  background: #fff;
  border: 1px solid #343a40;
  border-radius: 0.25rem;
}
.skip-link:focus {
  left: 1rem;
}
```

### Nav aria-label

`src/components/Nav.astro` — add `aria-label="Language switcher"` to the `<nav>` element.

### Descriptive alt text

Update all 5 social icon `alt` attributes in `src/pages/de/index.astro` and `src/pages/en/index.astro`:

| Image | Current | New |
|---|---|---|
| `larskleiner.png` | `"Lars Kleiner"` | unchanged |
| `linkedin.png` | `"linkedin"` | `"Lars Kleiner on LinkedIn"` |
| `drupal.png` | `"drupal"` | `"Lars Kleiner on Drupal"` |
| `github.png` | `"github"` | `"Lars Kleiner on GitHub"` |
| `strava.png` | `"strava"` | `"Lars Kleiner on Strava"` |
| `instagram.png` | `"instagram"` | `"Lars Kleiner on Instagram"` |

Changes apply to both `de/index.astro` and `en/index.astro`.

### Footer text contrast

`src/styles/main.css` — change footer `color` from `#6c757d` (ratio 4.48:1, fails WCAG AA for small text) to `#545b62` (ratio ~5.4:1, passes AA):

```css
footer {
  color: #545b62; /* was #6c757d — improved contrast for WCAG AA */
  font-size: 0.875em;
}
```

### `lang` attribute on legal content pages

`src/pages/en/about.astro` and `src/pages/en/privacy.astro` — the `<html>` element has `lang="en"` (correct for the chrome) but the body content is German. Add `lang="de"` to the `<article>` element in both files so screen readers switch to German pronunciation for the legal text.

---

## File Change Summary

| File | Change |
|---|---|
| `package.json` | Remove `bootstrap`, `@popperjs/core` |
| `src/styles/main.css` | Add `@font-face`, bootstrap replacement utilities, skip-link CSS, contrast fix |
| `src/layouts/BaseLayout.astro` | Remove Bootstrap imports + font links; add canonical, x-default, OG tags, skip link, `<main>` wrapper; add `description` prop |
| `src/i18n/translations.ts` | Add `description` key to both locales |
| `src/components/Nav.astro` | Add `aria-label` to `<nav>` |
| `src/pages/de/index.astro` | Pass `description` prop; update alt text |
| `src/pages/en/index.astro` | Pass `description` prop; update alt text |
| `src/pages/de/about.astro` | Add `useTranslations`; use `t.about` in title |
| `src/pages/de/privacy.astro` | Add `useTranslations`; use `t.privacy` in title |
| `src/pages/en/about.astro` | Add `lang="de"` to `<article>` |
| `src/pages/en/privacy.astro` | Add `lang="de"` to `<article>` |
| `public/fonts/PermanentMarker-Regular.woff2` | New file — self-hosted font |
