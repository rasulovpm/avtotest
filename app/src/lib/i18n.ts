export type Lang = "uz" | "ru" | "cy";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
  { code: "cy", label: "Ўзбекча", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" }
];

export const dict = {
  uz: {
    common: {
      brand: "AvtoTest.uz",
      tagline: "Online avto imtihon platformasi",
      start: "Boshlash",
      continue: "Davom etish",
      back: "Orqaga",
      next: "Keyingi",
      previous: "Oldingi",
      submit: "Yuborish",
      cancel: "Bekor qilish",
      save: "Saqlash",
      delete: "O'chirish",
      edit: "Tahrirlash",
      close: "Yopish",
      loading: "Yuklanmoqda...",
      search: "Qidirish",
      filter: "Filtr",
      all: "Barchasi",
      logout: "Chiqish",
      profile: "Profil",
      settings: "Sozlamalar",
      yes: "Ha",
      no: "Yo'q",
      minutes: "daqiqa",
      seconds: "soniya",
      questions: "savol",
      correct: "to'g'ri",
      incorrect: "noto'g'ri"
    },
    nav: {
      home: "Bosh sahifa",
      tests: "Testlar",
      signs: "Yo'l belgilari",
      pricing: "Narxlar",
      progress: "Statistika",
      login: "Kirish",
      register: "Ro'yxatdan o'tish"
    },
    landing: {
      heroTitle: "O'zbekistondagi #1 Avto Imtihon Platformasi",
      heroSub: "1000+ test savollari bilan haydovchilik guvohnomasi imtihoniga tayyorlaning",
      heroCta: "Bepul boshlash",
      heroCta2: "Namuna ko'rish",
      check1: "1000+ savollar",
      check2: "Real imtihon",
      check3: "Tushuntirishlar",
      featuresTitle: "Sizga kerakli hamma narsa",
      stat1Label: "Savollar bazasi",
      stat2Label: "Foydalanuvchilar",
      stat3Label: "Muvaffaqiyat",
      stat4Label: "Online qo'llab-quvvatlash",
      howTitle: "Qanday ishlaydi?",
      step1: "Ro'yxatdan o'ting",
      step1Desc: "Telefon raqami orqali kiring",
      step2: "Testni yeching",
      step2Desc: "Kategoriya tanlang va boshlang",
      step3: "Imtihonga tayyor",
      step3Desc: "Natijalar va tahlil oling",
      ctaTitle: "Bugun mashq qilishni boshlang",
      ctaSub: "Bepul rejada 100 ta test bor"
    },
    tests: {
      title: "Testlar Katalogi",
      sub: "Kategoriya va qiyinlik bo'yicha tanlang",
      filterAll: "Barchasi",
      filterDifficulty: "Qiyinlik",
      examTitle: "Haqiqiy imtihon simulyatsiyasi",
      examSub: "20 ta savol, 25 daqiqa, 18 ta to'g'ri javob — muvaffaqiyat!",
      examCta: "Imtihonni boshlash",
      questions: "savol",
      timeLimit: "vaqt chegarasi",
      startTest: "Boshlash"
    },
    quiz: {
      question: "Savol",
      ofTotal: "/",
      submit: "Tugatish",
      hint: "Tushuntirish",
      correctAnswer: "To'g'ri javob",
      yourAnswer: "Sizning javobingiz",
      timeLeft: "Qolgan vaqt",
      confirmExit: "Testni tark etmoqchimisiz?",
      questionMap: "Savollar xaritasi"
    },
    results: {
      title: "Tabriklaymiz!",
      titleFail: "Davom eting",
      passed: "Muvaffaqiyatli o'tdingiz",
      failed: "Hali biroz mashq kerak",
      score: "Natija",
      timeSpent: "Sarflangan vaqt",
      avgPerQuestion: "Bir savolga o'rtacha",
      retry: "Qayta yechish",
      goHome: "Bosh sahifa",
      mistakes: "Xato javoblar",
      categoryStats: "Kategoriya bo'yicha"
    },
    auth: {
      loginTitle: "Hisobingizga kiring",
      loginSub: "Telefon raqami orqali",
      phone: "Telefon raqami",
      phonePlaceholder: "+998 90 123 45 67",
      otpTitle: "Tasdiqlash kodi",
      otpSub: "Telegram'da yuborilgan 6 xonali kodni kiriting",
      otpHint: "Telegram bot @{bot} dan keladi. Hozircha test rejimda kod konsolda ko'rsatiladi.",
      sendCode: "Kod yuborish",
      verify: "Tasdiqlash",
      resend: "Qayta yuborish",
      noAccount: "Hisobingiz yo'qmi?",
      register: "Ro'yxatdan o'tish",
      orWith: "yoki",
      tgConnect: "Telegram orqali ulanish",
      registerTitle: "Ro'yxatdan o'tish",
      registerSub: "Tezkor va bepul",
      fullName: "Ism familiya",
      acceptTerms: "Foydalanish shartlariga roziman",
      success: "Muvaffaqiyatli!",
      invalidPhone: "Telefon raqami noto'g'ri",
      invalidOtp: "Kod noto'g'ri yoki muddati o'tgan"
    },
    pricing: {
      title: "Narxlar",
      sub: "O'zingizga mos rejani tanlang",
      free: "Bepul",
      perDays: "kunlik",
      choose: "Tanlash",
      current: "Joriy reja",
      features: {
        all_tests: "Barcha testlar",
        explanations: "Tushuntirishlar",
        exam_simulation: "Imtihon simulyatsiyasi",
        stats: "Batafsil statistika",
        weak_topics: "Zaif mavzular tahlili",
        priority_support: "Tezkor qo'llab-quvvatlash"
      },
      payInfo: "To'lov tasdiqlangach, Premium reja avtomatik yoqiladi",
      payClick: "Click orqali to'lash",
      manualPay: "Karta orqali to'lash",
      manualNote: "Ariza yuborildi. Admin tasdiqlagandan so'ng faollashadi."
    },
    admin: {
      dashboard: "Dashboard",
      questions: "Savollar",
      tests: "Testlar",
      users: "Foydalanuvchilar",
      payments: "To'lovlar",
      signs: "Yo'l belgilari",
      settings: "Sozlamalar",
      newQuestion: "Yangi savol",
      activate: "Faollashtirish",
      reject: "Rad etish",
      pending: "Kutilmoqda",
      approved: "Tasdiqlangan",
      rejected: "Rad etilgan"
    },
    progress: {
      title: "Mening taraqqiyotim",
      streak: "Ketma-ket kunlar",
      level: "Daraja",
      totalTests: "Yechilgan testlar",
      avgScore: "O'rtacha natija",
      weakTopics: "Zaif tomonlar",
      noData: "Hali ma'lumot yo'q. Birinchi testni yeching!"
    },
    signs: {
      title: "Yo'l belgilari kutubxonasi",
      sub: "Barcha kategoriyalar bo'yicha"
    }
  },
  ru: {
    common: {
      brand: "AvtoTest.uz",
      tagline: "Онлайн платформа автоэкзамена",
      start: "Начать",
      continue: "Продолжить",
      back: "Назад",
      next: "Далее",
      previous: "Предыдущий",
      submit: "Отправить",
      cancel: "Отмена",
      save: "Сохранить",
      delete: "Удалить",
      edit: "Изменить",
      close: "Закрыть",
      loading: "Загрузка...",
      search: "Поиск",
      filter: "Фильтр",
      all: "Все",
      logout: "Выйти",
      profile: "Профиль",
      settings: "Настройки",
      yes: "Да",
      no: "Нет",
      minutes: "минут",
      seconds: "секунд",
      questions: "вопросов",
      correct: "правильно",
      incorrect: "неправильно"
    },
    nav: {
      home: "Главная",
      tests: "Тесты",
      signs: "Дорожные знаки",
      pricing: "Тарифы",
      progress: "Статистика",
      login: "Войти",
      register: "Регистрация"
    },
    landing: {
      heroTitle: "Платформа №1 для автоэкзамена в Узбекистане",
      heroSub: "Подготовьтесь к экзамену на права с 1000+ тестовыми вопросами",
      heroCta: "Начать бесплатно",
      heroCta2: "Посмотреть пример",
      check1: "1000+ вопросов",
      check2: "Реальный экзамен",
      check3: "Объяснения",
      featuresTitle: "Всё что вам нужно",
      stat1Label: "База вопросов",
      stat2Label: "Пользователи",
      stat3Label: "Успех",
      stat4Label: "Поддержка онлайн",
      howTitle: "Как это работает?",
      step1: "Зарегистрируйтесь",
      step1Desc: "Войдите по номеру телефона",
      step2: "Решайте тесты",
      step2Desc: "Выберите категорию и начните",
      step3: "Готовы к экзамену",
      step3Desc: "Получите результаты и анализ",
      ctaTitle: "Начните практиковаться сегодня",
      ctaSub: "В бесплатном плане 100 тестов"
    },
    tests: {
      title: "Каталог тестов",
      sub: "Выберите по категории и сложности",
      filterAll: "Все",
      filterDifficulty: "Сложность",
      examTitle: "Симуляция реального экзамена",
      examSub: "20 вопросов, 25 минут, 18 правильных — успех!",
      examCta: "Начать экзамен",
      questions: "вопросов",
      timeLimit: "время",
      startTest: "Начать"
    },
    quiz: {
      question: "Вопрос",
      ofTotal: "/",
      submit: "Завершить",
      hint: "Объяснение",
      correctAnswer: "Правильный ответ",
      yourAnswer: "Ваш ответ",
      timeLeft: "Осталось",
      confirmExit: "Покинуть тест?",
      questionMap: "Карта вопросов"
    },
    results: {
      title: "Поздравляем!",
      titleFail: "Продолжайте",
      passed: "Вы успешно прошли",
      failed: "Нужно ещё немного практики",
      score: "Результат",
      timeSpent: "Затрачено времени",
      avgPerQuestion: "Среднее на вопрос",
      retry: "Пройти заново",
      goHome: "Главная",
      mistakes: "Ошибки",
      categoryStats: "По категориям"
    },
    auth: {
      loginTitle: "Войдите в аккаунт",
      loginSub: "По номеру телефона",
      phone: "Номер телефона",
      phonePlaceholder: "+998 90 123 45 67",
      otpTitle: "Код подтверждения",
      otpSub: "Введите 6-значный код из Telegram",
      otpHint: "Код придёт от @{bot}. Сейчас в тест-режиме код в консоли.",
      sendCode: "Отправить код",
      verify: "Подтвердить",
      resend: "Отправить повторно",
      noAccount: "Нет аккаунта?",
      register: "Регистрация",
      orWith: "или",
      tgConnect: "Через Telegram",
      registerTitle: "Регистрация",
      registerSub: "Быстро и бесплатно",
      fullName: "Имя и фамилия",
      acceptTerms: "Согласен с условиями",
      success: "Успешно!",
      invalidPhone: "Неверный номер",
      invalidOtp: "Неверный код или истёк"
    },
    pricing: {
      title: "Тарифы",
      sub: "Выберите подходящий план",
      free: "Бесплатно",
      perDays: "дней",
      choose: "Выбрать",
      current: "Текущий план",
      features: {
        all_tests: "Все тесты",
        explanations: "Объяснения",
        exam_simulation: "Симуляция экзамена",
        stats: "Подробная статистика",
        weak_topics: "Анализ слабых тем",
        priority_support: "Приоритетная поддержка"
      },
      payInfo: "После подтверждения Premium активируется автоматически",
      payClick: "Оплатить через Click",
      manualPay: "Оплатить картой",
      manualNote: "Заявка отправлена. Активируется после подтверждения админом."
    },
    admin: {
      dashboard: "Панель",
      questions: "Вопросы",
      tests: "Тесты",
      users: "Пользователи",
      payments: "Платежи",
      signs: "Дорожные знаки",
      settings: "Настройки",
      newQuestion: "Новый вопрос",
      activate: "Активировать",
      reject: "Отклонить",
      pending: "Ожидает",
      approved: "Подтверждено",
      rejected: "Отклонено"
    },
    progress: {
      title: "Мой прогресс",
      streak: "Подряд дней",
      level: "Уровень",
      totalTests: "Решено тестов",
      avgScore: "Средний балл",
      weakTopics: "Слабые темы",
      noData: "Пока нет данных. Решите первый тест!"
    },
    signs: {
      title: "Библиотека дорожных знаков",
      sub: "По всем категориям"
    }
  },
  cy: {
    common: {
      brand: "AvtoTest.uz",
      tagline: "Онлайн авто имтиҳон платформаси",
      start: "Бошлаш",
      continue: "Давом этиш",
      back: "Орқага",
      next: "Кейинги",
      previous: "Олдинги",
      submit: "Юбориш",
      cancel: "Бекор қилиш",
      save: "Сақлаш",
      delete: "Ўчириш",
      edit: "Таҳрирлаш",
      close: "Ёпиш",
      loading: "Юкланмоқда...",
      search: "Қидириш",
      filter: "Фильтр",
      all: "Барчаси",
      logout: "Чиқиш",
      profile: "Профил",
      settings: "Созламалар",
      yes: "Ҳа",
      no: "Йўқ",
      minutes: "дақиқа",
      seconds: "сония",
      questions: "савол",
      correct: "тўғри",
      incorrect: "нотўғри"
    },
    nav: {
      home: "Бош саҳифа",
      tests: "Тестлар",
      signs: "Йўл белгилари",
      pricing: "Нархлар",
      progress: "Статистика",
      login: "Кириш",
      register: "Рўйхатдан ўтиш"
    },
    landing: {
      heroTitle: "Ўзбекистондаги #1 Авто Имтиҳон Платформаси",
      heroSub: "1000+ тест саволлари билан ҳайдовчилик гувоҳномаси имтиҳонига тайёрланинг",
      heroCta: "Бепул бошлаш",
      heroCta2: "Намуна кўриш",
      check1: "1000+ саволлар",
      check2: "Реал имтиҳон",
      check3: "Тушунтиришлар",
      featuresTitle: "Сизга керакли ҳамма нарса",
      stat1Label: "Саволлар базаси",
      stat2Label: "Фойдаланувчилар",
      stat3Label: "Муваффақият",
      stat4Label: "Онлайн қўллаб-қувватлаш",
      howTitle: "Қандай ишлайди?",
      step1: "Рўйхатдан ўтинг",
      step1Desc: "Телефон рақами орқали киринг",
      step2: "Тестни ечинг",
      step2Desc: "Категория танланг ва бошланг",
      step3: "Имтиҳонга тайёр",
      step3Desc: "Натижалар ва таҳлил олинг",
      ctaTitle: "Бугун машқ қилишни бошланг",
      ctaSub: "Бепул режада 100 та тест бор"
    },
    tests: {
      title: "Тестлар Каталоги",
      sub: "Категория ва қийинлик бўйича танланг",
      filterAll: "Барчаси",
      filterDifficulty: "Қийинлик",
      examTitle: "Ҳақиқий имтиҳон симуляцияси",
      examSub: "20 та савол, 25 дақиқа, 18 та тўғри жавоб — муваффақият!",
      examCta: "Имтиҳонни бошлаш",
      questions: "савол",
      timeLimit: "вақт чегараси",
      startTest: "Бошлаш"
    },
    quiz: {
      question: "Савол",
      ofTotal: "/",
      submit: "Тугатиш",
      hint: "Тушунтириш",
      correctAnswer: "Тўғри жавоб",
      yourAnswer: "Сизнинг жавобингиз",
      timeLeft: "Қолган вақт",
      confirmExit: "Тестни тарк этмоқчимисиз?",
      questionMap: "Саволлар харитаси"
    },
    results: {
      title: "Табриклаймиз!",
      titleFail: "Давом этинг",
      passed: "Муваффақиятли ўтдингиз",
      failed: "Ҳали бироз машқ керак",
      score: "Натижа",
      timeSpent: "Сарфланган вақт",
      avgPerQuestion: "Бир саволга ўртача",
      retry: "Қайта ечиш",
      goHome: "Бош саҳифа",
      mistakes: "Хато жавоблар",
      categoryStats: "Категория бўйича"
    },
    auth: {
      loginTitle: "Ҳисобингизга киринг",
      loginSub: "Телефон рақами орқали",
      phone: "Телефон рақами",
      phonePlaceholder: "+998 90 123 45 67",
      otpTitle: "Тасдиқлаш коди",
      otpSub: "Telegram'да юборилган 6 хонали кодни киритинг",
      otpHint: "Telegram бот @{bot} дан келади. Ҳозирча тест режимда код консолда кўрсатилади.",
      sendCode: "Код юбориш",
      verify: "Тасдиқлаш",
      resend: "Қайта юбориш",
      noAccount: "Ҳисобингиз йўқми?",
      register: "Рўйхатдан ўтиш",
      orWith: "ёки",
      tgConnect: "Telegram орқали уланиш",
      registerTitle: "Рўйхатдан ўтиш",
      registerSub: "Тезкор ва бепул",
      fullName: "Исм фамилия",
      acceptTerms: "Фойдаланиш шартларига розиман",
      success: "Муваффақиятли!",
      invalidPhone: "Телефон рақами нотўғри",
      invalidOtp: "Код нотўғри ёки муддати ўтган"
    },
    pricing: {
      title: "Нархлар",
      sub: "Ўзингизга мос режани танланг",
      free: "Бепул",
      perDays: "кунлик",
      choose: "Танлаш",
      current: "Жорий режа",
      features: {
        all_tests: "Барча тестлар",
        explanations: "Тушунтиришлар",
        exam_simulation: "Имтиҳон симуляцияси",
        stats: "Батафсил статистика",
        weak_topics: "Заиф мавзулар таҳлили",
        priority_support: "Тезкор қўллаб-қувватлаш"
      },
      payInfo: "Тўлов тасдиқлангач, Premium режа автоматик ёқилади",
      payClick: "Click орқали тўлаш",
      manualPay: "Карта орқали тўлаш",
      manualNote: "Ариза юборилди. Админ тасдиқлагандан сўнг фаоллашади."
    },
    admin: {
      dashboard: "Дашборд",
      questions: "Саволлар",
      tests: "Тестлар",
      users: "Фойдаланувчилар",
      payments: "Тўловлар",
      signs: "Йўл белгилари",
      settings: "Созламалар",
      newQuestion: "Янги савол",
      activate: "Фаоллаштириш",
      reject: "Рад этиш",
      pending: "Кутилмоқда",
      approved: "Тасдиқланган",
      rejected: "Рад этилган"
    },
    progress: {
      title: "Менинг тараққиётим",
      streak: "Кетма-кет кунлар",
      level: "Даража",
      totalTests: "Ечилган тестлар",
      avgScore: "Ўртача натижа",
      weakTopics: "Заиф томонлар",
      noData: "Ҳали маълумот йўқ. Биринчи тестни ечинг!"
    },
    signs: {
      title: "Йўл белгилари кутубхонаси",
      sub: "Барча категориялар бўйича"
    }
  }
};

export type Dict = (typeof dict)["uz"];

export function pickLocalized<T extends { textUz?: string | null; textRu?: string | null; textCy?: string | null }>(
  obj: T,
  lang: Lang
): string {
  const map: Record<Lang, keyof T> = {
    uz: "textUz" as keyof T,
    ru: "textRu" as keyof T,
    cy: "textCy" as keyof T
  };
  return ((obj[map[lang]] as unknown as string) || (obj.textUz as unknown as string) || "") as string;
}

export function pickName<T extends { nameUz?: string | null; nameRu?: string | null; nameCy?: string | null }>(
  obj: T,
  lang: Lang
): string {
  const map: Record<Lang, keyof T> = {
    uz: "nameUz" as keyof T,
    ru: "nameRu" as keyof T,
    cy: "nameCy" as keyof T
  };
  return ((obj[map[lang]] as unknown as string) || (obj.nameUz as unknown as string) || "") as string;
}

export function pickTitle<T extends { titleUz?: string | null; titleRu?: string | null; titleCy?: string | null }>(
  obj: T,
  lang: Lang
): string {
  const map: Record<Lang, keyof T> = {
    uz: "titleUz" as keyof T,
    ru: "titleRu" as keyof T,
    cy: "titleCy" as keyof T
  };
  return ((obj[map[lang]] as unknown as string) || (obj.titleUz as unknown as string) || "") as string;
}
