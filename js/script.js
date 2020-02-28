/* global feather */
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
      const {
        name, author, pages, isRead,
      } = book;
      const row = document.createElement('tr');
      row.id = book.id;
      row.classList.add('table-row');
      row.classList.add('book-info');

      if (isRead) {
        row.classList.add('checked-book');
      } else {
        row.classList.remove('checked-book');
      }
      const dataRow = `
      <td class='row-data__small' ><input type="checkbox" class='checkbox '${isRead ? 'checked' : ''}/></td>
      <td class='row-data' title='${name}'>${name}</td>
      <td class='row-data' title='${author}'>${author}</td>
      <td class='row-data' title='${pages}'>${pages}</td>      
      <td class='row-data__small'><button class='btn-icon btn-delete'><i data-feather="trash"></i></button></td>
      `;

      row.insertAdjacentHTML('beforeend', dataRow);

      const checkbox = row.querySelector('td > .checkbox');

      checkbox.addEventListener('click', () => {
        let index = 'd';
        this.books.forEach((book, i) => {
          if (book.id === parseInt(row.id, 10)) index = i;
        });
        book = this.books[index];
        if (isRead === true) {
          book.isRead = false;
          row.classList.remove('checked-book');
        } else {
          book.isRead = true;
          row.classList.add('checked-book');
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
