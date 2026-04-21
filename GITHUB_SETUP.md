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

Manual toggle via the private operations session in `/admin`:

```bash
# Sign in with the private operations account in the browser, then use the maintenance toggle in /admin.
# Do not expose a shared maintenance API token in CI, docs, or automation.
```

## 6. .env.example fields

```
PORT=8080
SITE_NAME=justbreath.life
OWNER_HANDLE=Tcheler
OWNER_EMAIL=andrexarlay@gmail.com
OWNER_PASSWORD=change_this_in_production
BRAND_PASSWORD=change_this_in_production
TENOR_API_KEY=           # Optional: for GIF search
```
