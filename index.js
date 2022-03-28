import AwesomeBookUI from './modules/awebookUI.js';
import Book from './modules/book.js';

const titleInput = document.querySelector('#title');
const AuthorInput = document.querySelector('#author');
const bookform = document.querySelector('#books-form');
const listLink = document.querySelector('#list');
const addNewLink = document.querySelector('#add-new');
const contactUsLink = document.querySelector('#contact');
const notificationMessage = document.querySelector('#message');
const wrapperSections = document.querySelectorAll('.wrapper');
const bookList = document.querySelector('.books');
const localstoreBooks = JSON.parse(localStorage.getItem('booksAdded')) || [];

const bookUI = new AwesomeBookUI(bookList, localstoreBooks, notificationMessage);

listLink.addEventListener('click', () => {
  wrapperSections.forEach((section) => {
    if (section.id !== 'book-list-content') {
      section.classList.add('hidden');
    } else {
      section.classList.remove('hidden');
    }
  });
});

addNewLink.addEventListener('click', () => {
  wrapperSections.forEach((section) => {
    if (section.id !== 'add-book') {
      section.classList.add('hidden');
    } else {
      section.classList.remove('hidden');
    }
  });
});

contactUsLink.addEventListener('click', () => {
  wrapperSections.forEach((section) => {
    if (section.id !== 'contact-us') {
      section.classList.add('hidden');
    } else {
      section.classList.remove('hidden');
    }
  });
});

bookform.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = titleInput.value;
  const author = AuthorInput.value;

  const myBook = new Book(author, title);

  titleInput.value = '';
  AuthorInput.value = '';

  bookUI.addBook(myBook);
});