# GitHub + Auto-Deploy Setup

## 1. Create GitHub repo

```bash
git init
git remote add origin git@github.com:yourname/justbreath.git
git branch -M main
git push -u origin main
```

## 2. Set GitHub Secrets

In your repo → Settings → Secrets → Actions, add:

| Secret | Value |
|---|---|
| `DEPLOY_SSH_KEY` | Private SSH key that can access your server |
| `DEPLOY_HOST` | Your server IP or domain |
| `DEPLOY_USER` | SSH username (e.g. `ubuntu`) |
| `ADMIN_TOKEN` | Random secret for maintenance API |

## 3. Server SSH setup

```bash
# On server: add your GitHub Actions public key
echo "ssh-rsa AAAA... your-key" >> ~/.ssh/authorized_keys
```

## 4. How it works

- Push to `dev` → auto deploys to **staging** (staging.justbreath.life)
- Push to `main` → auto deploys to **production** (justbreath.life)
- Manual trigger with "maintenance mode" option for risky deploys

## 5. Maintenance mode

Manual toggle via Admin panel → or API:

```bash
# Enable maintenance (users see maintenance page)
curl -X POST https://justbreath.life/api/admin/maintenance \
  -H 'Content-Type: application/json' \
  -d '{"token":"YOUR_ADMIN_TOKEN","enabled":true}'

# Disable
curl -X POST https://justbreath.life/api/admin/maintenance \
  -d '{"token":"YOUR_ADMIN_TOKEN","enabled":false}'
```

## 6. .env.example fields

```
PORT=8080
SITE_NAME=justbreath.life
OWNER_HANDLE=Tcheler
OWNER_EMAIL=andrexarlay@gmail.com
OWNER_PASSWORD=change_this_in_production
BRAND_PASSWORD=change_this_in_production
ADMIN_TOKEN=generate_random_32_chars
TENOR_API_KEY=           # Optional: for GIF search
```
