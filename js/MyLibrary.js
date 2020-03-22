/* eslint-disable no-unused-vars */

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
      <td class='row-data__small' >
        <button class="checkbox ${isRead ? 'checked' : ''}">
          ${isRead ? 'Read' : 'Unread'}
        </button>
      </td>
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
        if (book.isRead) {
          book.isRead = false;
          row.classList.remove('checked-book');
          checkbox.innerText = 'Unread';
        } else {
          book.isRead = true;
          row.classList.add('checked-book');
          checkbox.innerText = 'Read';
        }
      });

      const button = row.querySelector('td > .btn-delete');
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