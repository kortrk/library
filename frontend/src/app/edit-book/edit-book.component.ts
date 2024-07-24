import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookHelperService } from '../book-helper.service';

@Component({
  selector: 'edit-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {
  book: Book;
  loading: boolean = true;

  bookDbService: BookDbService;
  bookHelperService: BookHelperService;

  constructor(private router: Router){
    this.bookDbService = inject(BookDbService);
    this.bookHelperService = inject(BookHelperService);

    this.book = this.bookHelperService.genericBook();
  }

  @Input()
  set id(providedId: number) {
    this.bookDbService.getBook(providedId)
    .subscribe(books => {
      var books = books.map((b) => new Book(b));
      if (books.length > 0){
        this.book = books[0];
      } else {
        this.bookHelperService.genericBook();
        this.book.id = 0; // tmp
      }
      this.loading = false;
    });
  }


  clearBorrowerAndDuedate(){
    this.book.currentBorrower = null;
    this.book.duedate = null;
  }

  saveBook(){
    var successMessage = this.bookDbService.saveBook(this.book);
    if (successMessage !== null){
      alert(successMessage);
      this.router.navigate(['/search']);
    } else {
      alert('There was a problem making this update');
    }
  }

  deleteBook(){
    if (confirm(`Are you sure you want to delete ${this.book.title}?`)){
      this.bookDbService.removeBook(this.book.id);
      this.router.navigate(['/search']);
    }
  }

  cancel(){
    this.router.navigate(['/search']);
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
