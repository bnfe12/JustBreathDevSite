# Site Creation Guide

This project now supports three creator-site modes:

1. `Template site`
2. `Single HTML`
3. `Archive package`

It also includes a dedicated `Site Studio` page for editing internal text files
of uploaded static sites (`index.html`, `.css`, `.js`, `.svg`, `.json`, etc.)
and for adjusting visual polish inside the platform.

Use this guide when you add or update site content in `JustBreathDevSite` or any other source repository.

Main repository: <https://github.com/bnfe12/JustBreathDevSite>  
Primary contact: `justbreath.business.mail@gmail.com`  
GitHub profile: <https://github.com/bnfe12>

For repo-wide SEO, metadata, indexing, canonical, structured-data, and performance rules, also read [SEO_DEVELOPMENT_GUIDE.md](SEO_DEVELOPMENT_GUIDE.md).

For Russian-language anti-patterns and step-by-step examples, also read [SITE_CREATION_EXAMPLES_RU.md](SITE_CREATION_EXAMPLES_RU.md).

## Important

- archive uploads now use a direct binary route in the main UI instead of base64-in-JSON
- the server streams binary archive uploads into a temp file before extraction, so large files do not get base64-expanded first
- regular archive uploads are capped at `5 MB`
- internal operators can upload larger archives up to `512 MB`
- if the app runs behind nginx or another reverse proxy, its body limit must be at least `512 MB` too, or the request will fail before Node sees it
- the archive must still contain `index.html`
- if more than one `index.html` exists, the root one wins
- imported archive sites are now served as full static bundles without platform wrapping over the original design
- archive packages are staged in quarantine before publish
- executable and server-side files are blocked before storage
- public or unlisted launch remains visible only to the site author until approval
- local images may be compressed automatically for storage when the server can keep the same path with a smaller file
- after changing the server code, restart the server so the new upload path is actually used

## 1. Choose the right mode

### Template site

Use it when you need:

- a launch page
- a portfolio
- a pitch / investor page
- an event page
- documentation without a custom frontend bundle

Template sites are edited directly inside the platform. They are the safest option when you do not need your own CSS/JS pipeline.

Important:

- template mode is still static
- do not build login/signup/comment auth into the site itself
- reader discussion should happen on the main justbreath site under the creator profile or linked project

### Single HTML

Use it only when the full site is one `.html` file and does not depend on local files such as:

- `css/style.css`
- `js/app.js`
- `img/logo.png`
- extra pages like `about.html`

If the HTML references local files, this mode will break on deploy.

### Archive package

Use it when the site has:

- multiple pages
- local `css/`, `js/`, `img/`, `fonts/` folders
- build output from another repository
- a presentation microsite with several routes

The archive must contain an `index.html` entry file. The server extracts the package and serves nested assets from `/<handle>/<slug>/<path>`.

The imported site is then served as a raw static bundle:

- original HTML / CSS / JS structure is preserved as closely as possible
- local download links and bundled assets stay inside the imported site path
- archive files are staged in quarantine before the final bundle is published
- executable and server-side files are rejected before storage
- suspicious patterns can still surface as review warnings for manual approval

Supported immediately:

- `.zip`
- `.tar`
- `.tar.gz`
- `.tgz`

Supported when a 7z extractor is installed on the server:

- `.7z`

## 2. Static-only rule

Creator sites on justbreath are treated as static sites.

That means:

- uploaded packages are hosted on a separate site origin from the main app
- no site-local authentication
- no custom user database
- no embedded comment backend
- no executed server code inside the uploaded package

If you upload code that was originally backed by a server:

- the files are still imported
- the design and static frontend stay visible
- direct backend conflicts are reported in the UI
- API handlers, sockets, form processors, and other server-state features stay disabled on the hosted static copy

If you need discussion or feedback:

- attach the site to a project
- use comments and discussion on the main justbreath profile/project page
- link CTAs back to the creator profile, project page, or other external contact channel

## 3. Recommended structure for archive sites

Good:

```text
my-site/
  index.html
  css/
    style.css
  js/
    main.js
  img/
    hero.png
  pages/
    world.html
```

Also acceptable if the archive contains one top-level folder. The server strips that folder automatically as long as `index.html` is inside it.

If the archive contains more than one `index.html`:

- the root `index.html` is used as the main entry when it exists
- otherwise the shallowest `index.html` is used and its parent folder becomes the served root

That means a full repository archive can stay intact as long as the repository root already contains the `index.html` you want to open first.

Avoid:

- archives without `index.html`
- server code, PHP, Node, Python, CGI
- remote trackers or unsafe third-party scripts
- archives larger than `5 MB` for regular users

For internal operators:

- large archive imports can use the binary upload route with higher server limits
- the browser now shows explicit upload progress first and then a processing state while the server unpacks and validates the archive
- uploaded archive sites open through a launch warning screen before the isolated site surface is shown
- the launch screen includes creator info plus a device-local "remember and open directly next time" checkbox

## 4. How to move a site from `JustBreathDevSite`

1. Build or export the final static site from the repository.
2. Make sure the output folder contains `index.html`.
3. Keep all required local assets next to it: `css/`, `js/`, `img/`, extra pages.
4. Pack the output as an archive if the site uses more than one file.
5. Upload it through the platform as `Archive package`.

If the repository only produces a single finished `index.html` with inline CSS/JS, you can upload that as `Single HTML`.

## 5. Editing existing uploaded sites

Use `Site Studio` when you need to:

- edit `index.html` directly
- add `assets/site.css`, `scripts/app.js`, `assets/icon.svg`
- change favicon/logo/accent/background/colors
- keep the site static while still iterating fast inside the platform

The platform now exposes two editing surfaces:

1. `Edit` modal for metadata, archive replacement, and import diagnostics
2. `Site Studio` for internal files and code editing

Studio behavior:

- text files only: `html`, `css`, `js`, `json`, `svg`, `md`, `xml`, `txt`
- if a site started as one HTML file, creating the first extra file automatically upgrades it to bundle mode
- binary assets such as PNG/JPG should still be uploaded as part of an archive package
- comments/auth are intentionally not provided inside studio because the target is a static site

The `Edit` modal still exposes:

- upload mode (`single html` vs `archive`)
- package file list
- broken local references detected inside HTML
- archive replacement input

Important behavior:

- editing the HTML textarea changes only the entry HTML file
- updating CSS/JS/SVG/text files can now be done inside `Site Studio`
- updating binary images/fonts or replacing a full exported build should still be done by re-uploading the archive
- when local references are missing, the UI shows them explicitly so you can repack the source site correctly
- imported archive sites are served as raw static bundles, so layout/design changes should happen in the real site files rather than through a platform wrapper
- image assets can be compressed automatically during import when a smaller stored file is available

## 6. SEO defaults for creator sites

Public creator sites should ship with search basics already in place.

Minimum checklist:

- one clear canonical URL
- a descriptive `<title>`
- a visible page heading that matches the topic
- a useful meta description
- a favicon
- real crawlable `<a href>` links for navigation
- meaningful `alt` text for informative images
- visible HTML content for the main value of the page

Strong recommendations for public sites:

- add contact details where trust matters
- add privacy / terms links where relevant
- set an Open Graph image and title for sharing
- use descriptive image filenames instead of generic placeholders
- include accurate `Organization` or `Person` JSON-LD only when the data is visible on the page

Avoid:

- fragment routing for public navigation
- CSS-background-only critical images without HTML fallback
- duplicate city / service / keyword pages with almost identical content
- placeholder metadata like `Home`, `Untitled`, `Welcome`
- generic AI filler text that exists only to target search traffic

If the site is `private` or `unlisted`, treat indexing conservatively and do not assume it should be in sitemap or public search surfaces.

## 7. Rules for AI-generated sites

When you ask AI to generate a site for this platform, tell it explicitly:

- the output must be a static site
- no authentication or user accounts inside the site
- no comment widget that requires its own backend
- all local assets must be included together
- the entry file must be `index.html`
- use real crawlable `<a href>` links for public navigation
- generate a descriptive title, meta description, main heading, and image alt text

Recommended AI prompt constraints:

- "Generate a static site only"
- "Do not add login, signup, dashboard auth, or database code"
- "Comments live on the main justbreath project/profile page, not inside the site"
- "Use relative local assets and provide the final result as an archive with index.html"
- "Prefer SVG icons and editable text/CSS/JS files"
- "Avoid generic SEO filler and write specific user-helpful copy"

If AI gives you:

- React SSR
- Next.js routes
- PHP forms
- Firebase auth
- Supabase auth
- server endpoints

then the result is not ready for this uploader. Export the final static build first.

## 8. Why previous uploads broke

If a site contained references like:

- `css/style.css`
- `js/main.static.js`
- `world.html`

but was uploaded as a single HTML file, the browser requested files that were never stored. That causes:

- missing styling
- missing scripts
- MIME errors in console
- broken navigation between pages

The fix is to upload the whole site as an archive package.

## 9. 7z support

`.7z` requires a server-side extractor.

Two supported ways:

1. install the `7zip-bin` package in the project
2. set `SEVENZIP_BINARY=/absolute/path/to/7z-or-7za`

Without one of those, `.7z` uploads are rejected with an explicit error.

## 10. API endpoints

- `POST /api/me/sites/template`
- `POST /api/me/sites/upload`
- `POST /api/me/sites/upload-archive`
- `POST /api/me/sites/upload-tar`
- `POST /api/me/sites/upload-tgz`
- `POST /api/me/sites/upload-7z`
- `POST /api/me/sites/upload-bundle`
- `POST /api/me/sites/upload-archive-binary`
- `POST /api/me/sites/upload-bundle-binary`
- `POST /api/me/sites/import-inspect`
- `GET /api/me/sites/import-capabilities`
- `GET /api/developers/capabilities`
- `PATCH /api/me/sites/:id`
- `PUT /api/me/sites/:id/archive-binary`
- `GET /api/me/sites/:id`
- `GET /api/me/sites/:id/studio`
- `GET /api/me/sites/:id/studio/file?path=index.html`
- `POST /api/me/sites/:id/studio/file`
- `PATCH /api/me/sites/:id/studio/file`

Preferred archive uploads now use the binary endpoints:

- `POST /api/me/sites/upload-archive-binary`
- `POST /api/me/sites/upload-bundle-binary`
- `PUT /api/me/sites/:id/archive-binary`

The browser sends the archive as raw binary with small metadata in the `X-JB-Site-Meta` header. The server streams it into a temp file first, which avoids base64 overhead and keeps large uploads away from the old JSON parser bottleneck.

Archive imports support:

- `.zip`
- `.tar`
- `.tgz`
- `.tar.gz`
- `.7z` when `7zip-bin` or `SEVENZIP_BINARY` is available

Use `POST /api/me/sites/import-inspect` before creating a site when you want:

- compatibility warnings before write/import
- optimized asset summary
- a quick file-count / entry-file diagnostic pass

Current archive limits:

- regular users: `5 MB`
- internal operators: `512 MB`

The older JSON endpoint still accepts:

```json
{
  "title": "Site title",
  "slug": "site-slug",
  "summary": "Short summary",
  "visibility": "public",
  "archiveBase64": "<base64>",
  "archiveName": "site.tar.gz"
}
```

Keep that JSON route only for compatibility or smaller automation clients. Large archive uploads should use the binary endpoints above.

## 11. Channel behavior

Chat rooms can now behave like Telegram channels:

- elevated room roles can publish
- members keep read-only access
- subscription-gated rooms still enforce plan access before join/post

That means the composer no longer silently disappears in channel mode; the UI shows a read-only channel state instead.
