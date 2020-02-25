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