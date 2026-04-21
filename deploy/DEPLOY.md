# Deploy guide — justbreath.life

Инструкция по развёртыванию на свежем (или захламленном) VPS Ubuntu/Debian.
Путь установки: `/root/justbreath`.

---

## 0. Требования к VPS

- Ubuntu 22.04/24.04 или Debian 12
- root-доступ по SSH
- 1 GB RAM, 1 CPU, 20 GB диска — минимум (на старте хватит с запасом)
- домен `justbreath.life` с A/AAAA записями на IP сервера
- отдельная запись `sites.justbreath.life` на тот же IP для изоляции uploaded creator sites

---

## 1. Полная очистка (если на сервере уже был старый инстанс)

Залейте архив на сервер и распакуйте во временную папку:

```bash
# На локальной машине:
scp justbreath_final_working.zip root@YOUR_SERVER_IP:/tmp/

# На сервере:
ssh root@YOUR_SERVER_IP
cd /tmp
unzip justbreath_final_working.zip   # распакует в /tmp/final/
cd final
```

Запустите cleanup — он интерактивно спросит подтверждение на каждую опасную
операцию:

```bash
sudo bash deploy/server-cleanup.sh
```

Что будет очищено (после вашего подтверждения):
- процессы, занимающие порты 80/443/8080
- старые systemd юниты (`justbreath*`, `jb-*`, `node-*site`)
- все PM2 процессы + автозапуск
- все Docker контейнеры, подозрительные образы, `docker system prune -af --volumes`
- `docker-compose.yml` в /root, /opt, /srv, /var/www — предлагается `docker compose down -v`
- nginx sites-enabled/sites-available/conf.d (кроме `default`)
- старые папки `/root/justbreath-*`, `/opt/justbreath`, `/var/www/justbreath`
- все запущенные `node` процессы
- cron-записи со словом justbreath

Сертификаты Let's Encrypt **не удаляются автоматически** — они валидны и их
можно переиспользовать.

Для неинтерактивного запуска (всё подтверждать автоматически):
```bash
FORCE=1 sudo bash deploy/server-cleanup.sh
```

---

## 2. Размещение проекта в /root/justbreath

```bash
# Перенос из /tmp в финальное место
mv /tmp/final /root/justbreath
cd /root/justbreath
```

Убедитесь что путь правильный:
```bash
ls /root/justbreath/server/index.js  # должен существовать
```

---

## 3. Автоматическая установка

```bash
sudo bash /root/justbreath/deploy/server-install.sh
```

Скрипт сам:
1. Ставит Node.js 22 если его нет
2. Ставит nginx + certbot
3. `npm install --omit=dev`
4. Генерирует `.env` с рандомными `OWNER_PASSWORD`, `BRAND_PASSWORD`
   и **показывает их один раз на экране — запишите**
5. Ставит `APP_URL=https://<domain>` и `UPLOADED_SITES_ORIGIN=https://sites.<domain>`
6. Создаёт systemd unit `justbreath.service`, включает автозапуск, стартует
7. Кладёт nginx конфиг, делает `nginx -t && systemctl reload nginx`
8. Запрашивает Let's Encrypt сертификат (перед этим проверьте, что A-записи
   домена и `sites.` указывают на этот сервер — иначе certbot упадёт)
9. Открывает 22/80/443 в ufw (если ufw установлен)

По умолчанию домен `justbreath.life`. Чтобы использовать другой:
```bash
DOMAIN=myotherdomain.com sudo bash /root/justbreath/deploy/server-install.sh
```

Если работаете через Cloudflare Tunnel и nginx не нужен:
```bash
SKIP_NGINX=1 SKIP_TLS=1 sudo bash /root/justbreath/deploy/server-install.sh
```

---

## 4. Проверка

```bash
# Сервис жив?
systemctl status justbreath

# Живой лог
journalctl -u justbreath -f

# Health endpoint
curl http://127.0.0.1:8080/api/health
# → {"ok":true,"site":"justbreath.life"}

# HTTPS проверка (после certbot)
curl -I https://justbreath.life/
# → HTTP/2 200

# Отдельный host для uploaded sites тоже должен отвечать
curl -I https://sites.justbreath.life/
```

Откройте `https://justbreath.life/` в браузере:
- должна загрузиться главная с кнопками "Create free account" / "Try as guest"
- клик "Sign in" → модалка → войти с `Tcheler` + паролем из установщика

---

## 5. Дальнейшая настройка

### Email (верификация аккаунтов, сброс пароля)

Откройте `/root/justbreath/.env`, заполните SMTP-секцию. Пример для Resend:
```
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxxxxx
SMTP_FROM=noreply@justbreath.life
```

Перезапустите:
```bash
systemctl restart justbreath
```

### Uploaded site isolation

Проверьте в `/root/justbreath/.env`:
```bash
APP_URL=https://justbreath.life
UPLOADED_SITES_ORIGIN=https://sites.justbreath.life
```

`UPLOADED_SITES_ORIGIN` должен быть отдельным host, а не path на основном домене. Иначе uploaded creator sites не будут публиковаться.

### GIF-поиск в чате

Получите бесплатный ключ Tenor: https://developers.google.com/tenor/guides/quickstart
Добавьте в `.env`:
```
TENOR_API_KEY=AIzaXXXXXXXXXXXXX
```
Перезапустите сервис.

### Обновление проекта

```bash
cd /root/justbreath
# залейте новую версию поверх (scp/rsync/git pull)
npm install --omit=dev
systemctl restart justbreath
```

Бэкап `store.json` создаётся автоматически перед shutdown.

---

## 6. Бэкапы

Авто-бэкапы каждые 30 мин в `/root/justbreath/backups/auto-<ISO>.json`,
хранятся последние 48 (24 часа).

Для внешних бэкапов добавьте cron:
```bash
crontab -e
# Строка:
0 3 * * * rsync -a /root/justbreath/data/ /root/justbreath/backups/ backup@remote:/jb-archive/
```

---

## 7. Диагностика

| Симптом | Что смотреть |
|---------|-------------|
| 502 Bad Gateway | `systemctl status justbreath` — упал сервис |
| "Site can't be reached" | DNS A-запись не указывает на сервер |
| SSE обрывается | nginx конфиг для `/api/events` без `proxy_buffering off` |
| 413 Request Entity Too Large | `client_max_body_size` в nginx меньше нужного размера архива; для текущего импорта держите `1g` и проверьте `proxy_request_buffering off` на архивных маршрутах |
| Email не приходят | `journalctl -u justbreath -n 100 \| grep -i smtp` |
| 429 Too Many Requests | rate-limit сработал — нормальное поведение |

Логи:
```bash
journalctl -u justbreath -n 200 --no-pager   # последние 200 строк
journalctl -u justbreath --since "1 hour ago"
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

---

## 8. Откат

Бэкап перед любым обновлением:
```bash
cp /root/justbreath/data/store.json /root/justbreath/data/store.json.manual-$(date +%F)
```

Восстановление из авто-бэкапа:
```bash
systemctl stop justbreath
cp /root/justbreath/backups/auto-XXXX.json /root/justbreath/data/store.json
systemctl start justbreath
```

---

## 9. Security and proxy notes

- Для production обязательно держите HTTPS. Только так реально работают `Secure` cookies и `Strict-Transport-Security`.
- Не вырезайте `Origin` и `Referer` у обычного браузерного трафика на reverse proxy: приложение использует их для блокировки cross-site write-запросов к `/api/`.
- Если меняете домен или схему, проверьте `X-Forwarded-Proto` и `Host`, потому что от них зависят callback URL и часть защитных проверок.
- Не пытайтесь "спрятать" безопасность обфускацией фронтенда. Всё критичное должно оставаться на сервере.

## 10. Chat media regression rule

Для чата теперь есть отдельное правило регрессий:

- аудио/голосовые не должны вызывать полный `render()` всего SPA на каждом тике прогресса
- переключение между чатами не должно насильно останавливать общий playback
- состояние записи должно быть визуально очевидным: live-индикатор, таймер, понятный stop-state

Если после изменений чат снова начинает визуально перерисовываться во время воспроизведения, это нужно считать release-blocker багом.
