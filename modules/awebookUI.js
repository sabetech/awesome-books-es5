import { DateTime } from './luxon.min.js';

export default class AwesomeBookUI {
  constructor(bookListEl, existingBooks, notificationEl) {
    this.books = existingBooks;
    this.bookListEl = bookListEl;
    this.notificationEl = notificationEl;
    this.dateEl = document.querySelector('.date');
    this.#updateUI();
  }

  addBook(book) {
    this.books.push(book);
    localStorage.setItem('booksAdded', JSON.stringify(this.books));
    this.#updateUI();
    this.#showNotification(`Book ${book.Title} Added Successfully`);
  }

  removeBook(index) {
    this.books = this.books.filter((_, i) => parseInt(index, 10) !== i);
    localStorage.setItem('booksAdded', JSON.stringify(this.books));
    this.#updateUI();
  }

    #updateUI() {
    this.bookListEl.innerHTML = '';

    let bookHTML = '';
    for (let i = 0; i < this.books.length; i += 1) {
      const listItem = this.bookListEl.appendChild(document.createElement('li'));
      listItem.classList.add('my-book');
      bookHTML = `<p class="book-info"> - ${this.books[i].Title} By <em>${this.books[i].Author}</em></p><button id=${i} class="removebtn" type="button">Remove</button>`;
      listItem.innerHTML = bookHTML;
    }

    const removeBtns = document.querySelectorAll('.removebtn');

    removeBtns.forEach((removeBtn) => removeBtn.addEventListener('click', (ev) => {
      this.removeBook(ev.target.id);
    }));

    this.#updateDate();
  }

    #showNotification(msg) {
      this.notificationEl.textContent = msg;

      setTimeout(() => {
        this.notificationEl.textContent = '';
      }, 3000);
    }

    #updateDate() {
      const dt = DateTime.now();
      this.dateEl.textContent = dt.setLocale('en-US').toLocaleString(DateTime.DATETIME_FULL);
    }
}