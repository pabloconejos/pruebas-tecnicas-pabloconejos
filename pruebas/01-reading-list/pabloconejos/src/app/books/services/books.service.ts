import { Injectable, signal } from '@angular/core';
import books from '../../../../../books.json'
import { Book } from '../models/IBook';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  selectedBooks = signal<Book[]>([])
  constructor() { }

  getBooks() {
    return books.library;
  }

  addSelectedBooks(book: Book) {

    if (this.selectedBooks().some( sbook => sbook.title == book.title)) {
      return
    }

    this.selectedBooks.update( books => {
      return [...books, book]
    })
  }

  removeFromSelectedBooks(bookTile: string) {
    const filteredBooks = this.selectedBooks().filter( sbook => sbook.title != bookTile)
    this.selectedBooks.set(filteredBooks)
  }

  getGeneros() {
    let generos = this.getBooks().map( book => {
      return book.book.genre
    })
    return [...new Set(generos)];
  }

  getMaxPages() {
    let pages = this.getBooks().map( book => {
      return book.book.pages
    })
    return Math.max(...pages);
  }
}
