// Qo'shimcha 20 ta savol — seed.ts'ga import qilinadi
export const EXTRA_QUESTIONS = [
  {
    cat: "yhq",
    textUz: "Trotuar yo'q joyda piyodalar qaysi tomonda yurishi kerak?",
    textRu: "По какой стороне дороги должен идти пешеход при отсутствии тротуара?",
    textCy: "Тротуар йўқ жойда пиёдалар қайси томонда юриши керак?",
    explanationUz: "Trotuar bo'lmasa, transport harakatiga qarama-qarshi yo'nalishda yurishi kerak.",
    explanationRu: "При отсутствии тротуара пешеход должен идти навстречу движению транспорта.",
    explanationCy: "Тротуар бўлмаса, транспорт ҳаракатига қарама-қарши йўналишда юриши керак.",
    options: [
      { uz: "Yo'l chetida", ru: "По обочине", cy: "Йўл четида", ok: false },
      { uz: "Transport harakatiga qarshi yo'nalishda", ru: "Навстречу движению транспорта", cy: "Транспорт ҳаракатига қарши йўналишда", ok: true },
      { uz: "Transport bilan bir yo'nalishda", ru: "По направлению движения", cy: "Транспорт билан бир йўналишда", ok: false },
      { uz: "Farqi yo'q", ru: "Не имеет значения", cy: "Фарқи йўқ", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Ikki yoki undan ortiq qator harakatda chap qatordan kim foydalanishi mumkin?",
    textRu: "Кто может использовать левую полосу при двух и более полосах в одном направлении?",
    textCy: "Икки ёки ундан ортиқ қатор ҳаракатда чап қатордан ким фойдаланиши мумкин?",
    explanationUz: "Chap qator quvib o'tish, chap burilish va U-burilish uchun mo'ljallangan.",
    explanationRu: "Левая полоса предназначена для обгона, поворота налево и разворота.",
    explanationCy: "Чап қатор қувиб ўтиш, чап бурилиш ва У-бурилиш учун мўлжалланган.",
    options: [
      { uz: "Faqat tezlik 70 km/soatdan past bo'lganda", ru: "Только при скорости менее 70 км/ч", cy: "Фақат тезлик 70 км/соатдан паст бўлганда", ok: false },
      { uz: "Quvib o'tish va chap burilish uchun", ru: "Для обгона и поворота налево", cy: "Қувиб ўтиш ва чап бурилиш учун", ok: true },
      { uz: "Faqat avtomobillar", ru: "Только автомобили", cy: "Фақат автомобиллар", ok: false },
      { uz: "Hech kim foydalana olmaydi", ru: "Никто", cy: "Ҳеч ким фойдалана олмайди", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Qor sharoitida tormoz masofasi qanday o'zgaradi?",
    textRu: "Как изменяется тормозной путь на снежной дороге?",
    textCy: "Қор шароитида тормоз масофаси қандай ўзгаради?",
    explanationUz: "Qor va muzli yo'lda tormoz masofasi 2-3 baravar oshadi.",
    explanationRu: "На снегу и льду тормозной путь увеличивается в 2-3 раза.",
    explanationCy: "Қор ва музли йўлда тормоз масофаси 2-3 баравар ошади.",
    options: [
      { uz: "O'zgarmaydi", ru: "Не изменяется", cy: "Ўзгармайди", ok: false },
      { uz: "1.5 baravar oshadi", ru: "Увеличивается в 1.5 раза", cy: "1.5 баравар ошади", ok: false },
      { uz: "2-3 baravar oshadi", ru: "Увеличивается в 2-3 раза", cy: "2-3 баравар ошади", ok: true },
      { uz: "Kamayadi", ru: "Уменьшается", cy: "Камаяди", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Yo'l chiziqlari uzilgan oq chiziqdan qanday foydalanish mumkin?",
    textRu: "Что разрешает прерывистая белая разметка?",
    textCy: "Йўл чизиқлари узилган оқ чизиқдан қандай фойдаланиш мумкин?",
    explanationUz: "Uzilgan oq chiziqdan o'tish va qator almashish ruxsat etiladi.",
    explanationRu: "Прерывистая белая линия разрешает пересечение и смену полосы.",
    explanationCy: "Узилган оқ чизиқдан ўтиш ва қатор алмашиш рухсат этилади.",
    options: [
      { uz: "Faqat to'xtash uchun", ru: "Только для остановки", cy: "Фақат тўхташ учун", ok: false },
      { uz: "Qator almashish ruxsat etiladi", ru: "Разрешена смена полосы", cy: "Қатор алмашиш рухсат этилади", ok: true },
      { uz: "Hech qanday harakat ruxsat etilmaydi", ru: "Никаких манёвров", cy: "Ҳеч қандай ҳаракат рухсат этилмайди", ok: false },
      { uz: "Faqat avtobus uchun", ru: "Только для автобусов", cy: "Фақат автобус учун", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Avtomobil texnik nosozligi sababli to'xtaganda nima qilish kerak?",
    textRu: "Что делать при вынужденной остановке из-за неисправности?",
    textCy: "Автомобил техник носозлиги сабабли тўхтаганда нима қилиш керак?",
    explanationUz: "Avariya signali yoqib, ogohlantirish uchburchagi qo'yiladi.",
    explanationRu: "Включить аварийную сигнализацию и установить знак аварийной остановки.",
    explanationCy: "Авария сигнали ёқиб, огоҳлантириш учбурчаги қўйилади.",
    options: [
      { uz: "Faqat motor o'chiriladi", ru: "Просто заглушить мотор", cy: "Фақат мотор ўчирилади", ok: false },
      { uz: "Avariya signali + uchburchak", ru: "Аварийка + знак", cy: "Авария сигнали + учбурчак", ok: true },
      { uz: "Sirena yoqiladi", ru: "Включить сирену", cy: "Сирена ёқилади", ok: false },
      { uz: "Hech narsa qilinmaydi", ru: "Ничего не делать", cy: "Ҳеч нарса қилинмайди", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Bolalar avtomobilda qanday tashilishi kerak?",
    textRu: "Как должны перевозиться дети в автомобиле?",
    textCy: "Болалар автомобилда қандай ташилиши керак?",
    explanationUz: "12 yoshgacha bolalar maxsus bolalar o'rindig'ida tashilishi kerak.",
    explanationRu: "Дети до 12 лет должны перевозиться в специальных детских удерживающих устройствах.",
    explanationCy: "12 ёшгача болалар махсус болалар ўриндиғида ташилиши керак.",
    options: [
      { uz: "Oldingi o'rindiqda kattalar bilan", ru: "На переднем сиденье со взрослыми", cy: "Олдинги ўриндиқда катталар билан", ok: false },
      { uz: "Bolalar o'rindig'i shart", ru: "В детском кресле", cy: "Болалар ўриндиғи шарт", ok: true },
      { uz: "Hech qanday cheklov yo'q", ru: "Без ограничений", cy: "Ҳеч қандай чеклов йўқ", ok: false },
      { uz: "Faqat orqada", ru: "Только сзади", cy: "Фақат орқада", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Tormoz pedalini bosganda qaysi chiroqlar yonadi?",
    textRu: "Какие огни загораются при нажатии на тормоз?",
    textCy: "Тормоз педалини босганда қайси чироқлар ёнади?",
    explanationUz: "Orqa qizil tormoz chiroqlari yonadi.",
    explanationRu: "Загораются задние красные стоп-сигналы.",
    explanationCy: "Орқа қизил тормоз чироқлари ёнади.",
    options: [
      { uz: "Old chiroqlar", ru: "Передние фары", cy: "Олд чироқлар", ok: false },
      { uz: "Orqa qizil tormoz chiroqlari", ru: "Задние красные стоп-сигналы", cy: "Орқа қизил тормоз чироқлари", ok: true },
      { uz: "Burilish chiroqlari", ru: "Поворотники", cy: "Бурилиш чироқлари", ok: false },
      { uz: "Avariya signali", ru: "Аварийка", cy: "Авария сигнали", ok: false }
    ]
  },
  {
    cat: "signs",
    textUz: "\"To'xtash taqiqlangan\" belgisining ta'siri qachon tugaydi?",
    textRu: "Когда заканчивается действие знака \"Остановка запрещена\"?",
    textCy: "\"Тўхташ тақиқланган\" белгисининг таъсири қачон тугайди?",
    explanationUz: "Keyingi chorrahada yoki maxsus rad etuvchi belgi joyida.",
    explanationRu: "До ближайшего перекрёстка или знака отмены.",
    explanationCy: "Кейинги чорраҳада ёки махсус рад этувчи белги жойида.",
    options: [
      { uz: "100 metrdan keyin", ru: "Через 100 метров", cy: "100 метрдан кейин", ok: false },
      { uz: "Keyingi chorrahada yoki rad etuvchi belgida", ru: "На ближайшем перекрёстке или знак отмены", cy: "Кейинги чорраҳада ёки рад этувчи белгида", ok: true },
      { uz: "1 km dan keyin", ru: "Через 1 км", cy: "1 км дан кейин", ok: false },
      { uz: "Hech qachon", ru: "Никогда", cy: "Ҳеч қачон", ok: false }
    ]
  },
  {
    cat: "signs",
    textUz: "\"Yo'l bering\" belgisi qachon majburiy?",
    textRu: "Когда обязателен знак \"Уступите дорогу\"?",
    textCy: "\"Йўл беринг\" белгиси қачон мажбурий?",
    explanationUz: "Belgi joyida boshqa transport vositalariga yo'l berish shart.",
    explanationRu: "В месте установки знака нужно уступить дорогу другим транспортным средствам.",
    explanationCy: "Белги жойида бошқа транспорт воситаларига йўл бериш шарт.",
    options: [
      { uz: "Faqat tunda", ru: "Только ночью", cy: "Фақат тунда", ok: false },
      { uz: "Boshqa transport bo'lsa, yo'l berish shart", ru: "Уступить другим транспортным средствам", cy: "Бошқа транспорт бўлса, йўл бериш шарт", ok: true },
      { uz: "To'xtash shart", ru: "Обязательно остановиться", cy: "Тўхташ шарт", ok: false },
      { uz: "Tezlikni oshirish kerak", ru: "Увеличить скорость", cy: "Тезликни ошириш керак", ok: false }
    ]
  },
  {
    cat: "signs",
    textUz: "Sariq fonli belgilar nimani anglatadi?",
    textRu: "Что обозначают знаки на жёлтом фоне?",
    textCy: "Сариқ фонли белгилар нимани англатади?",
    explanationUz: "Sariq fon — vaqtinchalik yo'l ishlari belgilarini bildiradi.",
    explanationRu: "Жёлтый фон обозначает временные знаки на участке дорожных работ.",
    explanationCy: "Сариқ фон — вақтинчалик йўл ишлари белгиларини билдиради.",
    options: [
      { uz: "Doimiy belgilar", ru: "Постоянные знаки", cy: "Доимий белгилар", ok: false },
      { uz: "Vaqtinchalik (yo'l ishlari)", ru: "Временные (дорожные работы)", cy: "Вақтинчалик (йўл ишлари)", ok: true },
      { uz: "Faqat aholi punktida", ru: "Только в населённых пунктах", cy: "Фақат аҳоли пунктида", ok: false },
      { uz: "Servis belgilari", ru: "Сервисные знаки", cy: "Сервис белгилари", ok: false }
    ]
  },
  {
    cat: "tech",
    textUz: "Kameraga ko'rinish uchun nima toza bo'lishi shart?",
    textRu: "Что должно быть чистым для нормальной видимости?",
    textCy: "Камерага кўриниш учун нима тоза бўлиши шарт?",
    explanationUz: "Old va orqa oynalar, oyna tozalovchilar va chiroqlar toza bo'lishi shart.",
    explanationRu: "Стёкла, дворники и фары должны быть чистыми.",
    explanationCy: "Олд ва орқа ойналар, ойна тозаловчилар ва чироқлар тоза бўлиши шарт.",
    options: [
      { uz: "Faqat old oyna", ru: "Только лобовое стекло", cy: "Фақат олд ойна", ok: false },
      { uz: "Oynalar, dvorniklar, chiroqlar", ru: "Стёкла, дворники, фары", cy: "Ойналар, дворниклар, чироқлар", ok: true },
      { uz: "Faqat chiroqlar", ru: "Только фары", cy: "Фақат чироқлар", ok: false },
      { uz: "Hech narsa", ru: "Ничего", cy: "Ҳеч нарса", ok: false }
    ]
  },
  {
    cat: "tech",
    textUz: "Akkumulyator zaryadsizlanganda dvigatelni ishga tushirish uchun nima ishlatiladi?",
    textRu: "Что используется для запуска двигателя при разряженном аккумуляторе?",
    textCy: "Аккумулятор зарядсизланганда двигателни ишга тушириш учун нима ишлатилади?",
    explanationUz: "Booster simlari (qisqa-qatlash) bilan boshqa avtomobildan zaryad olinadi.",
    explanationRu: "Используются провода для прикуривания от другого автомобиля.",
    explanationCy: "Бустер симлари билан бошқа автомобилдан заряд олинади.",
    options: [
      { uz: "Suv quyiladi", ru: "Залить воду", cy: "Сув қуйилади", ok: false },
      { uz: "Booster simlari", ru: "Провода для прикуривания", cy: "Бустер симлари", ok: true },
      { uz: "Yog' almashtiriladi", ru: "Заменить масло", cy: "Ёғ алмаштирилади", ok: false },
      { uz: "Hech narsa kerak emas", ru: "Ничего не нужно", cy: "Ҳеч нарса керак эмас", ok: false }
    ]
  },
  {
    cat: "medical",
    textUz: "Yurak to'xtaganda nima qilish kerak?",
    textRu: "Что делать при остановке сердца?",
    textCy: "Юрак тўхтаганда нима қилиш керак?",
    explanationUz: "Yurakka bosma massaj va sun'iy nafas berish (CPR) boshlanishi kerak.",
    explanationRu: "Начать сердечно-лёгочную реанимацию (массаж сердца и искусственное дыхание).",
    explanationCy: "Юракка босма массаж ва сунъий нафас бериш бошланиши керак.",
    options: [
      { uz: "Suv ichirish", ru: "Дать воды", cy: "Сув ичириш", ok: false },
      { uz: "Yurak massaji + sun'iy nafas", ru: "Массаж сердца + искусственное дыхание", cy: "Юрак массажи + сунъий нафас", ok: true },
      { uz: "Yotqizib qoldirish", ru: "Просто положить", cy: "Ётқизиб қолдириш", ok: false },
      { uz: "Yuzga sovuq suv sepish", ru: "Брызгать водой в лицо", cy: "Юзга совуқ сув сепиш", ok: false }
    ]
  },
  {
    cat: "medical",
    textUz: "Kuyish bo'lganda nima qilish kerak?",
    textRu: "Что делать при ожоге?",
    textCy: "Куйиш бўлганда нима қилиш керак?",
    explanationUz: "Kuygan joyni 10-15 daqiqa toza sovuq suv ostida ushlash kerak.",
    explanationRu: "Подержать обожжённое место под прохладной водой 10-15 минут.",
    explanationCy: "Куйган жойни 10-15 дақиқа тоза совуқ сув остида ушлаш керак.",
    options: [
      { uz: "Yog' surtish", ru: "Намазать маслом", cy: "Ёғ суртиш", ok: false },
      { uz: "Sovuq suv ostida ushlash", ru: "Под прохладной водой", cy: "Совуқ сув остида ушлаш", ok: true },
      { uz: "Issiq suv", ru: "Горячей водой", cy: "Иссиқ сув", ok: false },
      { uz: "Hech narsa qilmaslik", ru: "Ничего не делать", cy: "Ҳеч нарса қилмаслик", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "U-burilish qaysi joyda taqiqlanadi?",
    textRu: "Где запрещён разворот?",
    textCy: "У-бурилиш қайси жойда тақиқланади?",
    explanationUz: "Piyodalar o'tish joyida, ko'prikda, tonnelda va ko'rinish 100 m dan kam bo'lganda.",
    explanationRu: "На пешеходном переходе, мосту, в туннеле и при видимости менее 100 м.",
    explanationCy: "Пиёдалар ўтиш жойида, кўприкда, тоннелда ва кўриниш 100 м дан кам бўлганда.",
    options: [
      { uz: "Faqat tunda", ru: "Только ночью", cy: "Фақат тунда", ok: false },
      { uz: "Piyodalar o'tish joyi, ko'prik, tonnel", ru: "Пешеходный переход, мост, туннель", cy: "Пиёдалар ўтиш жойи, кўприк, тоннел", ok: true },
      { uz: "Hech qaerda", ru: "Нигде", cy: "Ҳеч қаерда", ok: false },
      { uz: "Faqat shahar tashqarisida", ru: "Только за городом", cy: "Фақат шаҳар ташқарисида", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Quyoshli kunda old chiroqlardan qachon foydalanish kerak?",
    textRu: "Когда нужно включать фары в светлое время суток?",
    textCy: "Қуёшли кунда олд чироқлардан қачон фойдаланиш керак?",
    explanationUz: "Kunduzgi vaqtda yaqin chiroqlar yoki kunduzgi yurish chiroqlari yoqilishi shart.",
    explanationRu: "В дневное время должны быть включены ближний свет или дневные ходовые огни.",
    explanationCy: "Кундузги вақтда яқин чироқлар ёки кундузги юриш чироқлари ёқилиши шарт.",
    options: [
      { uz: "Hech qachon", ru: "Никогда", cy: "Ҳеч қачон", ok: false },
      { uz: "Faqat kechqurun", ru: "Только вечером", cy: "Фақат кечқурун", ok: false },
      { uz: "Doimiy yaqin chiroq yoki DRL", ru: "Постоянно ближний или ДХО", cy: "Доимий яқин чироқ ёки DRL", ok: true },
      { uz: "Faqat shaharda", ru: "Только в городе", cy: "Фақат шаҳарда", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Temir yo'l o'tish joyida shlagbaum tushgan bo'lsa nima qilish kerak?",
    textRu: "Что делать на жд переезде при опущенном шлагбауме?",
    textCy: "Темир йўл ўтиш жойида шлагбаум тушган бўлса нима қилиш керак?",
    explanationUz: "Shlagbaum oldida to'xtash va yuqori chiroq o'chguncha kutish.",
    explanationRu: "Остановиться перед шлагбаумом и ждать пока не погаснет верхний красный сигнал.",
    explanationCy: "Шлагбаум олдида тўхташ ва юқори чироқ ўчгунча кутиш.",
    options: [
      { uz: "Tezda o'tish", ru: "Быстро проехать", cy: "Тезда ўтиш", ok: false },
      { uz: "Shlagbaum oldida to'xtash", ru: "Остановиться перед шлагбаумом", cy: "Шлагбаум олдида тўхташ", ok: true },
      { uz: "Signal berish", ru: "Подать сигнал", cy: "Сигнал бериш", ok: false },
      { uz: "Aylantirib o'tish", ru: "Объехать", cy: "Айлантириб ўтиш", ok: false }
    ]
  },
  {
    cat: "yhq",
    textUz: "Yo'lga chiqishdan oldin haydovchi nimani tekshirishi kerak?",
    textRu: "Что водитель должен проверить перед выездом?",
    textCy: "Йўлга чиқишдан олдин ҳайдовчи нимани текшириши керак?",
    explanationUz: "Tormoz, chiroqlar, signal, oynalar tozaligi va shinalar holati.",
    explanationRu: "Тормоза, фары, сигналы, чистоту стёкол и состояние шин.",
    explanationCy: "Тормоз, чироқлар, сигнал, ойналар тозалиги ва шиналар ҳолати.",
    options: [
      { uz: "Faqat dvigatel ishlashini", ru: "Только работу двигателя", cy: "Фақат двигатель ишлашини", ok: false },
      { uz: "Tormoz, chiroqlar, oynalar, shinalar", ru: "Тормоза, фары, стёкла, шины", cy: "Тормоз, чироқлар, ойналар, шиналар", ok: true },
      { uz: "Faqat radio", ru: "Только радио", cy: "Фақат радио", ok: false },
      { uz: "Hech narsa", ru: "Ничего", cy: "Ҳеч нарса", ok: false }
    ]
  },
  {
    cat: "signs",
    textUz: "Aholi punkti tugagani belgisidan keyin tezlik chegarasi qanday o'zgaradi?",
    textRu: "Как меняется ограничение скорости после знака \"Конец населённого пункта\"?",
    textCy: "Аҳоли пункти тугагани белгисидан кейин тезлик чегараси қандай ўзгаради?",
    explanationUz: "Engil avto uchun shahardan tashqari maksimal tezlik 90 km/soat.",
    explanationRu: "Для легковых авто за городом максимум 90 км/ч.",
    explanationCy: "Енгил авто учун шаҳардан ташқари максимал тезлик 90 км/соат.",
    options: [
      { uz: "70 km/soat", ru: "70 км/ч", cy: "70 км/соат", ok: false },
      { uz: "90 km/soat (engil avto)", ru: "90 км/ч (легковые)", cy: "90 км/соат (енгил авто)", ok: true },
      { uz: "120 km/soat", ru: "120 км/ч", cy: "120 км/соат", ok: false },
      { uz: "Cheklanmagan", ru: "Без ограничений", cy: "Чекланмаган", ok: false }
    ]
  },
  {
    cat: "tech",
    textUz: "Yog' bosimi indikatori qachon yonadi?",
    textRu: "Когда загорается индикатор давления масла?",
    textCy: "Ёғ босими индикатори қачон ёнади?",
    explanationUz: "Dvigateldagi yog' bosimi pasaysa yoki yog' kam bo'lsa.",
    explanationRu: "При низком давлении или недостатке масла в двигателе.",
    explanationCy: "Двигателдаги ёғ босими пасайса ёки ёғ кам бўлса.",
    options: [
      { uz: "Dvigatel sovuq bo'lganda", ru: "При холодном двигателе", cy: "Двигатель совуқ бўлганда", ok: false },
      { uz: "Yog' bosimi past yoki yog' kam", ru: "Низкое давление или мало масла", cy: "Ёғ босими паст ёки ёғ кам", ok: true },
      { uz: "Tezlik 100 km/soatdan oshganda", ru: "При скорости свыше 100 км/ч", cy: "Тезлик 100 км/соатдан ошганда", ok: false },
      { uz: "Hech qachon", ru: "Никогда", cy: "Ҳеч қачон", ok: false }
    ]
  }
];
