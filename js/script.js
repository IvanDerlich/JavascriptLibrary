function Book(id, name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id;
}

class MyLibrary {
  constructor(array) {
    this.books = array;
    this.newId = this.books.length;

    this.createTableRow = (book) => {
      const row = document.createElement('tr');
      row.id = book.id;
      const dataRow = `
      <td><input type="checkbox" class='checkbox'${book.isRead ? 'checked' : ''}/></td>
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>      
      <td><button>Delete</button></td>
      `;

      row.insertAdjacentHTML('beforeend', dataRow);

      const checkbox = row.querySelector('td > .checkbox');

      checkbox.addEventListener('click', () => {
        let index = 'd';
        this.books.forEach((book, i) => {
          if (book.id === parseInt(row.id, 10)) index = i;
        });
        book = this.books[index];
        if (book.isRead === true) {
          book.isRead = false;
        } else {
          book.isRead = true;
        }
      });

      const button = row.querySelector('td>button');
      button.addEventListener('click', e => {
        this.remove(parseInt(row.id, 10));
        const table = document.getElementById('table');
        table.removeChild(row);
        e.preventDefault();
      });

      return row;
    };
  }

  render() {
    const table = document.getElementById('table');
    if (this.newId > 1) {
      table.appendChild(this.createTableRow(this.books[this.newId]));
    }
  }

  insert(book) {
    this.books.push(book);
    const table = document.getElementById('table');
    table.appendChild(this.createTableRow(book));
  }

  remove(bookId) {
    let index = 'd';
    this.books.forEach((book, i) => {
      if (book.id === bookId) {
        index = i;
      }
    });
    this.books.splice(index, 1);
  }
}

const myLibrary = new MyLibrary([
  new Book(0, 'Name Book 1', 'Author Name', 434),
  new Book(1, 'Name Book 2', 'Author Name', 434),
  new Book(2, 'Name Book 3', 'Author Name', 434)]);

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
  e.preventDefault();
});

window.addEventListener('load', e => {
  const table = document.getElementById('table');
  myLibrary.books.forEach((book) => {
    table.appendChild(myLibrary.createTableRow(book));
  });
  e.preventDefault();
});
