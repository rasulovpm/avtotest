# AvtoTest.uz — Online Avto Imtihon Platformasi

Haydovchilik guvohnomasi imtihoniga onlayn tayyorgarlik. To'liq stack:

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **Backend:** Next.js API Routes
- **DB:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js + Telegram OTP
- **i18n:** O'zbek (lotin), Ўзбек (кирилл), Русский — admin paneldan kengaytiriladi

## Tarkibi

```
app/
├── prisma/                  Prisma schema + seed (20 savol, 6 belgi, 2 tarif)
├── src/app/                 Next.js App Router
│   ├── page.tsx             Landing
│   ├── tests/               Testlar katalogi + Quiz engine
│   ├── results/[id]/        Natijalar
│   ├── progress/            Statistika dashboard
│   ├── signs/               Yo'l belgilari
│   ├── pricing/             Narxlar
│   ├── auth/                Login + Register (telefon + OTP)
│   ├── profile/             Foydalanuvchi profili
│   ├── admin/               Admin panel (dashboard, savollar, foydalanuvchilar, to'lovlar, sozlamalar)
│   └── api/                 REST API
├── src/components/
│   ├── ui/                  Button, Input, BentoCard, Badge, Progress
│   ├── layout/              Header, Footer
│   └── lang-provider.tsx    Til konteksti
├── src/lib/
│   ├── auth.ts              NextAuth konfiguratsiya
│   ├── telegram.ts          OTP yuborish (DEV rejimda console)
│   ├── prisma.ts            Prisma singleton
│   ├── i18n.ts              Tarjima lug'atlari
│   └── utils.ts             Yordamchi funksiyalar
└── docker-compose.yml       Lokal PostgreSQL
```

## O'rnatish (Lokal)

### 1. Talablar

- Node.js 18+ (24 ham ishlaydi)
- Docker Desktop (PostgreSQL uchun) yoki lokal PostgreSQL 14+
- Git

### 2. PostgreSQL ishga tushirish

Docker bilan (oson):

```bash
docker compose up -d
```

Yoki o'zingizning PostgreSQL'ni ishlating va `.env`'da `DATABASE_URL`'ni o'zgartiring.

### 3. Dependencies

```bash
npm install
```

> Windows PowerShell'da xato bersa:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```
> yoki `cmd /c "npm install"` ishlating.

### 4. Database push + seed

```bash
npm run db:push
npm run db:seed
```

Seed quyidagilarni yaratadi:
- 4 ta kategoriya (Yo'l qoidalari, Belgilar, Texnika, Tibbiy yordam)
- 20 ta test savol (3 tilda)
- 6 ta yo'l belgisi
- 2 ta tarif (14 kun = 39000, 30 kun = 69000 so'm)
- Super admin foydalanuvchi (`.env`'dagi `ADMIN_PHONE`)

### 5. Dev serverni ishga tushirish

```bash
npm run dev
```

Saytni oching: http://localhost:3000

### 6. Admin panelga kirish

1. `.env`'da `ADMIN_PHONE` ni o'z raqamingizga moslang (default: `+998901234567`).
2. Seed qaytadan ishlating: `npm run db:seed`.
3. Saytda `/auth/login` orqali shu raqamga kiring.
4. **DEV rejimda OTP kod terminal/konsolda chiqadi:**

```
========================================
📱 OTP for +998901234567: 482913
========================================
```

5. Kodni kiriting va profilga `/admin` orqali o'ting.

## Telegram OTP (Production)

Hozircha DEV rejim ishlatiladi — kod konsolda chiqadi. Real bot uchun:

1. [@BotFather](https://t.me/BotFather) ga `/newbot` yozing va token oling.
2. `.env`'da:
   ```
   TELEGRAM_DEV_MODE="false"
   TELEGRAM_BOT_TOKEN="123456:ABC..."
   TELEGRAM_BOT_USERNAME="avtotest_bot"
   ```
3. Foydalanuvchilar avval bot bilan suhbat boshlashi kerak (`/start`). Bot kodi `User.telegramId`'ni yozib qo'yadi (bu integratsiya keyinroq qo'shiladi).

## Click integratsiyasi

Hozircha **mock**: foydalanuvchi pricing sahifasida tugma bossa, `Payment` yozuvi `PENDING` holatida yaratiladi. Admin uni `/admin/payments` sahifasidan **Faollashtirish** tugmasi bilan tasdiqlaydi — keyin foydalanuvchi avtomatik `PREMIUM` rejaga o'tadi va `planExpiresAt` tarif muddatiga qarab belgilanadi.

Real Click integratsiyasi uchun `src/app/api/payments/click/` ostida webhook endpoint yarating va `.env`'dagi `CLICK_*` o'zgaruvchilarni to'ldiring.

**Admin sozlamalari** (`/admin/settings`):
- Click yoqish/o'chirish
- Manual to'lovni yoqish/o'chirish
- Tariflar narxini o'zgartirish

## Foydali komandalar

```bash
npm run dev              # Dev server
npm run build            # Production build
npm run start            # Production server
npm run db:generate      # Prisma client'ni qayta generatsiya qilish
npm run db:push          # Schema'ni DB ga push qilish (dev)
npm run db:migrate       # Migration yaratish (prod)
npm run db:seed          # Seed
npm run db:studio        # Prisma Studio (vizual GUI)
```

## Loyiha xususiyatlari

### Foydalanuvchi
- Telefon raqami + Telegram OTP orqali login (NextAuth)
- 3 til: O'zbek (lotin), Ўзбек (кирилл), Русский — har sahifada o'tkazgich
- Bento grid dizayn (Apple-style)
- Quiz engine: timer, klaviatura yorliqlari (1-4, ←/→), savollar xaritasi
- Natijalar: doiraviy progress, kategoriya tahlili, xato javoblar
- Statistika: streak, XP, daraja, haftalik faollik
- Yo'l belgilari kutubxonasi: kategoriya filteri, qidiruv

### Admin
- Dashboard: tizim statistika
- Savollar bazasi: CRUD, 3 tilda kiritish, rasmlar, tushuntirish
- Testlar ro'yxati
- Foydalanuvchilar: rol va reja boshqaruvi (inline edit)
- To'lovlar: PENDING → ACTIVE/REJECTED (manual tasdiqlash)
- Sozlamalar: to'lov tizimi, tariflar narxi
- Yo'l belgilari ro'yxati

### API
- `POST /api/auth/otp` — OTP yuborish
- `POST /api/auth/[...nextauth]` — NextAuth (login)
- `POST /api/auth/register` — Ro'yxatdan o'tish
- `POST /api/quiz/submit` — Test natijasini yuborish
- `POST /api/payments/request` — To'lov so'rovi
- `POST /api/admin/questions` (POST/PATCH/DELETE)
- `PATCH /api/admin/users/[id]`
- `POST /api/admin/payments/[id]` — `{action: "approve"|"reject"}`
- `POST /api/admin/settings`

## Production deploy

1. PostgreSQL ni production'da yaratang (Neon, Supabase, RDS).
2. `.env.production` da haqiqiy qiymatlarni qo'ying:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (https://avtotest.uz)
   - `NEXTAUTH_SECRET` (`openssl rand -base64 32`)
   - `TELEGRAM_BOT_TOKEN` (real bot)
   - `TELEGRAM_DEV_MODE="false"`
3. Migration: `npm run db:migrate deploy`
4. Build: `npm run build`
5. Vercel'ga deploy yoki `npm run start` (PM2/Docker bilan)

## Litsenziya

Maxfiy. Faqat ichki foydalanish.
