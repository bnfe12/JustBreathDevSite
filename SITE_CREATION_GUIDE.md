# Site Creation Guide

This project now supports three creator-site modes:

1. `Template site`
2. `Single HTML`
3. `Archive package`

It also includes a dedicated `Site Studio` page for editing internal text files
of uploaded static sites (`index.html`, `.css`, `.js`, `.svg`, `.json`, etc.)
and for adjusting visual polish inside the platform.

Use this guide when you add or update site content in `JustBreathDevSite` or any other source repository.

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

- no site-local authentication
- no custom user database
- no embedded comment backend
- no server code inside the uploaded package

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

Avoid:

- archives without `index.html`
- server code, PHP, Node, Python, CGI
- remote trackers or unsafe third-party scripts
- archives larger than `5 MB`

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

1. `Edit` modal for metadata and broad design settings
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

## 6. Rules for AI-generated sites

When you ask AI to generate a site for this platform, tell it explicitly:

- the output must be a static site
- no authentication or user accounts inside the site
- no comment widget that requires its own backend
- all local assets must be included together
- the entry file must be `index.html`

Recommended AI prompt constraints:

- "Generate a static site only"
- "Do not add login, signup, dashboard auth, or database code"
- "Comments live on the main justbreath project/profile page, not inside the site"
- "Use relative local assets and provide the final result as an archive with index.html"
- "Prefer SVG icons and editable text/CSS/JS files"

If AI gives you:

- React SSR
- Next.js routes
- PHP forms
- Firebase auth
- Supabase auth
- server endpoints

then the result is not ready for this uploader. Export the final static build first.

## 7. Why previous uploads broke

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

## 8. 7z support

`.7z` requires a server-side extractor.

Two supported ways:

1. install the `7zip-bin` package in the project
2. set `SEVENZIP_BINARY=/absolute/path/to/7z-or-7za`

Without one of those, `.7z` uploads are rejected with an explicit error.

## 9. API endpoints

- `POST /api/me/sites/template`
- `POST /api/me/sites/upload`
- `POST /api/me/sites/upload-archive`
- `PATCH /api/me/sites/:id`
- `GET /api/me/sites/:id`
- `GET /api/me/sites/:id/studio`
- `GET /api/me/sites/:id/studio/file?path=index.html`
- `POST /api/me/sites/:id/studio/file`
- `PATCH /api/me/sites/:id/studio/file`

Archive uploads send:

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

## 10. Channel behavior

Chat rooms can now behave like Telegram channels:

- owners/admins/moderators can publish
- members keep read-only access
- subscription-gated rooms still enforce plan access before join/post

That means the composer no longer silently disappears in channel mode; the UI shows a read-only channel state instead.
