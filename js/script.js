function Book(id, name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isReaded = false;
  this.id = id;
}

const createTableRow = (book) => {
  const row = document.createElement('tr');
  row.id = book.id;
  const dataRow = `
  <td>${book.name}</td>
  <td>${book.author}</td>
  <td>${book.pages}</td>
  <td>${book.isReaded}</td>
  <td>fd</td>
  `;

  row.insertAdjacentHTML('beforeend', dataRow);

  return row;
};

class MyLibrary {
  constructor(array) {
    this.books = array;
    this.id = this.books.length;
  }

  render() {
    const table = document.getElementById('table');

    table.appendChild(createTableRow(this.books[this.id - 1]));
  }

  insert(book) {
    this.id++;
    // console.log(instanc)
    this.books.push(new Book(this.id, book.name, book.author, book.pages));
  }

  remove(index) {
    this.books.splice(index, 1);
  }
}


const myLibrary = new MyLibrary([
  new Book(0, 'Name Book 1', 'Author Name', 434),
  new Book(1, 'Name Book 2', 'Author Name', 434),
  new Book(2, 'Name Book 3', 'Author Name', 434)]);

const myForm = document.getElementById('my_form');
myForm.addEventListener('submit', e => {
  const name = e.target.elements[0].value;
  const author = e.target.elements[1].value;
  const pages = e.target.elements[2].value;

  const book = { name, author, pages };

  myLibrary.insert(book);
  myLibrary.render();
  e.preventDefault();
});

addEventListener('load', e => {
  const table = document.getElementById('table');
  console.log(myLibrary.books);
  myLibrary.books.forEach((book) => {
    table.appendChild(createTableRow(book));
  });
});
