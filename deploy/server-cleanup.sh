#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# server-cleanup.sh — полная очистка от предыдущих развёртываний.
# Запускать на свежем/захламленном VPS перед server-install.sh.
# Обнаруживает и удаляет: Docker контейнеры/образы/compose, PM2 процессы,
# старые systemd юниты, nginx site-configs, процессы, слушающие 8080/80/443,
# старые папки в /root, /opt, /var/www.
#
# Usage:  sudo bash server-cleanup.sh
#
# По умолчанию запрашивает подтверждение перед каждой опасной операцией.
# Для неинтерактивного запуска:  FORCE=1 sudo bash server-cleanup.sh
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }

FORCE="${FORCE:-0}"
confirm() {
  local prompt="$1"
  if [[ "$FORCE" == "1" ]]; then echo "[auto-yes] $prompt"; return 0; fi
  read -r -p "$prompt [y/N] " ans
  [[ "${ans,,}" == "y" || "${ans,,}" == "yes" ]]
}

log()  { printf "\n\033[1;36m▸ %s\033[0m\n" "$*"; }
warn() { printf "\033[1;33m  ! %s\033[0m\n" "$*"; }
ok()   { printf "\033[1;32m  ✓ %s\033[0m\n" "$*"; }

# ── 1. Остановить всё, что слушает :8080, :80, :443 (кроме текущего cleanup) ──
log "Поиск процессов на портах 80/443/8080"
for port in 80 443 8080; do
  pids=$(ss -ltnp 2>/dev/null | awk -v p=":$port" '$4 ~ p { match($0,/pid=[0-9]+/); if (RSTART) print substr($0,RSTART+4,RLENGTH-4) }' | sort -u || true)
  if [[ -n "${pids:-}" ]]; then
    warn "порт $port заняли PID: $pids"
    for pid in $pids; do
      proc=$(ps -o comm= -p "$pid" 2>/dev/null || echo '?')
      echo "    PID $pid ($proc)"
    done
    if confirm "  → убить эти процессы?"; then
      for pid in $pids; do kill -TERM "$pid" 2>/dev/null || true; done
      sleep 1
      for pid in $pids; do kill -KILL "$pid" 2>/dev/null || true; done
      ok "порт $port освобождён"
    fi
  fi
done

# ── 2. systemd юниты предыдущего сайта ───────────────────────────────────────
log "Поиск старых systemd юнитов (justbreath*, node-*, jb-*)"
units=$(systemctl list-unit-files --no-legend 2>/dev/null | awk '{print $1}' | grep -iE '^(justbreath|jb-|node-.*site|breath)' || true)
if [[ -n "${units:-}" ]]; then
  echo "$units" | sed 's/^/    /'
  if confirm "  → остановить и удалить эти юниты?"; then
    for u in $units; do
      systemctl stop "$u" 2>/dev/null || true
      systemctl disable "$u" 2>/dev/null || true
      rm -f "/etc/systemd/system/$u" "/lib/systemd/system/$u"
    done
    systemctl daemon-reload
    ok "systemd юниты удалены"
  fi
else
  ok "старых systemd юнитов не найдено"
fi

# ── 3. PM2 процессы ───────────────────────────────────────────────────────────
log "PM2 процессы"
if command -v pm2 >/dev/null 2>&1; then
  pm2 list 2>/dev/null | sed 's/^/    /' || true
  if confirm "  → pm2 delete all + pm2 kill?"; then
    pm2 delete all 2>/dev/null || true
    pm2 kill 2>/dev/null || true
    pm2 unstartup 2>/dev/null || true
    ok "pm2 очищен"
  fi
else
  ok "pm2 не установлен"
fi

# ── 4. Docker контейнеры / образы / compose-стеки ────────────────────────────
log "Docker"
if command -v docker >/dev/null 2>&1; then
  containers=$(docker ps -a --format '{{.ID}}  {{.Names}}  {{.Image}}' 2>/dev/null || true)
  if [[ -n "${containers:-}" ]]; then
    echo "$containers" | sed 's/^/    /'
    if confirm "  → остановить и удалить ВСЕ docker контейнеры?"; then
      docker ps -q | xargs -r docker stop
      docker ps -aq | xargs -r docker rm -f
      ok "контейнеры удалены"
    fi
  else
    ok "контейнеров нет"
  fi

  images=$(docker images --format '{{.Repository}}:{{.Tag}}  {{.ID}}' 2>/dev/null | grep -iE 'justbreath|jb-|breath' || true)
  if [[ -n "${images:-}" ]]; then
    echo "$images" | sed 's/^/    /'
    if confirm "  → удалить эти образы?"; then
      docker images --format '{{.ID}} {{.Repository}}' | awk '/justbreath|jb-|breath/ {print $1}' | xargs -r docker rmi -f
      ok "образы удалены"
    fi
  fi

  # compose стеки в распространённых местах
  for dir in /root /opt /srv /var/www; do
    if [[ -d "$dir" ]]; then
      composes=$(find "$dir" -maxdepth 3 -name 'docker-compose*.y*ml' 2>/dev/null || true)
      for cf in $composes; do
        echo "    найден $cf"
        if confirm "      → docker compose down на $cf?"; then
          (cd "$(dirname "$cf")" && docker compose down -v 2>/dev/null || docker-compose down -v 2>/dev/null || true)
        fi
      done
    fi
  done

  if confirm "  → docker system prune -af --volumes (удалить всё неиспользуемое)?"; then
    docker system prune -af --volumes || true
    ok "docker запрунен"
  fi
else
  ok "docker не установлен"
fi

# ── 5. nginx site-configs ─────────────────────────────────────────────────────
log "nginx конфиги"
if [[ -d /etc/nginx/sites-available ]]; then
  ls /etc/nginx/sites-available/ 2>/dev/null | sed 's/^/    /'
  if confirm "  → удалить ВСЕ сайты из /etc/nginx/sites-enabled и sites-available (кроме default)?"; then
    find /etc/nginx/sites-enabled -mindepth 1 ! -name 'default' -delete 2>/dev/null || true
    find /etc/nginx/sites-available -mindepth 1 ! -name 'default' -delete 2>/dev/null || true
    ok "nginx sites очищены"
  fi
fi
if [[ -d /etc/nginx/conf.d ]]; then
  custom=$(find /etc/nginx/conf.d -name '*.conf' 2>/dev/null || true)
  if [[ -n "${custom:-}" ]]; then
    echo "$custom" | sed 's/^/    /'
    if confirm "  → удалить эти conf.d файлы?"; then
      find /etc/nginx/conf.d -name '*.conf' -delete
      ok "conf.d очищен"
    fi
  fi
fi
if command -v nginx >/dev/null 2>&1; then
  if confirm "  → перезагрузить nginx?"; then
    nginx -t && systemctl reload nginx && ok "nginx перезагружен"
  fi
fi

# ── 6. Старые папки проекта ──────────────────────────────────────────────────
log "Старые папки проекта"
for candidate in /root/justbreath-old /root/justbreath.life /root/jb /root/justbreath_v* /root/justbreath_final* /opt/justbreath /var/www/justbreath; do
  if [[ -e "$candidate" ]]; then
    sz=$(du -sh "$candidate" 2>/dev/null | cut -f1)
    echo "    $candidate ($sz)"
    if confirm "      → удалить?"; then rm -rf "$candidate"; ok "удалён"; fi
  fi
done

# ── 7. Бесхозные node-процессы ───────────────────────────────────────────────
log "Работающие node-процессы"
node_procs=$(pgrep -af node 2>/dev/null || true)
if [[ -n "${node_procs:-}" ]]; then
  echo "$node_procs" | sed 's/^/    /'
  if confirm "  → pkill -f node?"; then
    pkill -f node || true
    sleep 1
    pkill -9 -f node 2>/dev/null || true
    ok "node-процессы убиты"
  fi
fi

# ── 8. Cron-задачи со старыми путями ─────────────────────────────────────────
log "Cron-задачи"
if crontab -l 2>/dev/null | grep -qiE 'justbreath|breath'; then
  crontab -l 2>/dev/null | grep -iE 'justbreath|breath' | sed 's/^/    /'
  if confirm "  → удалить эти строки из crontab root?"; then
    crontab -l 2>/dev/null | grep -viE 'justbreath|breath' | crontab -
    ok "crontab очищен"
  fi
fi

# ── 9. Сертификаты Let's Encrypt (оставляем — они нужны, но показываем) ──────
log "Сертификаты Let's Encrypt"
if [[ -d /etc/letsencrypt/live ]]; then
  ls /etc/letsencrypt/live/ 2>/dev/null | sed 's/^/    /'
  warn "сертификаты НЕ удаляются автоматически — удалите вручную если домен меняется"
fi

echo
log "Очистка завершена. Следующий шаг:  sudo bash server-install.sh"
