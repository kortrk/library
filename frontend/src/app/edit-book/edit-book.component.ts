import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-book',
  standalone: true,
  imports: [],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {
  book: Book;
  bookFields: string[];

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

  humanizeStr(input: string): string{
    return input
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })
  }

  displayFields(): string[]{
    return this.bookFields.map((x) => this.humanizeStr(x))
  }

  fieldNamesAndValues(x: Object): FieldInfo[]{
    return Object.entries(x).map((info) =>
      new FieldInfo(
        this.humanizeStr(info[0]),
        String(info[1])
      )
    )
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
