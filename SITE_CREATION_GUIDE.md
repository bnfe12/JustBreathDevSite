# Site Creation Guide

This project now supports three creator-site modes:

1. `Template site`
2. `Single HTML`
3. `Archive package`

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

## 2. Recommended structure for archive sites

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

## 3. How to move a site from `JustBreathDevSite`

1. Build or export the final static site from the repository.
2. Make sure the output folder contains `index.html`.
3. Keep all required local assets next to it: `css/`, `js/`, `img/`, extra pages.
4. Pack the output as an archive if the site uses more than one file.
5. Upload it through the platform as `Archive package`.

If the repository only produces a single finished `index.html` with inline CSS/JS, you can upload that as `Single HTML`.

## 4. Editing existing uploaded sites

The `Edit` modal now exposes:

- upload mode (`single html` vs `archive`)
- package file list
- broken local references detected inside HTML
- archive replacement input

Important behavior:

- editing the HTML textarea changes only the entry HTML file
- updating CSS/JS/images/extra pages should be done by re-uploading the archive
- when local references are missing, the UI shows them explicitly so you can repack the source site correctly

## 5. Why previous uploads broke

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

## 6. 7z support

`.7z` requires a server-side extractor.

Two supported ways:

1. install the `7zip-bin` package in the project
2. set `SEVENZIP_BINARY=/absolute/path/to/7z-or-7za`

Without one of those, `.7z` uploads are rejected with an explicit error.

## 7. API endpoints

- `POST /api/me/sites/template`
- `POST /api/me/sites/upload`
- `POST /api/me/sites/upload-archive`
- `PATCH /api/me/sites/:id`
- `GET /api/me/sites/:id`

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

## 8. Channel behavior

Chat rooms can now behave like Telegram channels:

- owners/admins/moderators can publish
- members keep read-only access
- subscription-gated rooms still enforce plan access before join/post

That means the composer no longer silently disappears in channel mode; the UI shows a read-only channel state instead.
