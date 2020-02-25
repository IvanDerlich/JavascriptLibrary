function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isReaded = false;
}

class MyLibrary {
  constructor(array) {
    this.books = array;
  }
}

const myLibrary = new MyLibrary([new Book('Name Book', 'Author Name', 434), new Book('Name Book', 'Author Name', 434), new Book('Name Book', 'Author Name', 434)]);

const table = document.getElementById('table');
const createTableRow = book => {
  const row = document.createElement('tr');

  const dataRow = `
  <td>${book.name}</td>
  <td>${book.author}</td>
  <td>${book.pages}</td>
  <td>${book.isReaded}</td>
  <td></td>
  `;

  row.insertAdjacentHTML('beforeend', dataRow);

  return row;
};

table.appendChild(createTableRow(myLibrary.books[0]));