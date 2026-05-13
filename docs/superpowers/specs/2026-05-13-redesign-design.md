# Contemporary Redesign Design

**Date:** 2026-05-13
**Site:** larskleiner.de — Astro personal website

## Overview

Contemporary redesign of the site in a "Studio" direction: white background, near-black text, system-ui font, sharp grid, Permanent Marker reserved for card titles and page titles only. The opinionated handwritten personality is preserved but placed more deliberately. The language switcher, Impressum, and privacy pages are brought into visual alignment with the home page.

---

## Visual Language

| Token | Value |
|---|---|
| Background | `#ffffff` |
| Primary text | `#111111` |
| Secondary text | `#aaaaaa` |
| Muted text (footer) | `#cccccc` |
| Card border (default) | `#e8e8e8` |
| Card border (hover) | `#111111` |
| Card hover shadow | `box-shadow: 2px 2px 0 #111` |
| Body font | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| Display font | `'Permanent Marker', cursive` — card titles and page titles only |
| Max content width | `600px`, centred, `padding: 40px` (desktop), `padding: 20px` (mobile) |

---

## Component Architecture

### New: `Header.astro`

Replaces the current `Nav.astro`. Combines identity (profile photo + name + tagline) with the language switcher in a single horizontal bar.

**Props:** `lang: string`

**Layout:**
```
[profile photo 52px circular] [name bold 20px]     [EN chip]
                               [tagline 11px caps]
```

- Profile photo: `src/assets/img/larskleiner.png` via `<Image>`, 52×52, circular (`border-radius: 50%`)
- Name: `font-size: 20px; font-weight: 700; letter-spacing: -0.4px` — system-ui
- Tagline: `t.tagline`, `font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #aaa`
- Language switcher chip: `border: 1.5px solid #111; border-radius: 2px; font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 5px 14px` — fills `#111` background with white text on hover
- Full-width bottom border: `border-bottom: 1px solid #f0f0f0; margin-bottom: 36px; padding-bottom: 28px`

**Delete** `Nav.astro` after migrating all page references.

### Updated: `Footer.astro`

Minimal centered bar with muted links. No changes to structure, only CSS.

- `font-size: 11px; color: #cccccc`
- Links: `color: #cccccc`, hover `color: #111`, `text-decoration: none`
- `display: flex; justify-content: center; gap: 24px`
- `border-top: 1px solid #f0f0f0; padding-top: 20px`

### Updated: `BaseLayout.astro`

Add a `max-width: 600px; margin: 0 auto; padding: 40px` wrapper around `<slot />` inside `<main>`. On mobile (`< 640px`): `padding: 20px`.

---

## Pages

### Home (`de/index.astro`, `en/index.astro`)

**Remove:** The intro row (profile photo + `t.hello` paragraph). This row no longer exists.

**Add:** `<Header lang={lang} />` at the top (replaces `<Nav lang={lang} />`).

**Cards grid:**

```html
<div class="cards-grid">
  <a href="…" class="card">
    <Image src={linkedin} … class="card-icon" />
    <div class="card-body">
      <span class="card-title">LinkedIn</span>
      <span class="card-sub">{t.linkedinSub}</span>
    </div>
  </a>
  …
</div>
```

- Grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 10px`
- Card: `display: flex; align-items: center; gap: 12px; padding: 14px 16px; border: 1px solid #e8e8e8; border-radius: 3px`
- Card hover: `border-color: #111; box-shadow: 2px 2px 0 #111`
- Icon: existing PNG (`linkedin.png` etc.), rendered at 32×32px, wrapped in a `<div class="card-icon-wrap">` with a brand-tinted background (`border-radius: 6px; width: 40px; height: 40px`, centred)
- Card title: `font-family: 'Permanent Marker'; font-size: 14px; color: #111`
- Card subtitle: `font-size: 11px; color: #aaa`

**Brand tint colours for icon wrappers:**

| Platform | Background |
|---|---|
| LinkedIn | `#e8f0fb` |
| Drupal | `#edf3fb` |
| GitHub | `#f0f0f0` |
| Strava | `#fdeee8` |
| Instagram | `#fce8f0` |

### About (`de/about.astro`, `en/about.astro`)

Replace `<Nav lang={lang} />` with `<Header lang={lang} />`.

Add a back link immediately after the header:
```html
<a href={homeUrl} class="back-link">{t.backLink}</a>
```

Page title in Permanent Marker:
```html
<h1 class="page-title">{t.about}</h1>
```

Contact info in a soft card:
```html
<div class="contact-card">
  <p class="contact-label">Angaben gemäß § 5 Telemediengesetz</p>
  Lars Kleiner<br />
  Bahrenfelder Steindamm 109c<br />
  22761 Hamburg<br />
  Telefon: 01737798303<br />
  E-Mail: hello@larskleiner.de<br />
  Umsatzsteuer ID: DE280194949
</div>
```

- `.contact-card`: `padding: 20px 24px; background: #fafafa; border: 1px solid #f0f0f0; border-radius: 3px; font-size: 14px; line-height: 2; color: #444`
- `.contact-label`: `font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #aaa; display: block; margin-bottom: 10px`

Remove the existing `<div class="container-fluid"><div class="row">` wrapper — no longer needed.

### Privacy (`de/privacy.astro`, `en/privacy.astro`)

Same header and back link pattern as About.

Page title:
```html
<h1 class="page-title">{t.privacy}</h1>
```

Prose wrapper:
```html
<div class="prose">
  …existing legal paragraphs…
</div>
```

- `.prose p`: `font-size: 14px; color: #555; line-height: 1.8; margin-bottom: 16px`
- `.prose h3`: `font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #111; margin-top: 28px; margin-bottom: 8px`
- `.prose h4`: `font-size: 11px; font-weight: 600; color: #333; margin-top: 16px; margin-bottom: 4px`
- `.prose ul`: `padding-left: 20px; margin-bottom: 14px`
- `.prose li`: `font-size: 14px; color: #555; line-height: 1.8`
- Max readable width: `max-width: 560px` on `.prose`

---

## Translations (`src/i18n/translations.ts`)

**Add keys:**

| Key | DE | EN |
|---|---|---|
| `tagline` | `'Web Developer · Drupal · Cyclist'` | `'Web Developer · Drupal · Cyclist'` |
| `backLink` | `'← Zurück'` | `'← Back'` |
| `linkedinSub` | `'Aktuelles Profil'` | `'Current profile'` |
| `drupalSub` | `'drupal.org Dashboard'` | `'drupal.org Dashboard'` |
| `githubSub` | `'Open source'` | `'Open source'` |
| `stravaSub` | `'Aktivitäten'` | `'Activities'` |
| `instagramSub` | `'Lieblingsfotos'` | `'Favourite photos'` |

**Remove keys:** `hello`, `linkedin`, `drupal`, `github`, `strava`, `instagram` — the long description paragraphs are no longer shown anywhere on the home page. The `description` key retains its value (used only for `<meta name="description">`). The `about` and `privacy` keys are kept (used in titles and footer links).

---

## CSS (`src/styles/main.css`)

Replace the entire custom rules section (everything after the `@font-face` block) with a clean rewrite. The utility classes (grid, flex, spacing, button) added in the previous optimisation pass are also removed — they are no longer needed since the new design uses semantic, scoped CSS instead of utility classes.

Bootstrap is **not** reinstated. CSS Grid handles the two-column card layout natively.

**Key new rules to add:**

```css
/* Layout wrapper */
.page-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
}

@media (max-width: 640px) {
  .page-content { padding: 20px; }
}

/* Header */
.site-header { … }
.header-identity { … }
.site-name { … }
.site-tagline { … }
.lang-switch { … }

/* Cards */
.cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.card { … }
.card:hover { … }
.card-icon-wrap { … }
.card-title { font-family: 'Permanent Marker', cursive; … }
.card-sub { … }

/* Inner pages */
.back-link { … }
.page-title { font-family: 'Permanent Marker', cursive; … }
.contact-card { … }
.contact-label { … }
.prose p, .prose h3, .prose h4, .prose ul, .prose li { … }

/* Footer */
footer { … }

/* Skip link (retain from previous pass) */
.skip-link { … }
.skip-link:focus { … }
```

---

## File Change Summary

| File | Change |
|---|---|
| `src/styles/main.css` | Full rewrite of custom rules |
| `src/layouts/BaseLayout.astro` | Add `.page-content` wrapper around `<main>` slot |
| `src/components/Header.astro` | **New** — identity + language switcher |
| `src/components/Nav.astro` | **Delete** |
| `src/components/Footer.astro` | CSS-only update (no markup change) |
| `src/i18n/translations.ts` | Add 7 keys, remove `hello` + `linkedin` + `instagram` |
| `src/pages/de/index.astro` | Replace Nav with Header, remove intro row, add cards grid |
| `src/pages/en/index.astro` | Same as above |
| `src/pages/de/about.astro` | Replace Nav with Header, add back link, PM title, contact card |
| `src/pages/en/about.astro` | Same as above |
| `src/pages/de/privacy.astro` | Replace Nav with Header, add back link, PM title, prose wrapper |
| `src/pages/en/privacy.astro` | Same as above |
