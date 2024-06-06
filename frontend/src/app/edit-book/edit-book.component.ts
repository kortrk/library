import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'edit-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {
  book: Book;
  bookFields: string[];
  str = "";

  bookDbService: BookDbService;

  constructor(private router: Router){
    this.book = new Book({
      title: 'string',
      author: 'string',
      publisher: 'string',
      publicationDate: 'string',
      id: 0,
      image: 'string',
      duedate: null,
      currentBorrower: null
    });

    this.bookFields = Object.getOwnPropertyNames(this.book);
    console.log(this.bookFields);

    this.bookDbService = inject(BookDbService);
  }

  @Input()
  set id(providedId: number) {
    var foundBook = this.bookDbService.getBook(providedId);
    if (foundBook !== null){
      this.book = foundBook;
    } else {
      this.router.navigate(['/search']);
    }
  }


  clearBorrowerAndDuedate(){
    this.book.currentBorrower = null;
    this.book.duedate = null;
  }

  saveBook(){
    if (this.bookDbService.updateBook(this.book)){
      alert('Updated successfully');
      this.router.navigate(['/search']);
    } else {
      alert('There was a problem making this update');
    }
  }
}

class FieldInfo{
  name: string;
  value: string;

  constructor(name: string, value: string){
    this.name = name;
    this.value = value;
  }
}
