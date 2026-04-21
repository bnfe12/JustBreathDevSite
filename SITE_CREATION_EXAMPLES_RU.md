# Примеры импорта сайта в justbreath

Этот файл дополняет `SITE_CREATION_GUIDE.md` и объясняет на русском:

- как делать не надо
- как платформа выбирает входную страницу
- как подготовить архив для своего сайта
- что делать с `presentation.html`

Репозиторий с полным контекстом: <https://github.com/bnfe12/JustBreathDevSite>  
Контакт: `justbreath.business.mail@gmail.com`  
GitHub: <https://github.com/bnfe12>

## Важно

- архивы теперь грузятся прямым binary-запросом, а не через base64 в JSON
- сервер сначала пишет binary-архив во временный файл и только потом распаковывает его
- обычный лимит архива: `5 MB`
- для внутренних операторов лимит архива: `512 MB`
- в архиве обязательно нужен `index.html`
- если `index.html` несколько, приоритет у корневого файла
- `presentation.html` не пропадает: он остаётся отдельной страницей, если лежит в архиве
- backend внутри архива всё равно не запускается
- архивный сайт теперь отдаётся как полноценная статика без платформенной обёртки поверх дизайна
- если в коде есть backend/API-логика, импорт не падает: сайт предупреждает о конфликтующих функциях и отключает только server-side состояние
- локальные картинки могут автоматически сжиматься при импорте, если сервер получает меньший файл без смены пути
- после обновления сервер надо перезапустить, иначе останется старый путь загрузки

## 1. Как justbreath выбирает главную страницу

Для архивного сайта точкой входа считается `index.html`.

Правило выбора:

1. если в корне архива есть `index.html`, именно он открывается на `/@handle/slug`
2. если корневого `index.html` нет, берётся самый верхний `index.html` в структуре
3. остальные HTML-файлы остаются доступными как обычные страницы сайта

Пример:

```text
my-site/
  index.html
  presentation.html
  world.html
  assets/
    site.css
```

Результат:

- `/@handle/slug` -> `index.html`
- `/@handle/slug/presentation.html` -> `presentation.html`
- `/@handle/slug/world.html` -> `world.html`

## 2. Если главная страница у тебя именно `presentation.html`

Есть два нормальных варианта.

### Вариант A. Переименовать `presentation.html` в `index.html`

Это самый простой и правильный путь.

```text
my-site/
  index.html
  world.html
  assets/
```

### Вариант B. Оставить `presentation.html`, но сделать корневой `index.html`

Корневой `index.html` может сразу перенаправлять на презентацию:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0; url=./presentation.html" />
  <title>Redirecting…</title>
</head>
<body>
  <p>Opening presentation… <a href="./presentation.html">Continue</a></p>
</body>
</html>
```

Так сайт всё равно остаётся корректным для justbreath.

## 3. Как не надо

### Плохо: загрузить один HTML, если рядом есть локальные файлы

```text
index.html
css/style.css
js/app.js
img/hero.png
```

Если загрузить только `index.html`, стили, скрипты и картинки не найдутся.

### Плохо: грузить исходники без статической сборки

```text
my-app/
  src/
  package.json
  vite.config.js
```

Если внутри нет готового `index.html`, justbreath не сможет открыть сайт как статическую страницу.

### Плохо: ожидать, что серверный код внутри архива запустится

```text
my-site/
  index.html
  server.js
  api/
    form-handler.js
```

Загруженный сайт считается статическим. `Node`, `PHP`, `Python`, CGI и любая серверная логика внутри архива не выполняются.

### Плохо: архивировать мусор без причины

```text
my-site/
  .git/
  node_modules/
  index.html
  dist/
  presentation.html
```

Технически полный проект может импортироваться, если лимит размера соблюдён и есть правильный `index.html`, но это не лучший рабочий процесс:

- архив тяжелее
- легче выйти за лимит
- сложнее понять, какой `index.html` должен быть главным

Если нужен именно полный архив, держи в корне тот `index.html`, который должен открываться первым.

## 4. Как надо

### Пример 1. Одна страница без файлов рядом

```text
landing.html
```

Тогда лучше использовать режим `Single HTML`.

### Пример 2. Небольшой статический сайт

```text
my-site/
  index.html
  about.html
  presentation.html
  css/
    style.css
  js/
    app.js
  img/
    hero.jpg
```

Это правильный кандидат для `Archive package`.

### Пример 3. Экспорт из Vite / Webpack / Parcel

```text
dist/
  index.html
  assets/
    app.js
    app.css
```

Тоже правильный кандидат для `Archive package`.

### Пример 4. Полный проект, но с рабочим корнем

```text
breath-casino-site/
  index.html
  presentation.html
  world.html
  dist/
    index.html
    assets/
  package.json
  vite.config.js
```

Такой архив justbreath может импортировать как полный проект, но входной страницей будет корневой `index.html`.

Если ты хочешь, чтобы открывалась именно презентация, делай так:

- либо переименуй `presentation.html` в `index.html`
- либо сделай корневой `index.html` с редиректом на `presentation.html`

## 5. Минимальный чек-лист перед импортом

- в архиве есть `index.html`
- все локальные `css/js/img/fonts` лежат рядом и используют относительные пути
- нет ожидания, что внутри архива запустится backend
- размер архива укладывается в лимит
- если `presentation.html` главная, это отражено через корневой `index.html`

## 6. Что лучше делать для своего собственного сайта на justbreath

Практичный вариант:

1. собери статическую версию сайта
2. убедись, что в точке входа лежит `index.html`
3. если есть несколько страниц, загружай архив, а не один HTML
4. если после загрузки нужно подправить текст, CSS или JS, используй `Site Studio`
5. если меняются картинки, шрифты или вся структура сборки, перезагружай архив целиком

Если сайт презентационный, лучше держать структуру максимально прямой:

```text
presentation-site/
  index.html
  presentation.html
  world.html
  assets/
    style.css
    main.js
    poster.png
```

Это понятнее и для импорта, и для будущего редактирования.
