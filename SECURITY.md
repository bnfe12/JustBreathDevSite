# Security Guide

This repository is intended to be deployed as a real service, not treated like a throwaway demo. The main rule is simple:

- Do not depend on obfuscation as a primary defense.

Client code is delivered to users by design. If logic is security-sensitive, it belongs on the server, behind authentication, authorization, rate limits, and auditability.

## Threat model baseline

Assume attackers can:

- read all client-side JavaScript, HTML, and CSS
- inspect network traffic in the browser devtools
- replay requests against public API routes
- upload malformed archives and oversized files
- abuse login, registration, and messaging endpoints
- attempt cross-site request forgery against cookie-authenticated users

Do not assume attackers can:

- read server environment variables
- access filesystem paths outside allowed runtime data
- bypass server-side permission checks if those checks are implemented correctly

## What must stay server-side

Never move these concerns into public client code:

- session issuance and validation
- admin and operator authorization checks
- billing and entitlement decisions
- archive extraction validation
- security event logging
- bot token hashing and storage
- email verification and password-reset flows

If a client needs to know whether an action is allowed, the client should ask the server and render the result. The client must not be the source of truth.

## Current hardening checklist

Application:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restricting camera/microphone/geolocation
- `Content-Security-Policy` for the SPA shell
- `Strict-Transport-Security` on HTTPS requests
- `Cross-Origin-Opener-Policy: same-origin-allow-popups`
- `Cross-Origin-Resource-Policy: same-site`
- cross-site write-request blocking for state-changing `/api/` routes

Authentication:

- HttpOnly session cookies
- bcrypt password hashing
- OAuth state cookies for Google / Discord
- guest sessions kept read-only on write routes

Abuse resistance:

- rate limits on registration and login
- rate limits on message sending
- rate limits on heavy archive import/upload paths
- early archive size checks before extraction

Content handling:

- uploaded media stored as files, not base64 in the main store
- creator-site archive inspection before publish
- uploaded creator sites served through isolated handling paths

## Deployment requirements

For production, treat the following as mandatory:

1. Put nginx or another reverse proxy in front of Node.
2. Terminate TLS at the proxy.
3. Set secure cookies in real HTTPS deployment.
4. Keep `client_max_body_size` aligned with server archive limits.
5. Run the app as a dedicated non-root user.
6. Back up `data/` and `backups/` off-host.
7. Monitor `/api/health`, logs, and store growth.

## What not to do

These are common but low-value moves:

- shipping secrets in minified frontend bundles
- "encrypting" business logic that must execute in the browser
- hiding route names instead of enforcing permissions server-side
- trusting disabled buttons or hidden UI as access control
- relying on client-side file validation alone

If code can materially damage the platform when exposed, it should be moved behind the server boundary rather than cosmetically hidden.

## Review rule for future changes

When a new feature is added, review these questions before deploy:

1. Can this action be triggered cross-site with a victim's cookie?
2. Is the permission check enforced on the server?
3. Can this endpoint be spammed or amplified?
4. Does it accept user-controlled file paths, HTML, URLs, or archives?
5. Does it leak any internal token, path, identifier, or stack detail to the client?
6. Does it introduce a render loop or polling path that can degrade UX or availability?

If any answer is "yes", the change needs a hardening pass before release.
