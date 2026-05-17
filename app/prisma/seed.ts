import { PrismaClient } from "@prisma/client";
import { EXTRA_QUESTIONS } from "./extra-questions";

const prisma = new PrismaClient();

// SQLite enum'siz — string konstantalar
const Difficulty = { EASY: "EASY", MEDIUM: "MEDIUM", HARD: "HARD" } as const;
const SignCategory = {
  WARNING: "WARNING",
  PROHIBITORY: "PROHIBITORY",
  MANDATORY: "MANDATORY",
  INFORMATION: "INFORMATION",
  PRIORITY: "PRIORITY",
  ADDITIONAL: "ADDITIONAL"
} as const;

const CATEGORIES = [
  {
    slug: "yhq",
    nameUz: "Yo'l harakati qoidalari",
    nameRu: "Правила дорожного движения",
    nameCy: "Йўл ҳаракати қоидалари",
    icon: "ScrollText",
    color: "#0A84FF",
    orderIndex: 1
  },
  {
    slug: "signs",
    nameUz: "Yo'l belgilari",
    nameRu: "Дорожные знаки",
    nameCy: "Йўл белгилари",
    icon: "Octagon",
    color: "#30D158",
    orderIndex: 2
  },
  {
    slug: "tech",
    nameUz: "Texnik ko'rik",
    nameRu: "Технический осмотр",
    nameCy: "Техник кўрик",
    icon: "Wrench",
    color: "#FFD60A",
    orderIndex: 3
  },
  {
    slug: "medical",
    nameUz: "Birinchi yordam",
    nameRu: "Первая помощь",
    nameCy: "Биринчи ёрдам",
    icon: "HeartPulse",
    color: "#FF453A",
    orderIndex: 4
  }
];

// 20 ta test savol — 3 tilda
const QUESTIONS = [
  {
    cat: "yhq",
    textUz: "Shahar ichida engil avtomobil uchun maksimal tezlik chegarasi qancha?",
    textRu: "Какова максимальная скорость для легкового автомобиля в городе?",
    textCy: "Шаҳар ичида енгил автомобил учун максимал тезлик чегараси қанча?",
    explanationUz: "YHQ 10-bo'limiga ko'ra, aholi punktlarida maksimal tezlik 70 km/soat.",
    explanationRu: "По разделу 10 ПДД, в населенных пунктах максимальная скорость 70 км/ч.",
    explanationCy: "ЙҲҚ 10-бўлимига кўра, аҳоли пунктларида максимал тезлик 70 км/соат.",
    options: [
      { uz: "60 km/soat", ru: "60 км/ч", cy: "60 км/соат", ok: false },
      { uz: "70 km/soat", ru: "70 км/ч", cy: "70 км/соат", ok: true },
      { uz: "80 km/soat", ru: "80 км/ч", cy: "80 км/соат", ok: false },
      { uz: "90 km/soat", ru: "90 км/ч", cy: "90 км/соат", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Chorrahaga kirib qolgan haydovchi svetofor qizil rangga o'zgarganida nima qilishi kerak?",
    textRu: "Что должен сделать водитель на перекрёстке, если включился красный сигнал?",
    textCy: "Чорраҳага кириб қолган ҳайдовчи светофор қизил рангга ўзгарганида нима қилиши керак?",
    explanationUz: "Chorrahaga kirib bo'lgan haydovchi harakatni davom ettirib, undan tezroq chiqib ketishi kerak.",
    explanationRu: "Водитель, въехавший на перекрёсток, должен продолжить движение и быстрее освободить его.",
    explanationCy: "Чорраҳага кириб бўлган ҳайдовчи ҳаракатни давом эттириб, ундан тезроқ чиқиб кетиши керак.",
    options: [
      { uz: "Chorraha o'rtasida to'xtab qolish", ru: "Остановиться посреди перекрёстка", cy: "Чорраҳа ўртасида тўхтаб қолиш", ok: false },
      { uz: "Harakatni davom ettirib chorrahadan chiqib ketish", ru: "Продолжить движение и освободить перекрёсток", cy: "Ҳаракатни давом эттириб чорраҳадан чиқиб кетиш", ok: true },
      { uz: "Orqaga qaytish", ru: "Сдать назад", cy: "Орқага қайтиш", ok: false },
      { uz: "Signal berish", ru: "Подать звуковой сигнал", cy: "Сигнал бериш", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Tunda yo'lda turgan transport vositasini qanday belgilash kerak?",
    textRu: "Как обозначить транспортное средство, стоящее на дороге ночью?",
    textCy: "Тунда йўлда турган транспорт воситасини қандай белгилаш керак?",
    explanationUz: "Tunda yoki yomon ko'rinishda gabarit chiroqlar yoqilishi kerak.",
    explanationRu: "Ночью или при плохой видимости должны быть включены габаритные огни.",
    explanationCy: "Тунда ёки ёмон кўринишда габарит чироқлар ёқилиши керак.",
    options: [
      { uz: "Avariya signali yoqiladi", ru: "Включается аварийный сигнал", cy: "Авария сигнали ёқилади", ok: false },
      { uz: "Gabarit chiroqlar yoqiladi", ru: "Включаются габаритные огни", cy: "Габарит чироқлар ёқилади", ok: true },
      { uz: "Hech narsa qilinmaydi", ru: "Ничего не делается", cy: "Ҳеч нарса қилинмайди", ok: false },
      { uz: "Faqat orqa chiroq yoqiladi", ru: "Включается только задний свет", cy: "Фақат орқа чироқ ёқилади", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Quyi tezlikda harakatlanayotgan transport vositasidan qanday o'zib o'tiladi?",
    textRu: "Как обгонять транспорт, движущийся с малой скоростью?",
    textCy: "Қуйи тезликда ҳаракатланаётган транспорт воситасидан қандай ўзиб ўтилади?",
    explanationUz: "Faqat chap tomondan, qarama-qarshi yo'l bo'sh va ko'rinish yetarli bo'lganida.",
    explanationRu: "Только слева, при свободной встречной полосе и достаточной видимости.",
    explanationCy: "Фақат чап томондан, қарама-қарши йўл бўш ва кўриниш етарли бўлганида.",
    options: [
      { uz: "O'ng tomondan", ru: "Справа", cy: "Ўнг томондан", ok: false },
      { uz: "Chap tomondan, qarama-qarshi yo'l bo'sh bo'lsa", ru: "Слева, если встречная полоса свободна", cy: "Чап томондан, қарама-қарши йўл бўш бўлса", ok: true },
      { uz: "Trotuar bo'ylab", ru: "По тротуару", cy: "Тротуар бўйлаб", ok: false },
      { uz: "Belgilanmagan joyda", ru: "В неустановленном месте", cy: "Белгиланмаган жойда", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Piyodalar o'tish joyida haydovchining majburiyati nima?",
    textRu: "Какова обязанность водителя на пешеходном переходе?",
    textCy: "Пиёдалар ўтиш жойида ҳайдовчининг мажбурияти нима?",
    explanationUz: "Belgilangan piyodalar o'tish joyida piyodalarga yo'l berish shart.",
    explanationRu: "На обозначенном пешеходном переходе обязательно уступить дорогу пешеходам.",
    explanationCy: "Белгиланган пиёдалар ўтиш жойида пиёдаларга йўл бериш шарт.",
    options: [
      { uz: "Tezlikni oshirish", ru: "Увеличить скорость", cy: "Тезликни ошириш", ok: false },
      { uz: "Signal berish", ru: "Подать сигнал", cy: "Сигнал бериш", ok: false },
      { uz: "Piyodalarga yo'l berish", ru: "Уступить дорогу пешеходам", cy: "Пиёдаларга йўл бериш", ok: true },
      { uz: "To'xtamasdan o'tib ketish", ru: "Проехать без остановки", cy: "Тўхтамасдан ўтиб кетиш", ok: false }
    ]
  },
  {
    cat: "signs",
    textUz: "Uchburchak shaklidagi qizil ramkali belgi qanday belgi hisoblanadi?",
    textRu: "Знак треугольной формы с красной каймой относится к какой группе?",
    textCy: "Учбурчак шаклидаги қизил рамкали белги қандай белги ҳисобланади?",
    explanationUz: "Uchburchak qizil ramkali belgilar — ogohlantiruvchi belgilar guruhiga kiradi.",
    explanationRu: "Треугольные знаки с красной каймой — предупреждающие знаки.",
    explanationCy: "Учбурчак қизил рамкали белгилар — огоҳлантирувчи белгилар гуруҳига киради.",
    options: [
      { uz: "Taqiqlovchi", ru: "Запрещающий", cy: "Тақиқловчи", ok: false },
      { uz: "Ogohlantiruvchi", ru: "Предупреждающий", cy: "Огоҳлантирувчи", ok: true },
      { uz: "Buyuruvchi", ru: "Предписывающий", cy: "Буюрувчи", ok: false },
      { uz: "Axborot beruvchi", ru: "Информационный", cy: "Ахборот берувчи", ok: false }
    ]
  },
  {
    cat: "signs",
    textUz: "Doiraviy qizil ramkali belgi qanday vazifani bajaradi?",
    textRu: "Какую функцию выполняет круглый знак с красной каймой?",
    textCy: "Доиравий қизил рамкали белги қандай вазифани бажаради?",
    explanationUz: "Doiraviy qizil ramkali belgilar — taqiqlovchi belgilar.",
    explanationRu: "Круглые знаки с красной каймой — запрещающие.",
    explanationCy: "Доиравий қизил рамкали белгилар — тақиқловчи белгилар.",
    options: [
      { uz: "Taqiqlaydi", ru: "Запрещает", cy: "Тақиқлайди", ok: true },
      { uz: "Ogohlantiradi", ru: "Предупреждает", cy: "Огоҳлантиради", ok: false },
      { uz: "Yo'nalish ko'rsatadi", ru: "Указывает направление", cy: "Йўналиш кўрсатади", ok: false },
      { uz: "Servis joylarini ko'rsatadi", ru: "Указывает места сервиса", cy: "Сервис жойларини кўрсатади", ok: false }
    ]
  },
  {
    cat: "signs",
    textUz: "\"STOP\" belgisi qanday harakat talab qiladi?",
    textRu: "Что требует знак \"STOP\"?",
    textCy: "\"STOP\" белгиси қандай ҳаракат талаб қилади?",
    explanationUz: "\"STOP\" belgisi oldida to'liq to'xtab, keyin yo'l ustunligini berish shart.",
    explanationRu: "Перед знаком \"STOP\" обязательна полная остановка и уступка дороги.",
    explanationCy: "\"STOP\" белгиси олдида тўлиқ тўхтаб, кейин йўл устунлигини бериш шарт.",
    options: [
      { uz: "Tezlikni kamaytirish", ru: "Снизить скорость", cy: "Тезликни камайтириш", ok: false },
      { uz: "To'liq to'xtash va yo'l berish", ru: "Полная остановка и уступка дороги", cy: "Тўлиқ тўхташ ва йўл бериш", ok: true },
      { uz: "Signal berish", ru: "Подать сигнал", cy: "Сигнал бериш", ok: false },
      { uz: "Hech narsa qilmaslik", ru: "Ничего не делать", cy: "Ҳеч нарса қилмаслик", ok: false }
    ]
  },
  {
    cat: "signs",
    textUz: "Ko'k fonli to'rtburchak belgi qanday belgi hisoblanadi?",
    textRu: "Прямоугольный знак на синем фоне — какой это знак?",
    textCy: "Кўк фонли тўртбурчак белги қандай белги ҳисобланади?",
    explanationUz: "Ko'k fonli to'rtburchak belgilar — axborot beruvchi belgilar.",
    explanationRu: "Прямоугольные синие знаки — информационные.",
    explanationCy: "Кўк фонли тўртбурчак белгилар — ахборот берувчи белгилар.",
    options: [
      { uz: "Ogohlantiruvchi", ru: "Предупреждающий", cy: "Огоҳлантирувчи", ok: false },
      { uz: "Taqiqlovchi", ru: "Запрещающий", cy: "Тақиқловчи", ok: false },
      { uz: "Axborot beruvchi", ru: "Информационный", cy: "Ахборот берувчи", ok: true },
      { uz: "Buyuruvchi", ru: "Предписывающий", cy: "Буюрувчи", ok: false }
    ]
  },
  {
    cat: "signs",
    textUz: "Ko'k fonli doiraviy belgi nimani bildiradi?",
    textRu: "Что означает круглый знак на синем фоне?",
    textCy: "Кўк фонли доиравий белги нимани билдиради?",
    explanationUz: "Ko'k fonli doiraviy belgilar — buyuruvchi belgilar (majburiy harakat).",
    explanationRu: "Круглые синие знаки — предписывающие (обязательное действие).",
    explanationCy: "Кўк фонли доиравий белгилар — буюрувчи белгилар (мажбурий ҳаракат).",
    options: [
      { uz: "Buyuruvchi belgi", ru: "Предписывающий знак", cy: "Буюрувчи белги", ok: true },
      { uz: "Ogohlantiruvchi", ru: "Предупреждающий", cy: "Огоҳлантирувчи", ok: false },
      { uz: "Taqiqlovchi", ru: "Запрещающий", cy: "Тақиқловчи", ok: false },
      { uz: "Servis", ru: "Сервисный", cy: "Сервис", ok: false }
    ]
  },
  {
    cat: "tech",
    textUz: "Tormoz tizimida qanday nuqson bo'lganda harakatni davom ettirish taqiqlanadi?",
    textRu: "При каких неисправностях тормозной системы запрещено движение?",
    textCy: "Тормоз тизимида қандай нуқсон бўлганда ҳаракатни давом эттириш тақиқланади?",
    explanationUz: "Ish tormozining samaradorligi normadan past bo'lganda harakatlanish taqiqlanadi.",
    explanationRu: "Запрещено движение при сниженной эффективности рабочей тормозной системы.",
    explanationCy: "Иш тормозининг самарадорлиги нормадан паст бўлганда ҳаракатланиш тақиқланади.",
    options: [
      { uz: "Tormoz pedali biroz bo'sh ketsa", ru: "Если педаль тормоза слегка свободна", cy: "Тормоз педали бироз бўш кетса", ok: false },
      { uz: "Ish tormozi samaradorligi normadan past bo'lsa", ru: "Если эффективность рабочего тормоза ниже нормы", cy: "Иш тормози самарадорлиги нормадан паст бўлса", ok: true },
      { uz: "Stoyanka tormozi ishlamasa, lekin tezlik past bo'lsa", ru: "Если ручник не работает, но скорость низкая", cy: "Стоянка тормози ишламаса, лекин тезлик паст бўлса", ok: false },
      { uz: "Hech qachon", ru: "Никогда", cy: "Ҳеч қачон", ok: false }
    ]
  },
  {
    cat: "tech",
    textUz: "Old chiroqlar ishlamayotgan bo'lsa, qachon harakatlanish mumkin?",
    textRu: "Когда можно двигаться при неработающих фарах?",
    textCy: "Олд чироқлар ишламаётган бўлса, қачон ҳаракатланиш мумкин?",
    explanationUz: "Faqat yorug' kunduz vaqtida va yaxshi ko'rinish sharoitida.",
    explanationRu: "Только в светлое время суток и при хорошей видимости.",
    explanationCy: "Фақат ёруғ кундуз вақтида ва яхши кўриниш шароитида.",
    options: [
      { uz: "Tunda ham", ru: "Даже ночью", cy: "Тунда ҳам", ok: false },
      { uz: "Faqat kunduzi yaxshi ko'rinishda", ru: "Только днём при хорошей видимости", cy: "Фақат кундузи яхши кўринишда", ok: true },
      { uz: "Tumanli ob-havoda", ru: "В тумане", cy: "Туманли об-ҳавода", ok: false },
      { uz: "Hech qanday holatda", ru: "Ни в каких случаях", cy: "Ҳеч қандай ҳолатда", ok: false }
    ]
  },
  {
    cat: "tech",
    textUz: "G'ildiraklarning protektor balandligi minimal qancha bo'lishi kerak (engil avto)?",
    textRu: "Какова минимальная высота протектора шин для легковых авто?",
    textCy: "Ғилдиракларнинг протектор баландлиги минимал қанча бўлиши керак (енгил авто)?",
    explanationUz: "Engil avtomobillar uchun minimal protektor — 1.6 mm.",
    explanationRu: "Минимальная высота протектора для легковых авто — 1.6 мм.",
    explanationCy: "Енгил автомобиллар учун минимал протектор — 1.6 мм.",
    options: [
      { uz: "1.0 mm", ru: "1.0 мм", cy: "1.0 мм", ok: false },
      { uz: "1.6 mm", ru: "1.6 мм", cy: "1.6 мм", ok: true },
      { uz: "2.5 mm", ru: "2.5 мм", cy: "2.5 мм", ok: false },
      { uz: "4.0 mm", ru: "4.0 мм", cy: "4.0 мм", ok: false }
    ]
  },
  {
    cat: "medical",
    textUz: "Avtohalokat qurboniga birinchi navbatda nima qilish kerak?",
    textRu: "Что в первую очередь нужно сделать при ДТП пострадавшему?",
    textCy: "Автоҳалокат қурбонига биринчи навбатда нима қилиш керак?",
    explanationUz: "Avval xavfsizlikni ta'minlash, keyin nafas olish va puls borligini tekshirish.",
    explanationRu: "Сначала обеспечить безопасность, затем проверить дыхание и пульс.",
    explanationCy: "Аввал хавфсизликни таъминлаш, кейин нафас олиш ва пулс борлигини текшириш.",
    options: [
      { uz: "Avtomobildan darhol chiqarish", ru: "Немедленно вытащить из машины", cy: "Автомобилдан дарҳол чиқариш", ok: false },
      { uz: "Xavfsizlik va nafas/puls tekshiruvi", ru: "Обеспечить безопасность и проверить дыхание/пульс", cy: "Хавфсизлик ва нафас/пулс текшируви", ok: true },
      { uz: "Suv ichirish", ru: "Дать воды", cy: "Сув ичириш", ok: false },
      { uz: "Politsiya kelguniga qadar tegmaslik", ru: "Не трогать до приезда полиции", cy: "Полиция келгунига қадар тегмаслик", ok: false }
    ]
  },
  {
    cat: "medical",
    textUz: "Arterial qon ketishini qanday to'xtatish mumkin?",
    textRu: "Как остановить артериальное кровотечение?",
    textCy: "Артериал қон кетишини қандай тўхтатиш мумкин?",
    explanationUz: "Yara ustidan jgut (turniket) bog'lash bilan, jaroh joydan yuqorida.",
    explanationRu: "Наложением жгута выше места ранения.",
    explanationCy: "Яра устидан жгут (турникет) боғлаш билан, жароҳ жойдан юқорида.",
    options: [
      { uz: "Bint bilan yengil bog'lash", ru: "Лёгкая повязка бинтом", cy: "Бинт билан енгил боғлаш", ok: false },
      { uz: "Yara ustidan jgut", ru: "Наложить жгут выше раны", cy: "Яра устидан жгут", ok: true },
      { uz: "Sovuq suv quyish", ru: "Полить холодной водой", cy: "Совуқ сув қуйиш", ok: false },
      { uz: "Hech nima qilmaslik", ru: "Ничего не делать", cy: "Ҳеч нима қилмаслик", ok: false }
    ]
  },
  {
    cat: "medical",
    textUz: "Hushidan ketgan kishini qanday holatga qo'yish kerak?",
    textRu: "В какое положение нужно положить человека без сознания?",
    textCy: "Ҳушидан кетган кишини қандай ҳолатга қўйиш керак?",
    explanationUz: "Yon tomonga (xavfsiz lateral holatga) yotqizish kerak.",
    explanationRu: "Положить в безопасное боковое (восстановительное) положение.",
    explanationCy: "Ён томонга (хавфсиз латерал ҳолатга) ётқизиш керак.",
    options: [
      { uz: "Chalqancha", ru: "На спину", cy: "Чалқанча", ok: false },
      { uz: "Yon tomonga (xavfsiz holat)", ru: "На бок (восстановительное положение)", cy: "Ён томонга (хавфсиз ҳолат)", ok: true },
      { uz: "O'tirgan holatda", ru: "В сидячем положении", cy: "Ўтирган ҳолатда", ok: false },
      { uz: "Yuztubon", ru: "Лицом вниз", cy: "Юзтубан", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Avtomagistralda minimal tezlik qancha?",
    textRu: "Какова минимальная скорость на автомагистрали?",
    textCy: "Автомагистралда минимал тезлик қанча?",
    explanationUz: "Avtomagistralda minimal tezlik 40 km/soat.",
    explanationRu: "Минимальная скорость на автомагистрали — 40 км/ч.",
    explanationCy: "Автомагистралда минимал тезлик 40 км/соат.",
    options: [
      { uz: "20 km/soat", ru: "20 км/ч", cy: "20 км/соат", ok: false },
      { uz: "30 km/soat", ru: "30 км/ч", cy: "30 км/соат", ok: false },
      { uz: "40 km/soat", ru: "40 км/ч", cy: "40 км/соат", ok: true },
      { uz: "60 km/soat", ru: "60 км/ч", cy: "60 км/соат", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Belgi yo'q chorrahada kim ustunlikka ega?",
    textRu: "Кто имеет преимущество на нерегулируемом перекрёстке без знаков?",
    textCy: "Белги йўқ чорраҳада ким устунликка эга?",
    explanationUz: "Tenglik chorrahasida o'ng tomondan kelayotgan transport ustunlikka ega.",
    explanationRu: "На равнозначном перекрёстке преимущество у транспорта справа.",
    explanationCy: "Тенглик чорраҳасида ўнг томондан келаётган транспорт устунликка эга.",
    options: [
      { uz: "Chap tomondan kelayotgan", ru: "Тот, кто слева", cy: "Чап томондан келаётган", ok: false },
      { uz: "O'ng tomondan kelayotgan", ru: "Тот, кто справа", cy: "Ўнг томондан келаётган", ok: true },
      { uz: "Katta avtomobil", ru: "Большой автомобиль", cy: "Катта автомобил", ok: false },
      { uz: "Birinchi kelgan", ru: "Кто первый подъехал", cy: "Биринчи келган", ok: false }
    ]
  },
  {
    cat: "signs",
    textUz: "\"Bolalar\" ogohlantiruvchi belgisi qayerda o'rnatiladi?",
    textRu: "Где устанавливается предупреждающий знак \"Дети\"?",
    textCy: "\"Болалар\" огоҳлантирувчи белгиси қаерда ўрнатилади?",
    explanationUz: "Maktab, bog'cha va bolalar yig'iladigan joylar yaqinida.",
    explanationRu: "Возле школ, детских садов и мест скопления детей.",
    explanationCy: "Мактаб, боғча ва болалар йиғиладиган жойлар яқинида.",
    options: [
      { uz: "Faqat shifoxonalar oldida", ru: "Только перед больницами", cy: "Фақат шифохоналар олдида", ok: false },
      { uz: "Maktab, bog'cha yaqinida", ru: "Возле школ и детсадов", cy: "Мактаб, боғча яқинида", ok: true },
      { uz: "Bozor oldida", ru: "Перед рынком", cy: "Бозор олдида", ok: false },
      { uz: "Avtomagistralda", ru: "На автомагистрали", cy: "Автомагистралда", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Spirtli ichimliklar iste'mol qilgandan keyin haydash mumkinmi?",
    textRu: "Можно ли управлять авто после употребления алкоголя?",
    textCy: "Спиртли ичимликлар истеъмол қилгандан кейин ҳайдаш мумкинми?",
    explanationUz: "Yo'q. Spirtli ichimlik iste'mol qilgan haydovchi haydashi qat'iyan taqiqlanadi.",
    explanationRu: "Нет. Управление в состоянии алкогольного опьянения категорически запрещено.",
    explanationCy: "Йўқ. Спиртли ичимлик истеъмол қилган ҳайдовчи ҳайдаши қатъиян тақиқланади.",
    options: [
      { uz: "Bir oz mumkin", ru: "Немного можно", cy: "Бир оз мумкин", ok: false },
      { uz: "Qat'iyan taqiqlanadi", ru: "Категорически запрещено", cy: "Қатъиян тақиқланади", ok: true },
      { uz: "Faqat qisqa masofaga", ru: "Только на короткие расстояния", cy: "Фақат қисқа масофага", ok: false },
      { uz: "Yo'l bo'sh bo'lsa mumkin", ru: "Если дорога свободна", cy: "Йўл бўш бўлса мумкин", ok: false }
    ]
  }
];

const SIGNS = [
  {
    code: "1.23",
    nameUz: "Bolalar",
    nameRu: "Дети",
    nameCy: "Болалар",
    category: SignCategory.WARNING,
    descriptionUz: "Maktab, bolalar bog'chasi yaqinidagi yo'l qismi.",
    descriptionRu: "Участок дороги вблизи школы или детского сада.",
    descriptionCy: "Мактаб, болалар боғчаси яқинидаги йўл қисми."
  },
  {
    code: "2.5",
    nameUz: "Harakatlanish taqiqlanadi",
    nameRu: "Движение запрещено",
    nameCy: "Ҳаракатланиш тақиқланади",
    category: SignCategory.PROHIBITORY,
    descriptionUz: "Barcha transport vositalarining harakati taqiqlanadi.",
    descriptionRu: "Запрещается движение всех транспортных средств.",
    descriptionCy: "Барча транспорт воситаларининг ҳаракати тақиқланади."
  },
  {
    code: "3.1",
    nameUz: "To'g'ri yurish",
    nameRu: "Движение прямо",
    nameCy: "Тўғри юриш",
    category: SignCategory.MANDATORY,
    descriptionUz: "Faqat to'g'ri yo'nalishda harakatlanishga ruxsat.",
    descriptionRu: "Разрешено движение только прямо.",
    descriptionCy: "Фақат тўғри йўналишда ҳаракатланишга рухсат."
  },
  {
    code: "5.16",
    nameUz: "Avtobus bekati",
    nameRu: "Место остановки автобуса",
    nameCy: "Автобус бекати",
    category: SignCategory.INFORMATION,
    descriptionUz: "Marshrutli transport vositalarining to'xtash joyi.",
    descriptionRu: "Место остановки маршрутного транспорта.",
    descriptionCy: "Маршрутли транспорт воситаларининг тўхташ жойи."
  },
  {
    code: "2.1",
    nameUz: "Asosiy yo'l",
    nameRu: "Главная дорога",
    nameCy: "Асосий йўл",
    category: SignCategory.PRIORITY,
    descriptionUz: "Tenglik chorrahasida ustunlikka ega yo'l.",
    descriptionRu: "Дорога, которой предоставлено преимущество на перекрёстке.",
    descriptionCy: "Тенглик чорраҳасида устунликка эга йўл."
  },
  {
    code: "1.11",
    nameUz: "Xavfli burilish",
    nameRu: "Опасный поворот",
    nameCy: "Хавфли бурилиш",
    category: SignCategory.WARNING,
    descriptionUz: "Yo'lning kichik radiusli yoki cheklangan ko'rinishli burilishi.",
    descriptionRu: "Закругление дороги малого радиуса или с ограниченной видимостью.",
    descriptionCy: "Йўлнинг кичик радиусли ёки чекланган кўринишли бурилиши."
  }
];

async function main() {
  console.log("🌱 Seeding...");

  // Categories (mavzular) — har biriga raqamli ID beriladi
  const cats: Record<string, string> = {};
  for (let i = 0; i < CATEGORIES.length; i++) {
    const c = CATEGORIES[i];
    const data = { ...c, number: i + 1 };
    const created = await prisma.category.upsert({
      where: { slug: c.slug },
      update: data,
      create: data
    });
    cats[c.slug] = created.id;
  }

  // Tariffs
  const tariffs = [
    {
      slug: "14d",
      nameUz: "14 kunlik",
      nameRu: "14 дней",
      nameCy: "14 кунлик",
      durationDays: 14,
      priceUzs: 39000,
      features: JSON.stringify([
        "all_tests", "explanations", "exam_simulation", "stats"
      ])
    },
    {
      slug: "30d",
      nameUz: "30 kunlik",
      nameRu: "30 дней",
      nameCy: "30 кунлик",
      durationDays: 30,
      priceUzs: 69000,
      features: JSON.stringify([
        "all_tests", "explanations", "exam_simulation", "stats", "weak_topics", "priority_support"
      ])
    }
  ];
  for (const tf of tariffs) {
    await prisma.tariff.upsert({
      where: { slug: tf.slug },
      update: tf,
      create: tf
    });
  }

  // Questions + options (asosiy 20 + qo'shimcha 20 = 40) — har biriga ketma-ket raqamli ID
  const allQuestions = [...QUESTIONS, ...EXTRA_QUESTIONS];
  const questionIds: string[] = [];
  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    const created = await prisma.question.create({
      data: {
        number: i + 1,
        categoryId: cats[q.cat],
        textUz: q.textUz,
        textRu: q.textRu,
        textCy: q.textCy,
        explanationUz: q.explanationUz,
        explanationRu: q.explanationRu,
        explanationCy: q.explanationCy,
        difficulty: Difficulty.MEDIUM,
        options: {
          create: q.options.map((o, idx) => ({
            textUz: o.uz,
            textRu: o.ru,
            textCy: o.cy,
            isCorrect: o.ok,
            orderIndex: idx
          }))
        }
      }
    });
    questionIds.push(created.id);
  }

  // Tests — Real imtihon 20 (RANDOM_BY_TOPIC: har gal mavzu nisbatiga ko'ra random)
  await prisma.test.upsert({
    where: { id: "test-real-20" },
    update: {
      questionCount: 20,
      timeLimitMinutes: 25,
      passingScore: 18,
      generationMode: "RANDOM_BY_TOPIC",
      isExamSimulation: true
    },
    create: {
      id: "test-real-20",
      titleUz: "Real imtihon — 20 savol",
      titleRu: "Реальный экзамен — 20 вопросов",
      titleCy: "Реал имтиҳон — 20 савол",
      questionCount: 20,
      timeLimitMinutes: 25,
      passingScore: 18,
      isExamSimulation: true,
      generationMode: "RANDOM_BY_TOPIC",
      orderIndex: 1
    }
  });

  // Real imtihon 50 — RANDOM_BY_TOPIC ham
  await prisma.test.upsert({
    where: { id: "test-real-50" },
    update: {
      questionCount: 50,
      timeLimitMinutes: 50,
      passingScore: 45,
      generationMode: "RANDOM_BY_TOPIC",
      isExamSimulation: true
    },
    create: {
      id: "test-real-50",
      titleUz: "Real imtihon — 50 savol",
      titleRu: "Реальный экзамен — 50 вопросов",
      titleCy: "Реал имтиҳон — 50 савол",
      questionCount: 50,
      timeLimitMinutes: 50,
      passingScore: 45,
      isExamSimulation: true,
      generationMode: "RANDOM_BY_TOPIC",
      orderIndex: 2
    }
  });

  // Demo biletlar (yangi Ticket modeli) — 3 ta sample, har biri 10 ta savol
  for (let n = 1; n <= 3; n++) {
    const ticketId = `ticket-${n}`;
    const ticket = await prisma.ticket.upsert({
      where: { id: ticketId },
      update: { number: n },
      create: {
        id: ticketId,
        number: n,
        titleUz: `Bilet #${n}`,
        titleRu: `Билет №${n}`,
        titleCy: `Билет №${n}`,
        orderIndex: n
      }
    });
    // Eski bog'lanishlarni tozalab qaytadan biriktirish
    await prisma.ticketQuestion.deleteMany({ where: { ticketId: ticket.id } });
    const offset = (n - 1) * 7;
    for (let i = 0; i < 10; i++) {
      const qId = questionIds[(offset + i) % questionIds.length];
      await prisma.ticketQuestion.create({
        data: { ticketId: ticket.id, questionId: qId, orderIndex: i }
      });
    }
  }

  // Per-category practice tests
  for (const c of CATEGORIES) {
    const t = await prisma.test.upsert({
      where: { id: `test-${c.slug}` },
      update: {},
      create: {
        id: `test-${c.slug}`,
        categoryId: cats[c.slug],
        titleUz: c.nameUz,
        titleRu: c.nameRu,
        titleCy: c.nameCy,
        questionCount: 10,
        timeLimitMinutes: 15,
        passingScore: 8,
        isExamSimulation: false,
        orderIndex: c.orderIndex + 1
      }
    });

    // Find questions in this category
    const inCat = await prisma.question.findMany({
      where: { categoryId: cats[c.slug] },
      take: 10
    });
    for (let i = 0; i < inCat.length; i++) {
      await prisma.testQuestion.upsert({
        where: { testId_questionId: { testId: t.id, questionId: inCat[i].id } },
        update: { orderIndex: i },
        create: { testId: t.id, questionId: inCat[i].id, orderIndex: i }
      });
    }
  }

  // Road signs
  for (let i = 0; i < SIGNS.length; i++) {
    const s = SIGNS[i];
    await prisma.roadSign.upsert({
      where: { code: s.code },
      update: { ...s, orderIndex: i },
      create: { ...s, orderIndex: i }
    });
  }

  // Settings
  const settings = [
    { key: "click_enabled", value: "false" },
    { key: "manual_payments_enabled", value: "true" },
    { key: "site_name_uz", value: "AvtoTest.uz" }
  ];
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s
    });
  }

  // Seed admin
  const adminPhone = process.env.ADMIN_PHONE || "+998901234567";
  await prisma.user.upsert({
    where: { phone: adminPhone },
    update: { role: "ADMIN", plan: "PREMIUM" },
    create: {
      phone: adminPhone,
      fullName: "Super Admin",
      role: "ADMIN",
      plan: "PREMIUM"
    }
  });

  console.log(`✅ Seeded: ${CATEGORIES.length} categories, ${allQuestions.length} questions, ${SIGNS.length} signs, ${tariffs.length} tariffs, 1 admin (${adminPhone})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
