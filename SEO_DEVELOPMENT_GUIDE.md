# SEO Development Guide

Last aligned on: 2026-04-19

This document is the default SEO contract for future development on `justbreath.life`.
Use it when changing routing, metadata, public pages, creator sites, templates,
rendering, uploads, images, localization, structured data, or AI-assisted content.

The goal is not "SEO hacks". The goal is to keep the platform aligned with
official search guidance so public pages are crawlable, indexable, fast, and
trustworthy.

## 1. Official sources this guide follows

Primary sources:

- Google Search Essentials:
  https://developers.google.com/search/docs/essentials
- Google: creating helpful, reliable, people-first content:
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google: title links best practices:
  https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets
- Google: snippet and meta description guidance:
  https://developers.google.com/search/docs/appearance/snippet
- Google: crawlable links:
  https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Google: JavaScript SEO basics:
  https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google: canonical URLs:
  https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google: sitemap guidance:
  https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google: robots meta / noindex / snippet controls:
  https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Google: structured data intro:
  https://developers.google.com/search/docs/guides/intro-structured-data
- Google: image SEO:
  https://developers.google.com/search/docs/appearance/google-images
- Google: favicon in search:
  https://developers.google.com/search/docs/appearance/favicon-in-search
- Google / Chrome team: Core Web Vitals:
  https://web.dev/articles/vitals
- Bing Webmaster / IndexNow getting started:
  https://www.bing.com/indexnow/getstarted
- IndexNow protocol:
  https://www.indexnow.org/documentation
- Schema.org `Organization`:
  https://schema.org/Organization

Important interpretation rule:

- For Google behavior, Google Search Central is the source of truth.
- For general web implementation, follow official platform docs such as `web.dev`
  and `schema.org`.
- If a future recommendation conflicts with this file, update this file to match
  the official source.

## 2. Non-negotiable engineering rules

These are mandatory for all public pages and public creator sites unless a
specific route is intentionally excluded from indexing.

### Routing and discovery

- Public navigation must render real `<a href="...">` links.
- Do not rely on click handlers, buttons, or fragment-only URLs for important
  navigation.
- Client-side routing must use the History API, not `#/hash` routing.
- Server responses must use meaningful HTTP status codes:
  - `200` for real pages
  - `301/302/308` for intentional redirects
  - `404` for missing pages
  - `401/403` for auth-gated resources
- Avoid soft 404s on SPA states.

### Indexability and canonicalization

- Every indexable page must have one preferred canonical URL.
- Internal links should point to the canonical URL, not to duplicate variants.
- Do not use `robots.txt` as a canonicalization tool.
- Do not use `noindex` as the normal duplicate-resolution strategy when
  `rel="canonical"` is the correct solution.
- Private, guest-only, account-only, admin, preview, and transient utility pages
  should generally be `noindex` and excluded from sitemaps.

### Metadata

- Every public page needs a unique and descriptive `<title>`.
- Every public page needs a visible primary heading aligned with the page topic.
- Every public page needs a useful meta description, but the on-page content must
  still make sense without it because Google may generate snippets from page
  content instead.
- Keep `title`, visible heading, canonical URL, and OG metadata consistent.
- Home-page and creator-site favicons must be explicitly set.

### Content quality

- Content must be people-first, not search-first.
- Do not mass-produce thin pages just to target keywords.
- Do not create near-duplicate public pages without a clear user need.
- Important claims should be attributable to a visible person, organization, or
  product context when that is relevant.
- For AI-assisted content, the "why" must still be to help users, not to fill
  the index.

### Structured data

- Structured data must describe visible, user-facing content on the same page.
- Do not emit empty, guessed, or misleading schema fields.
- Prefer accurate, smaller JSON-LD over broad but partially false schema.
- When a schema type is implemented, include required fields first, then add
  recommended fields only if they are accurate.

### Images and media

- Important images should be embedded with `<img src>` or `<picture>`, not only
  as CSS backgrounds.
- Images need meaningful `alt` text when the image conveys information.
- Decorative images should not receive misleading keyword-heavy alt text.
- Use responsive images where appropriate and keep a fallback `src`.

### Performance

- Public pages should target Core Web Vitals "good" thresholds at the 75th
  percentile:
  - `LCP <= 2.5s`
  - `INP <= 200ms`
  - `CLS <= 0.1`
- Avoid shipping large blocking JS/CSS when the page can be server-described
  earlier.
- Keep hero text, headings, and critical metadata available without waiting for
  user interaction.

## 3. Repo-specific implementation rules

The current app is a vanilla JS SPA plus Express server shell. SEO quality
depends on both client and server.

### Files that affect SEO directly

- `public/index.html`
  - base shell metadata
  - favicon and default robots behavior
- `public/app.js`
  - route parsing
  - public navigation rendering
  - public page content
  - creator-site UI
- `server/index.js`
  - SPA shell responses
  - per-route metadata
  - sitemap generation
  - status codes and canonical behavior
  - creator-site delivery

### When adding a new public route

You must update all of the following, not just the visible page body:

1. route parsing in the client
2. server handling / shell fallback
3. default title and description behavior
4. canonical assumptions
5. sitemap inclusion or exclusion
6. internal crawlable links to the new route
7. `noindex` behavior if the route should not rank

### SPA-specific rules for this project

- Do not replace real links with buttons for public navigation.
- Do not render important public copy only after non-essential JS branches.
- If a page depends on JS for metadata updates, make sure the original HTML shell
  still has sane defaults and the final route state is stable.
- If a route can represent a missing resource, make the server or route handling
  return a true 404 state or a `noindex` fallback, not a fake success page.

## 4. Public page checklist

Before shipping a public page, verify:

- unique title
- visible H1
- useful meta description
- canonical URL
- favicon
- crawlable internal links
- no accidental `noindex`
- no accidental duplicate URL pattern
- page is reachable without auth if it is meant to rank
- page copy is helpful without relying on hidden UI
- main media has alt text or is intentionally decorative
- social metadata is coherent with page purpose

## 5. Creator site checklist

Public creator sites are part of search surface and must meet the same baseline.

Required defaults for every public creator site:

- one clear canonical URL: `/<handle>/<slug>` form as served by the platform
- descriptive page title
- visible page heading
- meta description
- favicon via `<link rel="icon">`
- crawlable internal links with real `href`
- indexable HTML content for the main topic
- meaningful `alt` text on informative images
- contact method for commercial or trust-sensitive pages
- legal links where relevant (`privacy`, `terms`, disclosures)

Strong recommendations for creator sites:

- `Organization` or `Person` JSON-LD only when data is visible and accurate
- Open Graph image and title for sharing
- descriptive image filenames instead of generic `image1.jpg`
- no hidden keyword blocks
- no auto-generated doorway pages
- no cloned city/service pages without unique value

Archive-specific guidance:

- ship the entire static build when the site uses local CSS, JS, images, fonts,
  or extra HTML pages
- keep `index.html` as the entry file
- avoid shipping broken relative paths
- prefer one canonical asset URL per image file so crawlers can cache assets

Single-HTML-specific guidance:

- use only when the whole site truly fits in one HTML file
- if the page references local assets, switch to archive mode

## 6. AI-assisted content and AI-generated sites

AI may assist development, but it does not relax quality requirements.

Rules:

- AI output must be reviewed before publication.
- AI must not invent legal, medical, financial, pricing, or trust claims.
- AI must not generate fake testimonials, fake reviews, fake organization facts,
  or fake authorship.
- AI must not be used to mass-produce thin SEO landing pages.
- If users would reasonably ask "who made this" or "how was this produced",
  provide that context or disclosure.

Prompt constraints for site generation:

- "Generate a static site only."
- "Do not add login, signup, database, or server endpoints."
- "Use real `<a href>` links for navigation."
- "Return one upload-ready output with `index.html` and all local assets."
- "Keep text specific and user-helpful; avoid SEO filler."
- "Add meaningful headings, title, description, and image alt text."

Reject or rework AI output if it introduces:

- fragment routing for public navigation
- fake blog farms or keyword pages
- generic placeholder metadata
- multiple copies of near-identical pages
- unsupported auth/backend dependencies
- CSS-background-only critical images with no HTML fallback

## 7. Internationalization and localization

If the platform or creator sites ship localized public pages:

- translated pages must have genuinely localized main content
- use one consistent canonical per locale page
- use `hreflang` only when alternate localized versions are complete and mutually
  referenced
- do not create low-quality machine-translated pages without review
- avoid mixing language targeting and canonicalization incorrectly

If localized alternates are not fully maintained yet, it is safer to ship one
strong language version than many weak variants.

## 8. Robots, sitemap, and indexing controls

Use these controls intentionally:

- `robots.txt`
  - for crawl management and sitemap discovery
  - not for canonicalization
- `meta robots`
  - for page-level indexing/serving directives
- `X-Robots-Tag`
  - for non-HTML resources when needed
- sitemap
  - only canonical, indexable URLs you actually want in search

Default policy for this project:

- include public canonical pages in sitemap
- exclude private, unlisted, admin, auth-only, and utility routes
- if a page is `noindex`, it should generally not be in sitemap

## 9. Performance and rendering baseline

SEO in this project includes delivery quality, not only metadata.

Baseline:

- render the primary meaning of public pages without forcing users through
  modals, drawers, or delayed tabs
- keep route-level content stable after load
- avoid layout shifts in hero, titles, and navigation
- keep public pages usable on mobile first
- lazy-load heavy media, but do not lazy-hide essential content
- keep critical branding and page purpose visible above the fold when practical

When public rendering changes, validate:

- PageSpeed Insights
- Lighthouse
- field metrics if available
- visual stability on mobile

## 10. Release checklist for SEO-affecting changes

Run this checklist whenever a PR touches public routes, public metadata, creator
sites, sitemap logic, routing, structured data, or rendering.

### Code review

- real `<a href>` links preserved for public navigation
- no new duplicate public route patterns
- no private pages accidentally made crawlable
- no canonical conflicts
- no incorrect robots tags
- no incorrect schema fields

### Manual QA

- inspect final HTML and route output
- verify title, description, canonical, favicon
- verify open graph tags where relevant
- test at least one missing-resource path for true 404 or `noindex` fallback
- verify sitemap output if URLs changed
- verify public images are discoverable through HTML

### Search tooling

- Google Search Console inspection for major pages
- Rich Results Test for pages with schema
- PageSpeed Insights for performance-critical pages
- IndexNow / Bing submission flow for major content updates if supported

## 11. Change policy

If Google, Bing, IndexNow, schema.org, or Chrome/web.dev updates their official
guidance in a way that affects this project, update this file and the related
implementation notes before or with the code change.

Do not treat this file as optional reading. For public-surface work, this file
is part of the definition of done.
