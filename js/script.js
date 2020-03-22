/* global feather, Book, MyLibrary */

const myLibrary = new MyLibrary([
  new Book(0, 'Functional Javascript', 'Luis Atencio', 434, false),
  new Book(1, 'Classic Computer Science Problems in Python', 'David Kopec', 324, true),
  new Book(2, 'Algorithm design manual', 'Steve S. Skiena', 854, false)]);

const myForm = document.getElementById('my_form');
myForm.addEventListener('submit', e => {
  const name = document.getElementsByName('name')[0].value;
  const author = document.getElementsByName('book_author')[0].value;
  const pages = document.getElementsByName('pages')[0].value;
  const isRead = document.getElementsByName('isRead')[0].checked;

  const book = new Book(
    myLibrary.newId,
    name,
    author,
    pages,
    isRead,
  );
  myLibrary.newId += 1;
  myLibrary.insert(book);

  Array.from(e.target.elements).filter(element => element.type !== 'submit').forEach(element => { element.value = ''; });
  document.getElementsByName('isRead')[0].checked = false;
  /* eslint no-undef: "error" */
  feather.replace();

  e.preventDefault();
});

window.addEventListener('load', e => {
  const table = document.getElementById('table');
  myLibrary.books.forEach((book) => {
    table.appendChild(myLibrary.createTableRow(book));
  });
  window.feather.replace();
  e.preventDefault();
});
