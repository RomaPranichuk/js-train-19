// 1. Створення базового об'єкту "Book":
/*
 * Об'єкт: Book
 * Властивості:
 * ----------------------------------
 * | Властивість | Значення         |
 * |-------------|------------------|
 * | title       | "Загальна Книга" |
 * | author      | "Анонім"         |
 * | pages       | 0                |
 *
 * Функції:
 * ------------------------------------------------------------------------
 * | Функція    | Опис                                                    |
 * -----------------------------------------------------------------------
 * | read()     | Виводить повідомлення "Ви читаєте <title> від <author>" |
 */

// Створюємо об'єкт Book

console.log("Завдання: 1 ==============================");

function Book(title, author, pages) {
  this.title = title || "Загальна Книга";
  this.author = author || "Анонім";
  this.pages = pages || 0;
}

Book.prototype.read = function () {
  console.log("Ви читаєте " + this.title + " від " + this.author);
};

let book = new Book();

// Виводимо в консоль Об'єкт: Book
console.log(book);

// Виводимо в консоль прототип Об'єкту: Book
console.log(Book.prototype);

// Викликаємо функцію read об'єкту Book
book.read();

// 2. Наслідування від базового об'єкту Book

/*
 * Об'єкт: Novel
 * Властивості та функції наслідуються від об'єкта Book
 * Додаємо нову властивість
 *  | Властивість | Значення |
 *  |-------------|----------|
 *  | genre       | "Новела" |
 */

// Створюємо об'єкт Novel, наслідуємо властивості і функції від об'єкта Book

// Додаємо властивість genre

console.log("Завдання: 2 ==============================");

function Novel(title, author, pages, genre) {
  Book.call(this, title, author, pages);
  this.genre = genre || "Новела";
}

Novel.prototype = Object.create(Book.prototype);

Novel.prototype.constructor = Novel;

let novel = new Novel("Загальна книга", "Анонім", 0, "Новела");

// Виводимо в консоль Об'єкт: Novel
console.log(novel);

// Виводимо в консоль прототип Об'єкту: Novel
console.log(Novel.prototype);

// 3. Створення нового об'єкту та зміна його прототипу

/*
 * Об'єкт: Biography
 * Властивості:
 * --------------------------------------
 * | Властивість | Значення             |
 * |-------------|----------------------|
 * | title       | "Загальна Біографія" |
 * | author      | "Біограф"            |
 * | pages       | 200                  |
 */

// Створюємо об'єкт Biography

let Biography = {
  title: "Загальна Біографія",
  author: "Біограф",
  pages: 200,
};

// Змінемо прототип об'єкта Biography на Novel
Object.setPrototypeOf(Biography, Novel);

console.log("Завдання: 3 ==============================");
// Виводимо в консоль Об'єкт: Biography
console.log(Biography);

// Перевіримо чи являється Novel прототипом Biography та виведемо в консоль
// console.log(Novel.isPrototypeOf(Biography));

// 4. Інкапсуляція властивості та додання властивості
/*
 * Об'єкт: ScienceBook
 * Властивості та функції наслідуються від об'єкта Book
 * Також тут використовується інкапсуляція для створення властивості 'info', яка не може бути змінена напряму, а лише змінюється за допомогю гетера
 */

// Створюємо ScienceBook, наслідуємо властивості і функції від об'єкта Book

function ScienceBook(title, author) {
  Book.call(this, title, author);
}

ScienceBook.prototype = Object.create(Book.prototype);
ScienceBook.prototype.constructor = ScienceBook;

// Додаємо властивість 'info' за допомогою Object.defineProperty
// Зробимо щоб 'info' не можно було видалити або змінити, перевіримо і спробуємо присвоїти ій будь яке значення (це потрібно робити ззовні defineProperty),
// Отримаємо помилку Cannot assign to read only property 'info' of object '#<Object>'

Object.defineProperty(ScienceBook.prototype, "info", {
  value: "",
  writable: false,
  enumerable: true,
  configurable: false,
});

// Далі створюємо сетер який присвоє властивості info значення яке отримує при виклику, помилку більше не отримуємо але при спробі вивести значення info отримуємо undefined
ScienceBook.prototype.setInfo = function (info) {
  Object.defineProperty(this, "info", {
    value: info,
    writable: false,
    enumerable: true,
    configurable: false,
  });
};

// Створимо гетер який буде нам повертати рядок: Про книгу <title>: <info>
ScienceBook.prototype.getInfo = function () {
  return "Про книгу " + this.title + ": " + this.info;
};
// тепер все виводить коректно

// Заповнюємо об'єкт
// | Властивість | Значення             |
// |-------------|----------------------|
// | title       | "Фізика 101"         |
// | author      | "Альберт Ейнштейн"   |
// | info        | написана в 1915 році |

console.log("Завдання: 4 ==============================");
// Виводимо в консоль властивість info
let scienceBook = new ScienceBook("Фізика 101", "Альберт Ейнштейн");

scienceBook.setInfo("написана в 1915 році");
console.log(scienceBook.getInfo());

// Виводимо в консоль налаштування властивости info

console.log(Object.getOwnPropertyDescriptor(ScienceBook.prototype, "info"));
console.log(Object.getOwnPropertyDescriptor(scienceBook, "info"));

// 5. Поліморфізм: створення нового об'єкта та перевизначення його методу
/*
 * Об'єкт: Textbook
 * Властивості та функції наслідуються від об'єкта ScienceBook
 * Метод read() перевизначено для демонстрації поліморфізму,
 * має виводити "Ви читаєте підручник "<title>" від <author>. <info>"
 */

//Створюємо Textbook та наслідуємо властивості з ScienceBook
function Textbook(title, author) {
  ScienceBook.call(this, title, author);
}

Textbook.prototype = Object.create(ScienceBook.prototype);
Textbook.prototype.constructor = Textbook;

// Перевизначаємо метод read(), відповідно з дописом вище
Textbook.prototype.read = function () {
  console.log(
    "Ви читаєте підручник " +
      this.title +
      " від " +
      this.author +
      ". " +
      this.info
  );
};

// Встановлюємо значення для Textbook
// | Властивість | Значення                   |
// |-------------|----------------------------|
// | title       | "Фізика у Вищій Школі"     |
// | author      | "Дж. Д. Джонс"             |

console.log("Завдання: 5 ==============================");

// Викликаємо функцію read об'єкту Textbook
let textbook = new Textbook("Фізика у Вищій Школі", "Дж. Д. Джонс");
textbook.setInfo("Про книгу Фізика у Вищій школі: написана в 1915 році");
textbook.read();

// 6. Абстракція: створення об'єкта з загальними властивостями
/*
 * Об'єкт: Media
 * Властивості:
 * --------------
 * | Властивість | Значення           |
 * |-------------|--------------------|
 * | format      | "Загальний Формат" |
 * | length      | 0                  |
 *
 * Функції:
 * ---------------------------------------------------------------------------------------------------------------
 * | Функція | Опис                                                                                              |
 * |---------|---------------------------------------------------------------------------------------------------|
 * | play()  | Виводить повідомлення "Зараз відтворюється медіа у форматі <format> з тривалістю <length> секунд" |
 */

// Створюємо об'єкт Media
let Media = function (format, length) {
  this.format = format;
  this.length = length;
};

Media.prototype.play = function () {
  console.log(
    "Зараз відтворюється медіа у форматі " +
      this.format +
      " з тривалістю " +
      this.length +
      " секунд"
  );
};

/*
 * Об'єкт: Song
 * Властивості та функції наслідуються від об'єкта Media
 * Додаткові властивості: artist, title
 */

// Створюємо об'єкт Song, наслідуємо властивості і функції від об'єкта Media
let Song = function (format, length, artist, title) {
  Media.call(this, format, length);

  this.artist = artist;
  this.title = title;
};

Song.prototype = Object.create(Media.prototype);
Song.prototype.constructor = Song;

// Встановлюємо додаткові властивості
// | Властивість | Значення               |
// |-------------|------------------------|
// | artist      | "Загальний Виконавець" |
// | title       | "Загальна Пісня"       |

let song = new Song(
  "Загальний формат",
  0,
  "Загальний Виконавець",
  "Загальна Пісня"
);

console.log("Завдання: 6 ==============================");
// Викликаємо функцію play об'єкту Song
song.play();
