# 🚗 AvtoTest.uz — Online Avto Imtihon Platformasi

## Dizayn Spetsifikatsiyasi (Design Specification)

> **Dizayn uslubi:** Bento Grid (Apple-style katakchali dizayn)
> **Maqsad:** O'zbekistonda haydovchilik guvohnomasi olish uchun 1000+ test savollarini interaktiv tarzda yechish platformasi
> **Auditoriya:** 18-45 yosh oralig'idagi haydovchilik guvohnomasi olmoqchi bo'lgan foydalanuvchilar

---

## 1. UMUMIY ARXITEKTURA

### 1.1 Sahifalar Tuzilmasi

```
├── Bosh sahifa (Landing Page)
├── Testlar sahifasi (Tests Catalog)
│   ├── Kategoriya bo'yicha testlar
│   ├── Mavzu bo'yicha testlar
│   └── Imtihon simulyatsiyasi
├── Test yechish sahifasi (Quiz Engine)
├── Natijalar sahifasi (Results Dashboard)
├── Statistika sahifasi (Progress Tracker)
├── Yo'l belgilari sahifasi (Road Signs Library)
├── Profil sahifasi (User Profile)
├── Narxlar sahifasi (Pricing)
└── Kirish / Ro'yxatdan o'tish (Auth Pages)
```

### 1.2 Texnologik Stek

| Qatlam | Texnologiya |
|--------|-------------|
| Frontend Framework | React 18+ (Next.js 14) |
| Styling | Tailwind CSS + CSS Variables |
| Animatsiya | Framer Motion |
| State Management | Zustand |
| Backend | Node.js / Supabase |
| Database | PostgreSQL |
| Auth | Supabase Auth / NextAuth |
| Hosting | Vercel |

---

## 2. DIZAYN TIZIMI (DESIGN SYSTEM)

### 2.1 Rang Palitrasi

```css
:root {
  /* Asosiy ranglar */
  --color-primary: #0A84FF;        /* Moviy - asosiy aksent */
  --color-primary-light: #5AC8FA;  /* Och moviy */
  --color-primary-dark: #0056D6;   /* To'q moviy */

  /* Ikkilamchi ranglar */
  --color-success: #30D158;        /* Yashil - to'g'ri javob */
  --color-error: #FF453A;          /* Qizil - noto'g'ri javob */
  --color-warning: #FFD60A;        /* Sariq - ogohlantirish */
  --color-info: #64D2FF;           /* Ko'k - ma'lumot */

  /* Neytral ranglar (Light mode) */
  --color-bg-primary: #F5F5F7;     /* Sahifa foni */
  --color-bg-card: #FFFFFF;        /* Karta foni */
  --color-bg-card-hover: #FAFAFA;  /* Karta hover */
  --color-bg-elevated: #FFFFFF;    /* Ko'tarilgan element */
  --color-border: #E5E5EA;         /* Chegara */
  --color-border-light: #F2F2F7;   /* Yengil chegara */

  /* Matn ranglari */
  --color-text-primary: #1D1D1F;   /* Asosiy matn */
  --color-text-secondary: #86868B; /* Ikkilamchi matn */
  --color-text-tertiary: #AEAEB2;  /* Uchinchi darajali */
  --color-text-inverse: #FFFFFF;   /* Teskari matn */

  /* Gradient'lar */
  --gradient-primary: linear-gradient(135deg, #0A84FF 0%, #5AC8FA 100%);
  --gradient-success: linear-gradient(135deg, #30D158 0%, #63E688 100%);
  --gradient-hero: linear-gradient(180deg, #000000 0%, #1D1D1F 100%);
  --gradient-card-blue: linear-gradient(145deg, #E8F4FD 0%, #D1ECFF 100%);
  --gradient-card-green: linear-gradient(145deg, #E3F9E8 0%, #C6F0D0 100%);
  --gradient-card-orange: linear-gradient(145deg, #FFF3E0 0%, #FFE0B2 100%);

  /* Dark mode */
  --dark-bg-primary: #000000;
  --dark-bg-card: #1C1C1E;
  --dark-bg-card-hover: #2C2C2E;
  --dark-bg-elevated: #2C2C2E;
  --dark-border: #38383A;
  --dark-text-primary: #F5F5F7;
  --dark-text-secondary: #98989D;
}
```

### 2.2 Tipografiya

```css
/* Shrift oilasi */
--font-display: 'SF Pro Display', -apple-system, 'Segoe UI', sans-serif;
--font-body: 'SF Pro Text', -apple-system, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', 'Fira Code', monospace;

/* O'zbek tiliga mos alternativ */
--font-display-alt: 'Outfit', 'Plus Jakarta Sans', sans-serif;
--font-body-alt: 'DM Sans', 'Source Sans 3', sans-serif;

/* O'lchamlar */
--text-hero: clamp(2.5rem, 5vw, 4.5rem);     /* 40-72px */
--text-h1: clamp(2rem, 4vw, 3rem);            /* 32-48px */
--text-h2: clamp(1.5rem, 3vw, 2.25rem);       /* 24-36px */
--text-h3: clamp(1.25rem, 2vw, 1.75rem);      /* 20-28px */
--text-h4: 1.25rem;                            /* 20px */
--text-body-lg: 1.125rem;                      /* 18px */
--text-body: 1rem;                             /* 16px */
--text-body-sm: 0.875rem;                      /* 14px */
--text-caption: 0.75rem;                       /* 12px */
--text-overline: 0.6875rem;                    /* 11px */

/* Font weights */
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-heavy: 800;

/* Line heights */
--leading-tight: 1.15;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Letter spacing */
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide: 0.04em;
--tracking-overline: 0.08em;
```

### 2.3 Fazoviy Tizim (Spacing)

```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */

/* Bento Grid gap */
--bento-gap: 1rem;         /* Mobil */
--bento-gap-md: 1.25rem;   /* Planshet */
--bento-gap-lg: 1.5rem;    /* Desktop */
```

### 2.4 Burchak Radiuslari

```css
--radius-sm: 0.5rem;      /* 8px - kichik elementlar */
--radius-md: 0.75rem;     /* 12px - tugmalar */
--radius-lg: 1rem;        /* 16px - kartalar */
--radius-xl: 1.25rem;     /* 20px - bento kataklar */
--radius-2xl: 1.5rem;     /* 24px - katta kartalar */
--radius-3xl: 2rem;       /* 32px - hero bloklar */
--radius-full: 9999px;    /* To'liq dumaloq */
```

### 2.5 Soyalar

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
--shadow-md: 0 4px 12px rgba(0,0,0,0.06);
--shadow-lg: 0 8px 30px rgba(0,0,0,0.08);
--shadow-xl: 0 20px 60px rgba(0,0,0,0.12);
--shadow-card: 0 2px 8px rgba(0,0,0,0.04), 0 0 1px rgba(0,0,0,0.06);
--shadow-card-hover: 0 8px 30px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.08);
--shadow-bento: 0 1px 3px rgba(0,0,0,0.03);
--shadow-bento-hover: 0 12px 40px rgba(0,0,0,0.1);
```

### 2.6 Animatsiya

```css
/* Transitions */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-smooth: 350ms cubic-bezier(0.25, 0.1, 0.25, 1);
--transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);

/* Framer Motion variants */
/*
  cardHover: { scale: 1.02, y: -4, transition: { duration: 0.3 } }
  cardTap: { scale: 0.98 }
  fadeInUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
  staggerChildren: { staggerChildren: 0.06, delayChildren: 0.1 }
*/
```

---

## 3. BENTO GRID TIZIMI

### 3.1 Grid Tuzilmasi

```
Asosiy Grid: 12 ustunli (columns)
Gap: var(--bento-gap-lg)

Breakpoints:
  - Mobile  (<640px):   1 ustun,  gap: 12px
  - Tablet  (640-1024): 2 ustun,  gap: 16px
  - Desktop (1024+):    4 ustun,  gap: 20px
  - Wide    (1440+):    6 ustun,  gap: 24px
```

### 3.2 Bento Katak O'lchamlari

```
Nomi             Grid o'lchami        Tavsif
─────────────────────────────────────────────────────
bento-1x1        1 col × 1 row       Kichik statistika karta
bento-2x1        2 col × 1 row       O'rta statistika / CTA
bento-1x2        1 col × 2 row       Vertikal karta
bento-2x2        2 col × 2 row       Asosiy kontent blok
bento-3x2        3 col × 2 row       Katta kontent / grafik
bento-4x2        4 col × 2 row       Hero banner blok
bento-full       to'liq kenglik      Keng banner
```

### 3.3 Bento Karta Komponenti

```jsx
// BentoCard.jsx — Bazaviy komponent

<div className={`
  bento-card
  rounded-[var(--radius-xl)]
  bg-[var(--color-bg-card)]
  border border-[var(--color-border-light)]
  shadow-[var(--shadow-bento)]
  overflow-hidden
  transition-all duration-300 ease-out
  hover:shadow-[var(--shadow-bento-hover)]
  hover:-translate-y-1
  cursor-pointer
  group
  relative
  p-6 md:p-8
`}>
  {/* Overline / Badge */}
  <span className="
    text-[var(--text-overline)]
    font-semibold
    tracking-[var(--tracking-overline)]
    uppercase
    text-[var(--color-text-secondary)]
    mb-2 block
  ">
    {overline}
  </span>

  {/* Title */}
  <h3 className="
    text-[var(--text-h3)]
    font-bold
    tracking-[var(--tracking-tight)]
    text-[var(--color-text-primary)]
    leading-[var(--leading-tight)]
    mb-3
  ">
    {title}
  </h3>

  {/* Content area */}
  <div className="flex-1">{children}</div>

  {/* Dekorativ gradient */}
  <div className="
    absolute inset-0
    opacity-0
    group-hover:opacity-100
    transition-opacity duration-500
    bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent
    pointer-events-none
    rounded-[var(--radius-xl)]
  " />
</div>
```

---

## 4. SAHIFALAR DIZAYNI

### 4.1 BOSH SAHIFA (Landing Page)

#### Header / Navigation

```
┌─────────────────────────────────────────────────────────────┐
│  🚗 AvtoTest    Testlar  Yo'l belgilari  Narxlar    [Kirish]│
│                                                    [Boshlash]│
└─────────────────────────────────────────────────────────────┘

Xususiyatlar:
  - Oq glassmorphism fon: backdrop-blur-xl bg-white/80
  - Sticky header: scroll paytida soyali bo'ladi
  - Mobilda: hamburger menu (slide-in panel)
  - Logo: gradientli matn yoki SVG icon + "AvtoTest"
  - CTA tugma: gradient-primary, rounded-full, px-6 py-2.5
```

#### Hero Section (Bento 4x2)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   O'zbekistonda #1 Avto Imtihon Platformasi                │
│                                                              │
│   1000+ test savollari bilan haydovchilik                   │
│   guvohnomasi imtihoniga tayyorlaning                       │
│                                                              │
│   [Bepul Boshlash →]    [Namuna ko'rish]                    │
│                                                              │
│   ✓ 1000+ savollar  ✓ Real imtihon  ✓ Tushuntirish         │
│                                                              │
└──────────────────────────────────────────────────────────────┘

Dizayn:
  - Fon: to'q gradient (--gradient-hero) yoki 3D avto illustratsiya
  - Matn: oq, markazlashtirilgan
  - CTA: katta tugma, gradient-primary, pulse animatsiya
  - Pastda: ishonch belgilari (checkmark + matn)
  - Animatsiya: fadeInUp, staggerChildren
```

#### Statistika Bento Grid (4 ta 1x1 katak)

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  1000+   │ │  50,000+ │ │   95%    │ │   24/7   │
│ Savollar │ │Foydalanuv│ │ Muvaffaq │ │  Online  │
│    📝    │ │    👥    │ │    🎯    │ │    🌐    │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

Dizayn:
  - Har bir karta: bento-1x1
  - Raqam: text-h1, font-heavy, gradient-text
  - Tavsif: text-body-sm, color-text-secondary
  - Icon: 48px, gradient fon bilan
  - Hover: scale(1.05), shadow-bento-hover
  - Animatsiya: CountUp (raqam animatsiyasi scroll-da)
```

#### Xususiyatlar Bento Grid (Aralash kataklar)

```
┌────────────────────┐ ┌──────────┐
│                    │ │ Yo'l     │
│  🎯 Real Imtihon  │ │ Belgilari│
│  Simulyatsiyasi   │ │ Kutubxo- │
│                    │ │ nasi     │
│  Haqiqiy imtihon  │ │          │
│  formatida mashq  │ │  🚧 200+ │
│  qiling           │ │  belgisi  │
├────────────────────┤ ├──────────┤
│  📊 Statistika    │ │          │
│                    │ │ 📱 Mobil │
│  O'z taraqqiyo-   │ │  Qulay   │
│  tingizni kuzating│ │          │
└────────────────────┘ └──────────┘

Grid layout:
  Row 1: [bento-2x2] [bento-1x2]
  Row 2: [bento-2x1] [bento-1x1]

Har bir karta uchun:
  - Noyob fon gradienti (card-blue, card-green, card-orange)
  - Icon yoki mini-illustratsiya
  - Overline + sarlavha + qisqa tavsif
  - Hover effekti
```

#### Qanday Ishlaydi (3 ta bento-1x1)

```
┌────────────┐ ┌────────────┐ ┌────────────┐
│     01     │ │     02     │ │     03     │
│            │ │            │ │            │
│  Ro'yxatdan│ │   Test     │ │  Imtihonga │
│  o'ting    │ │   yeching  │ │  tayyor!   │
│            │ │            │ │            │
│  Email yoki│ │ Kategoriya │ │  Natijalar │
│  telefon   │ │ tanlang va │ │  va tahlil │
│  orqali    │ │ boshlang   │ │  oling     │
└────────────┘ └────────────┘ └────────────┘

Dizayn:
  - Raqam: 72px, gradient-text, font-heavy
  - Kartalar orasida chiziqli connector (SVG)
  - Har bir karta pastida kichik animatsiyali illustratsiya
```

#### Fikrlar (Testimonials) — Bento 3x1

```
┌─────────────────────────────────────────────────┐
│  "AvtoTest orqali birinchi urinishda imtihon-   │
│   dan o'tdim. Juda foydali platforma!"          │
│                                                  │
│   👤 Aziz Karimov — Toshkent                    │
│   ⭐⭐⭐⭐⭐                                      │
│                                                  │
│   ← →  (carousel navigation)                    │
└─────────────────────────────────────────────────┘

Dizayn:
  - Auto-play carousel (5s interval)
  - Katta tirnoq belgisi dekoratsiya sifatida
  - Foydalanuvchi rasmi + ismi + shahri
  - Yulduzchali reyting
```

#### Footer

```
┌─────────────────────────────────────────────────────────────┐
│  🚗 AvtoTest.uz                                            │
│                                                              │
│  Testlar          Kompaniya        Yordam                   │
│  ─────────        ──────────       ──────                   │
│  Barcha testlar   Biz haqimizda    FAQ                      │
│  Yo'l belgilari   Blog             Aloqa                    │
│  Imtihon sim.     Narxlar          Qo'llab-quvvatlash       │
│                                                              │
│  📱 Ilovani yuklab oling: [App Store] [Google Play]         │
│                                                              │
│  © 2026 AvtoTest.uz — Barcha huquqlar himoyalangan          │
└─────────────────────────────────────────────────────────────┘

Dizayn:
  - To'q fon (dark-bg-primary)
  - Oq matn
  - 3 ustunli grid
  - Ijtimoiy tarmoqlar ikonkalari
```

---

### 4.2 TESTLAR KATALOGI (Tests Catalog Page)

#### Filter Panel + Bento Grid

```
┌────────────────────────────────────────────────────┐
│  Testlar Katalogi                                  │
│                                                     │
│  [Barchasi] [Yo'l harakati] [Texnik] [Tibbiy]     │
│  [Birinchi yordam] [Yo'l belgilari]                │
│                                                     │
│  Qiyinlik: [Oson] [O'rta] [Qiyin] [Aralash]       │
└────────────────────────────────────────────────────┘

Filter tugmalari dizayni:
  - Pill shaklidagi tugmalar (rounded-full)
  - Tanlangan: bg-primary, text-white
  - Tanlanmagan: bg-gray-100, text-gray-600
  - Hover: bg-gray-200
  - Animatsiya: layoutId (Framer Motion shared layout)
```

#### Test Kartalari Bento Grid

```
┌──────────────────┐ ┌──────────────────┐ ┌───────────┐
│  📋 Yo'l harakati│ │ 🚦 Svetofor va   │ │  🏆 Eng  │
│     qoidalari    │ │    tartibga      │ │  ko'p    │
│                  │ │    solish        │ │  yechil- │
│  40 ta savol     │ │                  │ │  gan     │
│  ⏱ 30 daqiqa    │ │  25 ta savol     │ │          │
│                  │ │  ⏱ 20 daqiqa    │ │  #1 PDD  │
│  ████████░░ 80%  │ │                  │ │  Test    │
│  [Davom etish →] │ │  ░░░░░░░░░░ 0%  │ │  ────    │
│                  │ │  [Boshlash →]    │ │  50 savol│
└──────────────────┘ └──────────────────┘ └───────────┘
┌───────────┐ ┌──────────────────────────────────────┐
│  🚗 Texnik│ │  🏥 Birinchi yordam asoslari         │
│  ko'rik   │ │                                       │
│           │ │  Tibbiy yordam bo'yicha 30 ta savol   │
│  15 savol │ │  bilan bilimingizni sinab ko'ring     │
│  ⏱ 15 daq│ │                                       │
│           │ │  ████░░░░░░ 40%    [Davom etish →]   │
└───────────┘ └──────────────────────────────────────┘

Har bir karta:
  - Kategoriya ikonkasi (emoji yoki Lucide icon)
  - Test nomi (h4, bold)
  - Savollar soni + vaqt limiti
  - Progress bar (agar avval boshlangan bo'lsa)
  - CTA tugma
  - Hover: -translate-y-1, shadow-bento-hover
  - Rang: har bir kategoriya uchun noyob gradient fon
```

#### Imtihon Simulyatsiyasi (Maxsus Bento Karta — bento-full)

```
┌─────────────────────────────────────────────────────────────┐
│  🎯                                                         │
│  HAQIQIY IMTIHON SIMULYATSIYASI                            │
│                                                              │
│  Haqiqiy imtihon sharoitida 40 ta savol, 30 daqiqa.        │
│  Kamida 36 ta to'g'ri javob — muvaffaqiyat!                │
│                                                              │
│  [Imtihonni Boshlash →]                                     │
│                                                              │
│  ⚡ 40 savol   ⏱ 30 daq   ✅ 36/40 o'tish bali            │
└─────────────────────────────────────────────────────────────┘

Dizayn:
  - To'liq kenglikdagi gradient karta
  - Fon: gradient-primary + pattern overlay
  - Oq matn, katta CTA tugma
  - Pulsating glow effekti
  - Ikonkalar: statistika badgelari pastda
```

---

### 4.3 TEST YECHISH SAHIFASI (Quiz Engine)

#### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ← Orqaga    Yo'l harakati qoidalari    ⏱ 24:30    12/40  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ████████████████████░░░░░░░░░░░░░░░░░░░░  30%              │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    [RASM / ILLUSTRATSIYA]                    │
│                    (yo'l holati rasmi)                       │
│                                                              │
│  12-savol                                                   │
│  Ushbu yo'l belgisi nimani bildiradi?                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  A) Asosiy yo'lning ustunligi                       │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  B) Qarama-qarshi harakatga yo'l berish             │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  C) To'xtash taqiqlangan                            │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  D) Piyodalar o'tish joyi                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│                                                              │
│  [← Oldingi]                              [Keyingi →]       │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Dizayn elementlari:
  ─────────────────

  Header:
    - Orqaga tugma (← icon)
    - Test nomi (markazda)
    - Timer (countdown, qizaradi 5 daq qolganda)
    - Savol raqami (12/40)

  Progress bar:
    - Gradient to'ldirish (primary → primary-light)
    - Rounded-full, height: 6px
    - Animatsiyali o'tish

  Savol kartasi:
    - Katta, markaziy karta
    - Agar rasm bo'lsa: yuqorida ko'rsatiladi (rounded-xl)
    - Savol matni: text-h4, font-semibold
    - Savol raqami: overline uslubida

  Javob variantlari:
    - Har biri alohida karta
    - Default: bg-card, border
    - Hover: border-primary, bg-primary/5
    - Tanlangan: border-primary, bg-primary/10, checkmark icon
    - To'g'ri (tekshirilgandan keyin): border-success, bg-success/10, ✓
    - Noto'g'ri (tekshirilgandan keyin): border-error, bg-error/10, ✗
    - Harf belgisi: chap tomonda doira ichida (A, B, C, D)

  Navigatsiya:
    - Oldingi/Keyingi tugmalari
    - Keyboard shortcuts: ←/→, 1/2/3/4
    - Swipe gesture (mobilda)
```

#### Javob Tushuntirishi (Explanation Panel)

```
┌─────────────────────────────────────────────────────────────┐
│  ✅ To'g'ri javob: A) Asosiy yo'lning ustunligi           │
│                                                              │
│  📖 Tushuntirish:                                           │
│  Bu belgi "Asosiy yo'l" degan ma'noni bildiradi.           │
│  YHQ 16-moddasi bo'yicha asosiy yo'ldagi transport         │
│  vositalari ustunlikka ega...                               │
│                                                              │
│  📎 Tegishli: YHQ 16-modda  |  ⭐ Saqlash  |  🚩 Shikoyat │
│                                                              │
│  [Keyingi savol →]                                          │
└─────────────────────────────────────────────────────────────┘

Dizayn:
  - Slide-up animatsiya (Framer Motion)
  - Yashil yoki qizil border (to'g'ri/noto'g'ri)
  - Tushuntirish matni: text-body, color-text-secondary
  - Havolalar: color-primary, underline
  - Ikonkali amallar (saqlash, shikoyat)
```

#### Savol Navigator (Mobil — Bottom Sheet)

```
┌─────────────────────────────────────────┐
│  Savollar xaritasi                 [✕]  │
│                                          │
│  ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩               │
│  ⑪ ⑫ ⑬ ⑭ ⑮ ⑯ ⑰ ⑱ ⑲ ⑳               │
│  ㉑ ㉒ ㉓ ㉔ ㉕ ㉖ ㉗ ㉘ ㉙ ㉚               │
│  ㉛ ㉜ ㉝ ㉞ ㉟ ㊱ ㊲ ㊳ ㊴ ㊵               │
│                                          │
│  🟢 Javob berilgan: 11                  │
│  ⚪ Javob berilmagan: 29                │
│  🟡 Belgilangan: 3                      │
└─────────────────────────────────────────┘

Ranglar:
  - Yashil doira: javob berilgan
  - Bo'sh doira: javob berilmagan
  - Sariq doira: keyinroq qaytish uchun belgilangan
  - Ko'k border: joriy savol
  - Har biriga bosilsa o'sha savolga o'tadi
```

---

### 4.4 NATIJALAR SAHIFASI (Results Dashboard)

#### Bento Grid Layout

```
Row 1:
┌──────────────────────────────┐ ┌──────────────────┐
│                              │ │   ⏱ Sarflangan   │
│      🎉 Tabriklaymiz!       │ │      vaqt         │
│                              │ │                   │
│     ████████████████████     │ │    22 daqiqa      │
│          36 / 40             │ │    14 soniya      │
│          90%                 │ │                   │
│                              │ │   O'rtacha: 33s   │
│     ✅ MUVAFFAQIYATLI        │ │   per savol       │
│                              │ │                   │
│   [Qayta yechish] [Ulashish] │ └──────────────────┘
└──────────────────────────────┘

Row 2:
┌──────────┐ ┌──────────┐ ┌──────────────────────────┐
│  ✅ 36   │ │  ❌ 4    │ │  📊 Kategoriya bo'yicha  │
│ To'g'ri  │ │Noto'g'ri │ │                           │
│          │ │          │ │  Yo'l qoidalari ████░ 85% │
│  90%     │ │  10%     │ │  Belgilar      █████ 95% │
│          │ │          │ │  Texnika       ███░░ 70% │
│          │ │          │ │  Tibbiy        ████░ 80% │
└──────────┘ └──────────┘ └──────────────────────────┘

Row 3:
┌─────────────────────────────────────────────────────┐
│  ❌ Xato javob berilgan savollar                    │
│                                                      │
│  #5   Svetofor signallari                    [Ko'rish]│
│  #18  Tormoz masofasi                        [Ko'rish]│
│  #27  Tibbiy yordam                          [Ko'rish]│
│  #35  Yo'l belgilari                         [Ko'rish]│
└─────────────────────────────────────────────────────┘

Dizayn:
  - Doiraviy progress (SVG circle): katta, markaziy
  - Gradient ranglar: 90%+ yashil, 70-89% sariq, <70% qizil
  - Confetti animatsiya (muvaffaqiyatli bo'lsa)
  - Kategoriya barlar: gradient to'ldirish
  - Xato savollar: ro'yxat, har birida "Ko'rish" tugmasi
```

---

### 4.5 STATISTIKA SAHIFASI (Progress Tracker)

#### Bento Grid Dashboard

```
Row 1:
┌────────────────────────────┐ ┌────────────┐ ┌────────────┐
│  📈 Umumiy taraqqiyot      │ │  🔥 Streak │ │  🏆 Daraja │
│                            │ │             │ │             │
│  [LINE CHART]              │ │   12 kun    │ │   OLTIN     │
│  Haftalik natijalar        │ │   ketma-ket │ │   1250 XP   │
│  grafikasi                 │ │             │ │             │
│                            │ │  Eng yaxshi:│ │  Keyingi:   │
│  Oxirgi 4 hafta            │ │  18 kun     │ │  PLATINA    │
└────────────────────────────┘ └────────────┘ └────────────┘

Row 2:
┌──────────────────┐ ┌──────────────────────────────────────┐
│  📋 Kategoriyalar│ │  📅 Kundalik mashq                   │
│                  │ │                                       │
│  Yo'l qoidalari  │ │  Du  Se  Ch  Pa  Ju  Sh  Ya          │
│  ████████░░ 80%  │ │  🟢  🟢  🟢  🟢  🟢  ⚪  ⚪          │
│                  │ │                                       │
│  Belgilar        │ │  Bu hafta: 5/7 kun                   │
│  ██████████ 100% │ │                                       │
│                  │ │  📊 Bugun: 15 ta test yechildi       │
│  Texnika         │ │  ⏱ Umumiy: 45 daqiqa                │
│  ██████░░░░ 60%  │ │                                       │
│                  │ │                                       │
│  Tibbiy          │ │                                       │
│  ████░░░░░░ 40%  │ │                                       │
└──────────────────┘ └──────────────────────────────────────┘

Row 3:
┌─────────────────────────────────────────────────────────────┐
│  🎯 Zaif tomonlar — Bu savollarga ko'proq e'tibor bering   │
│                                                              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │Svetofor│ │ Tormoz │ │ Birinchi│ │Qayta   │ │ Yo'l   │   │
│  │signali │ │masofasi│ │ yordam │ │burilish│ │ ishi   │   │
│  │  ❌×3  │ │  ❌×2  │ │  ❌×2  │ │  ❌×2  │ │  ❌×1  │   │
│  │[Mashq] │ │[Mashq] │ │[Mashq] │ │[Mashq] │ │[Mashq] │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
└─────────────────────────────────────────────────────────────┘

Dizayn:
  - Line chart: Recharts kutubxonasi, gradient area
  - Streak: olov emoji + katta raqam
  - Daraja: medal ikonka + progress to next level
  - Heatmap: GitHub-style haftalik grid
  - Zaif tomonlar: gorizontal scroll (mobilda)
```

---

### 4.6 YO'L BELGILARI KUTUBXONASI

#### Bento Grid + Filter

```
Filter:
┌─────────────────────────────────────────────────────────────┐
│  [Barchasi] [Ogohlantiruvchi] [Taqiqlovchi] [Axborot]      │
│  [Buyuruvchi] [Ustunlik] [Qo'shimcha]                      │
│                                                              │
│  🔍 Qidirish...                                             │
└─────────────────────────────────────────────────────────────┘

Grid:
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│   🔺       │ │   ⛔       │ │   ℹ️        │ │   ⬆️       │
│  [Belgi    │ │  [Belgi    │ │  [Belgi    │ │  [Belgi    │
│   rasmi]   │ │   rasmi]   │ │   rasmi]   │ │   rasmi]   │
│            │ │            │ │            │ │            │
│  Keskin    │ │  Kirish    │ │  Avtobus   │ │  To'g'ri   │
│  burilish  │ │  taqiq-    │ │  bekati    │ │  yuring    │
│            │ │  langan    │ │            │ │            │
│ 🟡Ogohlant│ │ 🔴Taqiqlov│ │ 🔵Axborot  │ │ 🔵Buyuruv- │
│            │ │            │ │            │ │ chi        │
└────────────┘ └────────────┘ └────────────┘ └────────────┘

Har bir belgi kartasi:
  - Belgi rasmi: markazda, 80x80px
  - Nomi: text-body, font-semibold
  - Kategoriya badge: rangli chip
  - Hover: flip animatsiya → orqa tomonda tushuntirish
  - Click: modal ochiladi (to'liq tushuntirish + tegishli testlar)
```

---

### 4.7 AUTENTIFIKATSIYA SAHIFALARI

#### Kirish (Login)

```
┌─────────────────────────────────────────┐
│                                          │
│          🚗 AvtoTest                     │
│                                          │
│       Hisobingizga kiring                │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │ 📧 Email yoki telefon raqami    │    │
│  └──────────────────────────────────┘    │
│  ┌──────────────────────────────────┐    │
│  │ 🔒 Parol                        │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ☐ Meni eslab qol    Parolni unutdim?   │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │          Kirish →                │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ─────── yoki ───────                    │
│                                          │
│  [G Google bilan]  [📱 Telegram bilan]  │
│                                          │
│  Hisobingiz yo'qmi? Ro'yxatdan o'ting   │
│                                          │
└─────────────────────────────────────────┘

Dizayn:
  - Markazlashtirilgan karta (max-width: 420px)
  - Fon: subtle gradient yoki pattern
  - Input: rounded-lg, border, focus:ring-primary
  - CTA: to'liq kenglikda, gradient-primary
  - Social login: outlined tugmalar
  - Animatsiya: fadeIn, blur-dan aniq
```

---

### 4.8 NARXLAR SAHIFASI (Pricing)

#### Bento Grid Pricing

```
┌──────────────────┐ ┌──────────────────────┐ ┌──────────────────┐
│                  │ │    ⭐ TAVSIYA        │ │                  │
│   🆓 BEPUL      │ │                      │ │   💎 PREMIUM     │
│                  │ │   🥇 STANDART        │ │                  │
│   0 so'm/oy     │ │                      │ │   99,000 so'm/oy │
│                  │ │   49,000 so'm/oy     │ │                  │
│  ✓ 100 ta test  │ │                      │ │  ✓ Barcha testlar│
│  ✓ Asosiy       │ │  ✓ 500+ test         │ │  ✓ Tushuntirishlar│
│    statistika   │ │  ✓ Tushuntirishlar    │ │  ✓ Video darslar │
│  ✗ Tushuntirish │ │  ✓ Statistika        │ │  ✓ To'liq stat.  │
│  ✗ Video darslar│ │  ✗ Video darslar     │ │  ✓ Oflayn rejim  │
│                  │ │                      │ │  ✓ Shaxsiy reja  │
│  [Boshlash]      │ │  [Tanlash →]         │ │                  │
│                  │ │                      │ │  [Tanlash →]     │
└──────────────────┘ └──────────────────────┘ └──────────────────┘

Dizayn:
  - O'rtadagi (Standart) karta: biroz kattaroq, border-primary
  - "Tavsiya" badge: absolute positioned, gradient
  - Checkmark: yashil, Xmark: kulrang
  - CTA: primary button (o'rtada), outlined (boshqalarda)
  - Hover: scale(1.02), shadow-xl
  - Animatsiya: staggered fadeInUp
```

---

## 5. KOMPONENTLAR KUTUBXONASI

### 5.1 Tugmalar (Buttons)

```
Primary:     bg-primary text-white rounded-xl px-6 py-3 font-semibold
             hover:brightness-110 active:scale-[0.98]
             shadow-md hover:shadow-lg

Secondary:   bg-transparent border-2 border-primary text-primary
             rounded-xl px-6 py-3 font-semibold
             hover:bg-primary/10

Ghost:       bg-transparent text-text-secondary
             rounded-lg px-4 py-2
             hover:bg-gray-100

Danger:      bg-error text-white rounded-xl px-6 py-3
             hover:brightness-110

Icon Button: w-10 h-10 rounded-full bg-gray-100
             flex items-center justify-center
             hover:bg-gray-200

Sizes:
  sm: px-4 py-2 text-sm
  md: px-6 py-3 text-base (default)
  lg: px-8 py-4 text-lg
```

### 5.2 Input Fields

```
Default:     w-full px-4 py-3 rounded-xl border border-border
             bg-white text-text-primary
             focus:border-primary focus:ring-2 focus:ring-primary/20
             placeholder:text-text-tertiary

With Icon:   pl-12 (chap tomonda icon)
With Error:  border-error focus:ring-error/20
             + pastda: text-sm text-error mt-1

Label:       text-sm font-medium text-text-primary mb-1.5 block
```

### 5.3 Kartalar (Cards)

```
Bento Card:  rounded-[var(--radius-xl)] bg-card border border-border-light
             shadow-bento p-6 md:p-8
             hover:shadow-bento-hover hover:-translate-y-1
             transition-all duration-300

Stat Card:   Bento Card + text-center
             Raqam: text-h1 font-heavy gradient-text
             Label: text-body-sm text-secondary

Glass Card:  bg-white/60 backdrop-blur-xl border border-white/20
             shadow-lg rounded-2xl p-6
```

### 5.4 Badge / Chip

```
Default:     inline-flex items-center px-3 py-1
             rounded-full text-caption font-medium

Variants:
  Blue:      bg-primary/10 text-primary
  Green:     bg-success/10 text-success
  Red:       bg-error/10 text-error
  Yellow:    bg-warning/10 text-warning-dark
  Gray:      bg-gray-100 text-gray-600
```

### 5.5 Progress Bar

```
Container:   w-full h-2 bg-gray-100 rounded-full overflow-hidden
Bar:         h-full rounded-full transition-all duration-500
             background: var(--gradient-primary)

With Label:  flex justify-between mb-2
             span.text-sm.font-medium
             span.text-sm.text-secondary
```

### 5.6 Modal / Dialog

```
Overlay:     fixed inset-0 bg-black/40 backdrop-blur-sm z-50
             flex items-center justify-center

Dialog:      bg-card rounded-2xl shadow-xl p-8
             max-w-md w-full mx-4
             Animatsiya: scale(0.95) → scale(1), opacity 0 → 1

Close:       absolute top-4 right-4 icon-button
```

### 5.7 Toast / Notification

```
Container:   fixed top-4 right-4 z-50

Toast:       flex items-center gap-3 px-4 py-3
             rounded-xl shadow-lg border bg-card
             Animatsiya: slide-in from right

Variants:
  Success:   border-l-4 border-l-success
  Error:     border-l-4 border-l-error
  Info:      border-l-4 border-l-primary
```

---

## 6. RESPONSIV DIZAYN

### 6.1 Breakpoints

```
sm:   640px    — Kichik planshet
md:   768px    — Planshet
lg:   1024px   — Kichik desktop
xl:   1280px   — Desktop
2xl:  1536px   — Katta ekran
```

### 6.2 Mobil Adaptatsiya (< 640px)

```
Umumiy:
  - Bento grid → 1 ustunli stack
  - Padding: 16px (yon tomonlardan)
  - Font o'lchamlari kichrayadi (clamp())
  - Touch targetlar: minimum 44x44px

Header:
  - Logo + Hamburger menu
  - Menu: slide-in panel (chapdan)

Test sahifasi:
  - Javoblar: to'liq kenglik kartalar
  - Navigator: bottom sheet (pastdan surish)
  - Swipe: chapga/o'ngga (oldingi/keyingi)

Navigatsiya:
  - Bottom tab bar (iOS uslubi)
  - Testlar | Belgilar | Statistika | Profil
  - Active: filled icon + label
```

### 6.3 Planshet Adaptatsiya (640-1024px)

```
  - Bento grid: 2 ustunli
  - Sidebar yo'q, barchasi to'liq kenglikda
  - Test sahifasi: kattaroq savol kartasi
```

### 6.4 Desktop (1024px+)

```
  - Bento grid: 4-6 ustunli (sahifaga qarab)
  - Max-width container: 1280px, mx-auto
  - Header: to'liq navigatsiya
  - Test sahifasi: sidebar navigator (ixtiyoriy)
```

---

## 7. ANIMATSIYA VA INTERAKTIVLIK

### 7.1 Sahifa O'tishlari

```javascript
// Framer Motion page transition
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};
```

### 7.2 Bento Kartalar Animatsiyasi

```javascript
// Staggered reveal on scroll
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};
```

### 7.3 Micro-Interactions

```
Javob tanlash:
  - Tap: scale(0.98) → scale(1)
  - Tanlangan: border animatsiya (draw effect)
  - To'g'ri: yashil pulse + ✓ checkmark animatsiya
  - Noto'g'ri: qizil shake + ✗ fadeIn

Progress bar:
  - To'ldirish: width transition 500ms
  - Gradient animatsiya: moving shimmer effect

Raqamlar:
  - CountUp animatsiya (2s, easeOut)
  - Intersection Observer bilan trigger

Tugmalar:
  - Hover: translateY(-2px) + shadow kuchayadi
  - Active: scale(0.97)
  - Loading: spinner animatsiya
```

### 7.4 Maxsus Effektlar

```
Confetti (natijalar sahifasida):
  - canvas-confetti kutubxonasi
  - 90%+ natija bo'lganda trigger

Streak fire:
  - CSS animatsiya bilan olov effekti
  - Particle system (ixtiyoriy)

Card flip (yo'l belgilari):
  - 3D rotateY transform
  - Oldi: belgi rasmi
  - Orqa: tushuntirish matni

Skeleton loading:
  - Pulse animatsiya
  - Gradient shimmer effect
  - Har bir komponent uchun skeleton versiya
```

---

## 8. DARK MODE

### 8.1 Avtomatik O'tish

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: var(--dark-bg-primary);
    --color-bg-card: var(--dark-bg-card);
    --color-text-primary: var(--dark-text-primary);
    /* ... */
  }
}

/* Yoki manual toggle */
[data-theme="dark"] {
  --color-bg-primary: #000000;
  --color-bg-card: #1C1C1E;
  --color-bg-card-hover: #2C2C2E;
  --color-border: #38383A;
  --color-text-primary: #F5F5F7;
  --color-text-secondary: #98989D;
}
```

### 8.2 Dark Mode Bento Kartalar

```
  - Fon: #1C1C1E (subtle border: #38383A)
  - Hover: #2C2C2E
  - Gradient kartalar: to'qroq versiyalar
  - Shadow: rings instead of shadows
  - Aksent ranglar: biroz yorqinroq
```

---

## 9. ACCESSIBILITY (QULAYLIK)

```
Umumiy:
  - Barcha interaktiv elementlar: focus:ring-2 focus:ring-primary
  - Keyboard navigation: Tab, Enter, Space, Arrow keys
  - ARIA labels barcha tugmalar va ikonkalar uchun
  - Contrast ratio: minimum 4.5:1 (WCAG AA)
  - Screen reader uchun: sr-only class yashirin matnlar

Test sahifasi:
  - Keyboard shortcuts: 1,2,3,4 javob tanlash
  - ←/→ navigatsiya
  - Timer: aria-live="polite" yangilanishlar

Rang:
  - To'g'ri/noto'g'ri: rang + icon + matn (faqat rangga tayanmaslik)
  - Focus visible: aniq ko'rinadigan outline
```

---

## 10. PERFORMANCE OPTIMIZATSIYA

```
Rasmlar:
  - Next/Image bilan lazy loading
  - WebP format
  - Responsive srcset
  - Blur placeholder (LQIP)

Kod:
  - Route-based code splitting
  - Dynamic import (test engine, charts)
  - Debounced search
  - Virtual scrolling (katta ro'yxatlar uchun)

Caching:
  - SWR / React Query
  - Service Worker (offline support)
  - Static generation (SSG) statik sahifalar uchun

Metrikalar maqsadlari:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1
  - Lighthouse: 90+
```

---

## 11. FAYL TUZILMASI

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Bosh sahifa
│   ├── tests/
│   │   ├── page.tsx        # Testlar katalogi
│   │   └── [id]/
│   │       └── page.tsx    # Test yechish
│   ├── results/
│   │   └── [id]/page.tsx   # Natijalar
│   ├── progress/
│   │   └── page.tsx        # Statistika
│   ├── signs/
│   │   └── page.tsx        # Yo'l belgilari
│   ├── pricing/
│   │   └── page.tsx        # Narxlar
│   └── auth/
│       ├── login/page.tsx
│       └── register/page.tsx
├── components/
│   ├── ui/                 # Bazaviy komponentlar
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── BentoCard.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Progress.tsx
│   │   ├── Modal.tsx
│   │   └── Toast.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── Sidebar.tsx
│   ├── test/
│   │   ├── QuizEngine.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerOption.tsx
│   │   ├── Timer.tsx
│   │   ├── QuestionNav.tsx
│   │   └── Explanation.tsx
│   ├── dashboard/
│   │   ├── StatsGrid.tsx
│   │   ├── ProgressChart.tsx
│   │   ├── StreakCounter.tsx
│   │   ├── WeakTopics.tsx
│   │   └── ActivityHeatmap.tsx
│   └── home/
│       ├── HeroSection.tsx
│       ├── FeaturesGrid.tsx
│       ├── StatsCounter.tsx
│       ├── Testimonials.tsx
│       └── HowItWorks.tsx
├── hooks/
│   ├── useQuiz.ts
│   ├── useTimer.ts
│   ├── useProgress.ts
│   └── useAuth.ts
├── stores/
│   ├── quizStore.ts
│   ├── userStore.ts
│   └── progressStore.ts
├── lib/
│   ├── supabase.ts
│   ├── utils.ts
│   └── constants.ts
├── styles/
│   ├── globals.css         # CSS variables + base
│   └── bento.css           # Bento grid utilities
└── types/
    ├── quiz.ts
    ├── user.ts
    └── progress.ts
```

---

## 12. MA'LUMOTLAR MODELI

### 12.1 Asosiy Jadvallar

```sql
-- Foydalanuvchilar
users (
  id, email, phone, full_name, avatar_url,
  plan_type, streak_count, total_xp,
  created_at, last_active_at
)

-- Test kategoriyalari
categories (
  id, name_uz, name_ru, icon, color,
  description, order_index
)

-- Testlar
tests (
  id, category_id, title_uz, title_ru,
  difficulty, question_count, time_limit_minutes,
  is_exam_simulation, order_index
)

-- Savollar
questions (
  id, test_id, category_id, text_uz, text_ru,
  image_url, explanation_uz, explanation_ru,
  difficulty, related_law_article,
  order_index
)

-- Javob variantlari
options (
  id, question_id, text_uz, text_ru,
  is_correct, order_index
)

-- Foydalanuvchi javoblari
user_answers (
  id, user_id, question_id, test_id,
  selected_option_id, is_correct,
  time_spent_seconds, answered_at
)

-- Test natijalari
test_results (
  id, user_id, test_id, score,
  total_questions, correct_count,
  time_spent_seconds, completed_at
)

-- Yo'l belgilari
road_signs (
  id, name_uz, name_ru, category,
  image_url, description_uz, description_ru,
  related_law_article
)
```

---

## 13. CLAUDE PROMPT (DIZAYN UCHUN)

Quyidagi prompt'ni Claude'ga berib, har bir sahifaning React kodini generatsiya qilish mumkin:

```
Sen professional frontend dizayner va React dasturchisan.
Menga [SAHIFA_NOMI] sahifasini yaratib ber.

DIZAYN QOIDALARI:
1. Bento Grid (Apple-style) layout ishlatilsin
2. Ranglar: ko'k asosiy (#0A84FF), yashil muvaffaqiyat (#30D158),
   qizil xato (#FF453A)
3. Shriftlar: 'Outfit' display, 'DM Sans' body
4. Burchaklar: rounded-xl (20px)
5. Soyalar: yengil, hover'da kuchayadi
6. Animatsiyalar: Framer Motion, staggered fadeInUp
7. Responsiv: mobile-first, 1/2/4 ustunli grid
8. Dark mode qo'llab-quvvatlash
9. Tailwind CSS ishlatilsin
10. O'zbek tilida barcha matnlar

SAHIFA TARKIBI:
[Sahifa tarkibini yozing]

Faqat React (JSX) kod qaytarilsin, import'lar bilan.
Tailwind CSS class'lari ishlatilsin.
Framer Motion animatsiyalar qo'shilsin.
```

---

> **Eslatma:** Bu dizayn spetsifikatsiyasi to'liq referens hujjat sifatida xizmat qiladi. Har bir sahifani alohida Claude'ga berib, step-by-step React komponentlarini generatsiya qilish tavsiya etiladi.
