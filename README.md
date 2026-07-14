# Car Showroom 🚗

Віртуальний автосалон — SPA на React + TypeScript, що показує список автомобілів з [DummyJSON API](https://dummyjson.com/products/category/vehicle), дозволяє шукати й фільтрувати їх, а також залишати відгуки (коментарі) на сторінці кожного авто.

## Функціонал

- **Головна сторінка** — список авто (фото, назва, бренд, ціна)
- **Пошук та фільтрація**: за назвою (з debounce), за брендом, за ціновим діапазоном, скидання фільтрів
- **Сторінка авто** (`/vehicles/:vehicleId`) — деталі, характеристики, список відгуків
- **Форма відгуку** з валідацією (React Hook Form + Zod): ім'я, текст, рейтинг
- **Персистентність відгуків** у `localStorage` — додані коментарі не зникають після перезавантаження сторінки
- **Кешування запитів** через RTK Query — повторний вхід на відвідану сторінку не робить новий запит
- Обробка станів **loading / error / empty**
- Сторінка **404** для невідомих маршрутів
- Адаптивна верстка (420px–1440px), семантичні теги, базова accessibility

## Стек технологій

| Категорія        | Технологія                     |
|-------------------|---------------------------------|
| Фреймворк         | React 18 + TypeScript, Vite     |
| Роутинг           | React Router (`createBrowserRouter`) |
| Дані/кешування    | Redux Toolkit Query (RTK Query) |
| Форми/валідація   | React Hook Form + Zod           |
| Стилі             | CSS Modules (без UI-фреймворків) |
| Персистентність   | localStorage                    |

## Локальний запуск

```bash
npm install
npm run dev
```

Застосунок буде доступний на `http://localhost:5173`.

Збірка production-бандлу:

```bash
npm run build
npm run preview
```

## Деплой

Проєкт задеплоєний на **Vercel**: `<https://completed-a-test-assignment-for-a-f.vercel.app>`

Для деплою іншого форку:
1. Залити репозиторій на GitHub
2. Імпортувати проєкт у [vercel.com](https://vercel.com/new)
3. Framework Preset — **Vite**, build command `npm run build`, output directory `dist`
4. У корені лежить `vercel.json` з rewrite-правилом для коректної роботи клієнтського роутингу React Router на прямих посиланнях (наприклад `/vehicles/5`)

## Структура проєкту

```
src/
├── api/            # RTK Query slice (vehiclesApi.ts)
├── components/     # VehicleCard, VehicleList, FilterForm, ReviewList, ReviewItem, ReviewForm
├── pages/          # HomePage, VehiclePage, NotFoundPage
├── hooks/          # useLocalStorage, useDebounce
├── store/          # Redux store
├── types/          # Vehicle, Review, FilterParams
└── utils/          # validation (Zod), filterVehicles
```

## Чому Car Showroom, а не VIN Decoder

Обрав це завдання з кількох причин:

- **Ширший UX-кейс.** Каталог з фільтрацією, детальною сторінкою та користувацьким
  контентом (відгуки) ближчий до типових продуктових інтерфейсів, ніж форма
  "ввів VIN — отримав список полів".
- **Більше архітектурних рішень.** Довелось спроєктувати кешування двох ендпоінтів
  через RTK Query, клієнтську фільтрацію (пошук + бренд + діапазон цін) з дебаунсом,
  персистентність користувацьких відгуків у `localStorage` з мерджем відносно
  серверних даних, пагінацію відгуків та валідацію двох форм з різними Zod-схемами.
- **Дані цікавіші для інтерфейсу.** DummyJSON віддає повноцінні обʼєкти з фото,
  цінами й рейтингами — це дало простір для UI-рішень (галерея, картки, пагінація),
  на відміну від плаского списку Variable/Value з vPIC API.