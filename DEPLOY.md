# Deploy — avtoimtixon.uz

VPS: `root@157.180.28.98` (Hetzner). Ushbu qo'llanma loyihani **noldan** ushbu serverga deploy qilish uchun.

Stack: Next.js 14 (standalone) + Prisma + SQLite (persistent volume) + Nginx, hammasi Docker Compose ostida.

---

## 0. Lokalda — kodni GitHub'ga push qiling

```powershell
git add app/Dockerfile app/.dockerignore app/docker-compose.prod.yml `
        app/docker-entrypoint.sh app/deploy.sh `
        app/.env.production.example app/next.config.mjs `
        app/nginx/nginx.conf app/.gitignore DEPLOY.md
git commit -m "chore: add production Docker deploy stack"
git push origin main
```

---

## 1. Serverga ulaning

```bash
ssh root@157.180.28.98
```

---

## 2. Docker o'rnatish (faqat birinchi marta)

```bash
# Tekshiring — o'rnatilganmi?
docker --version && docker compose version && exit 0 || true

# Yo'q bo'lsa — Docker rasmiy skripti orqali (Ubuntu/Debian)
curl -fsSL https://get.docker.com | sh
systemctl enable --now docker
docker --version
docker compose version
```

---

## 3. Repodan klonlash

```bash
mkdir -p /opt && cd /opt
git clone https://github.com/rasulovpm/avtotest.git avtoimtixon
cd avtoimtixon/app
```

(Keyingi yangilanishlarda: `cd /opt/avtoimtixon && git pull`)

---

## 4. `.env.production` faylini yaratish

```bash
cp .env.production.example .env.production
# Kuchli secret yarating:
SECRET=$(openssl rand -base64 48)
# Faylni tahrirlang:
nano .env.production
```

Quyidagilarni o'zgartiring:

| O'zgaruvchi          | Qiymat                                                       |
| -------------------- | ------------------------------------------------------------ |
| `NEXTAUTH_URL`       | `http://157.180.28.98` (domen ulanganda `https://...uz`)     |
| `NEXTAUTH_SECRET`    | yuqorida yaratilgan `$SECRET` qiymati                         |
| `ADMIN_PHONE`        | sizning telefon raqamingiz, masalan `+998901234567`          |
| `TELEGRAM_DEV_MODE`  | `true` qoldiring (OTP konsolega chiqadi — bot kerak emas)    |
| `RUN_SEED`           | **birinchi ishga tushirishda** `1` qiling, keyin `0` ga qaytaring |

---

## 5. Ishga tushirish

```bash
chmod +x deploy.sh docker-entrypoint.sh
./deploy.sh up
```

Birinchi marta image build ~3–5 daqiqa oladi. Tugagach `app` va `nginx` containerlari `Up` holatida bo'lishi kerak.

Loglarni ko'rish:

```bash
./deploy.sh logs
```

---

## 6. Tekshirish

Brauzerda oching: **http://157.180.28.98**

Sayt ochilishi kerak. Admin sifatida kirish — `.env.production`'dagi `ADMIN_PHONE` raqamiga OTP so'raladi; `TELEGRAM_DEV_MODE=true` bo'lgani uchun OTP kod loglarda ko'rinadi:

```bash
docker compose -f docker-compose.prod.yml logs -f app | grep -i otp
```

---

## 7. Birinchi ishga tushirishdan keyin

`.env.production`'da `RUN_SEED=0` qiling (qayta seed qilmaslik uchun) va appni qayta ishga tushiring:

```bash
nano .env.production       # RUN_SEED=0
./deploy.sh restart
```

---

## Keyingi yangilanishlar (yangi commit serverga)

```bash
cd /opt/avtoimtixon
git pull
cd app
./deploy.sh restart
```

---

## Domen + HTTPS (keyinroq)

1. Domen `avtoimtixon.uz` A-recordini `157.180.28.98` ga yo'naltiring.
2. Letsencrypt orqali sertifikat oling (server'da):
   ```bash
   apt-get update && apt-get install -y certbot
   # 80-portni vaqtincha bo'shatish kerak:
   docker compose -f /opt/avtoimtixon/app/docker-compose.prod.yml stop nginx
   certbot certonly --standalone -d avtoimtixon.uz -d www.avtoimtixon.uz
   mkdir -p /opt/avtoimtixon/app/nginx/certs
   cp /etc/letsencrypt/live/avtoimtixon.uz/fullchain.pem /opt/avtoimtixon/app/nginx/certs/
   cp /etc/letsencrypt/live/avtoimtixon.uz/privkey.pem  /opt/avtoimtixon/app/nginx/certs/
   ```
3. `app/nginx/nginx.conf` faylida pastdagi `# server { listen 443 ssl ... }` blokini commentdan chiqarib, `server_name`'ni domeningizga moslang.
4. `.env.production`'da `NEXTAUTH_URL=https://avtoimtixon.uz` qiling.
5. ```bash
   cd /opt/avtoimtixon/app && ./deploy.sh restart
   docker compose -f docker-compose.prod.yml up -d nginx
   ```

---

## Foydali komandalar

```bash
./deploy.sh logs                                    # barcha loglar
./deploy.sh restart                                  # appni qayta ishga tushirish (DB saqlanadi)
./deploy.sh down                                     # to'xtatish (volumelar saqlanadi)
docker compose -f docker-compose.prod.yml ps         # holat
docker compose -f docker-compose.prod.yml exec app sh  # container ichiga kirish
docker volume ls | grep app-                          # SQLite volume manzili
```

---

## Backup (SQLite)

```bash
# DB faylni hostga nusxalash:
docker compose -f /opt/avtoimtixon/app/docker-compose.prod.yml \
  exec -T app cat /app/data/prod.db > /root/avtoimtixon-$(date +%F).db
```
