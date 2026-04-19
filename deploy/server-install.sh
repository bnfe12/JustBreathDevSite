#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# server-install.sh — установка justbreath в /root/justbreath c нуля.
#
# Что делает:
#   1. Проверяет наличие Node 20+, ставит через NodeSource если нет
#   2. Ставит nginx и certbot
#   3. Ставит npm-зависимости проекта
#   4. Генерирует .env с рандомными ADMIN_TOKEN/паролями
#   5. Кладёт systemd unit и запускает его
#   6. Кладёт nginx конфиг и перезагружает nginx
#   7. (опционально) Получает Let's Encrypt сертификат
#
# Предполагает, что этот скрипт лежит внутри /root/justbreath/deploy/.
#
# Usage:
#   sudo bash /root/justbreath/deploy/server-install.sh
#
# Env-переменные:
#   DOMAIN=justbreath.life     — основной домен (по умолчанию)
#   SKIP_TLS=1                 — не запрашивать Let's Encrypt
#   SKIP_NGINX=1               — не трогать nginx (если Cloudflare Tunnel)
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }

DOMAIN="${DOMAIN:-justbreath.life}"
APP_DIR="/root/justbreath"
SERVICE_USER="root"
SKIP_TLS="${SKIP_TLS:-0}"
SKIP_NGINX="${SKIP_NGINX:-0}"

log()  { printf "\n\033[1;36m▸ %s\033[0m\n" "$*"; }
ok()   { printf "\033[1;32m  ✓ %s\033[0m\n" "$*"; }
warn() { printf "\033[1;33m  ! %s\033[0m\n" "$*"; }
die()  { printf "\033[1;31m  ✗ %s\033[0m\n" "$*"; exit 1; }

[[ -d "$APP_DIR" ]] || die "$APP_DIR не существует. Скопируйте проект туда сначала."
[[ -f "$APP_DIR/server/index.js" ]] || die "$APP_DIR/server/index.js не найден"

# ── 1. Node.js 20+ ────────────────────────────────────────────────────────────
log "Проверка Node.js"
if ! command -v node >/dev/null 2>&1; then
  warn "node не найден — ставлю через NodeSource"
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
NODE_VER=$(node -v | sed 's/v//' | cut -d. -f1)
[[ $NODE_VER -ge 20 ]] || die "нужен Node 20+, установлен $(node -v)"
ok "Node $(node -v)"

# ── 2. nginx + certbot ────────────────────────────────────────────────────────
if [[ "$SKIP_NGINX" != "1" ]]; then
  log "Установка nginx и certbot"
  apt-get update -qq
  apt-get install -y nginx certbot python3-certbot-nginx >/dev/null
  ok "nginx $(nginx -v 2>&1 | cut -d/ -f2)"
fi

# ── 3. npm install ────────────────────────────────────────────────────────────
log "npm install в $APP_DIR"
cd "$APP_DIR"
npm install --omit=dev --silent
ok "зависимости установлены"

# ── 4. .env c рандомными секретами ────────────────────────────────────────────
log "Конфигурация .env"
if [[ -f "$APP_DIR/.env" ]]; then
  warn ".env уже существует — не перезаписываю. Проверьте секреты вручную."
else
  ADMIN_TOKEN=$(openssl rand -hex 32)
  OWNER_PASS=$(openssl rand -base64 24 | tr -d '/+=' | head -c 20)
  BRAND_PASS=$(openssl rand -base64 24 | tr -d '/+=' | head -c 20)
  cp "$APP_DIR/.env.example" "$APP_DIR/.env"
  sed -i "s|^ADMIN_TOKEN=.*|ADMIN_TOKEN=$ADMIN_TOKEN|" "$APP_DIR/.env"
  sed -i "s|^OWNER_PASSWORD=.*|OWNER_PASSWORD=$OWNER_PASS|" "$APP_DIR/.env"
  sed -i "s|^BRAND_PASSWORD=.*|BRAND_PASSWORD=$BRAND_PASS|" "$APP_DIR/.env"
  sed -i "s|^APP_URL=.*|APP_URL=https://$DOMAIN|" "$APP_DIR/.env"
  chmod 600 "$APP_DIR/.env"
  ok ".env создан (chmod 600)"
  echo
  echo "  ╔═══════════════════════════════════════════════════════════════╗"
  echo "  ║  СОХРАНИТЕ ЭТИ ДАННЫЕ — они больше не будут показаны:         ║"
  echo "  ╠═══════════════════════════════════════════════════════════════╣"
  printf  "  ║  Owner handle:    Tcheler%*s║\n" $((38)) " "
  printf  "  ║  Owner password:  %-44s ║\n" "$OWNER_PASS"
  printf  "  ║  Brand password:  %-44s ║\n" "$BRAND_PASS"
  printf  "  ║  Admin token:     %-44s ║\n" "${ADMIN_TOKEN:0:40}..."
  echo "  ╚═══════════════════════════════════════════════════════════════╝"
  echo
fi

# ── 5. systemd unit ───────────────────────────────────────────────────────────
log "Установка systemd юнита"
cat > /etc/systemd/system/justbreath.service <<EOF
[Unit]
Description=justbreath.life
After=network.target

[Service]
Type=simple
User=$SERVICE_USER
WorkingDirectory=$APP_DIR
EnvironmentFile=$APP_DIR/.env
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server/index.js
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal
# Resource limits
LimitNOFILE=65536
# Security hardening
NoNewPrivileges=true
ProtectSystem=full
ReadWritePaths=$APP_DIR/data $APP_DIR/backups $APP_DIR/public

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable justbreath.service >/dev/null 2>&1
systemctl restart justbreath.service
sleep 2
if systemctl is-active --quiet justbreath.service; then
  ok "justbreath.service запущен"
else
  warn "justbreath.service не запустился — смотрите: journalctl -u justbreath -n 50"
  journalctl -u justbreath -n 30 --no-pager || true
  die "запуск не удался"
fi

# ── 6. nginx ──────────────────────────────────────────────────────────────────
if [[ "$SKIP_NGINX" != "1" ]]; then
  log "Конфигурация nginx для $DOMAIN"
  NGINX_CONF=/etc/nginx/sites-available/justbreath.conf
  cp "$APP_DIR/deploy/nginx-justbreath.conf" "$NGINX_CONF"
  sed -i "s|justbreath\\.life|$DOMAIN|g" "$NGINX_CONF"
  ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/justbreath.conf
  rm -f /etc/nginx/sites-enabled/default
  nginx -t
  systemctl reload nginx
  ok "nginx настроен"
fi

# ── 7. Let's Encrypt ──────────────────────────────────────────────────────────
if [[ "$SKIP_NGINX" != "1" && "$SKIP_TLS" != "1" ]]; then
  log "Let's Encrypt сертификат для $DOMAIN"
  if [[ ! -d "/etc/letsencrypt/live/$DOMAIN" ]]; then
    warn "убедитесь, что A-запись $DOMAIN указывает на этот сервер"
    read -r -p "  продолжить с certbot? [y/N] " ans
    if [[ "${ans,,}" == "y" ]]; then
      certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN" --redirect || warn "certbot не удался — проверьте DNS"
    fi
  else
    ok "сертификат уже существует"
  fi
fi

# ── 8. Firewall (если ufw установлен) ─────────────────────────────────────────
if command -v ufw >/dev/null 2>&1; then
  log "UFW правила"
  ufw allow 22/tcp >/dev/null 2>&1 || true
  ufw allow 80/tcp >/dev/null 2>&1 || true
  ufw allow 443/tcp >/dev/null 2>&1 || true
  ok "22/80/443 разрешены"
fi

echo
log "Готово. Проверки:"
echo "    systemctl status justbreath     # статус сервиса"
echo "    journalctl -u justbreath -f     # живой лог"
echo "    curl http://127.0.0.1:8080/api/health"
[[ "$SKIP_NGINX" != "1" ]] && echo "    curl -I https://$DOMAIN/"
echo
