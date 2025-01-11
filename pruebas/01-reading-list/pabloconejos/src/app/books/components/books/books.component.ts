import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';
import { Book, Library } from '../../models/IBook';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule,CdkDropList, CdkDrag],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {

  pages: number = 0;
  books: Library[]
  booksCopia: Library[]
  genero: string = 'todos'

  constructor(public booksService: BooksService) {
    this.books = this.booksService.getBooks()
    this.booksCopia = this.books
  }

  filterBooks() {
    const filteteredBooks = this.booksCopia.filter( book => {
      const pagesCondition = book.book.pages >= this.pages;
      const genreCondition = book.book.genre === this.genero || this.genero === 'todos';
      if (pagesCondition && genreCondition) {
        return true;
      }
      return false
    })

    this.books = filteteredBooks

  }

  drop(event: CdkDragDrop<Book>) {
    moveItemInArray(this.booksService.selectedBooks(), event.previousIndex, event.currentIndex);
  }

}
