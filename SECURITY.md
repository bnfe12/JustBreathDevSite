# Runtime Guide

This repository is meant to run as a real service. Keep the critical controls on the server, not in browser-visible code.

## Baseline checklist

- keep session issuance, billing decisions, archive validation, and moderation actions server-side
- use `HttpOnly` cookies, TLS, CSP, and reverse-proxy limits
- keep uploaded creator sites on a host distinct from `APP_URL`
- keep archive size limits aligned between Node and nginx
- keep rate limits on auth, messaging, and archive upload routes
- keep `.env*`, runtime `data/`, `backups/`, uploads, extracted sites, telemetry, and logs out of Git

## Creator-site handling

- archive uploads must include `index.html`
- archive packages are staged in quarantine before publish
- executable and server-side files are rejected before storage
- public or unlisted launch remains visible only to the site author until approval
- production deploys must set `UPLOADED_SITES_ORIGIN` to a host distinct from `APP_URL`

## Production requirements

1. Put nginx or another reverse proxy in front of Node.
2. Terminate TLS at the proxy.
3. Set secure cookies in real HTTPS deployment.
4. Keep `client_max_body_size` aligned with server archive limits.
5. Run the app as a dedicated non-root user.
6. Back up `data/` and `backups/` off-host.
7. Monitor `/api/health`, logs, and store growth.
