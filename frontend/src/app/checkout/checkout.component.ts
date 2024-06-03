import { Component, Input, inject } from '@angular/core';
import { BookDbService } from '../book-db.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'checkout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  bookDbService: BookDbService;
  bookId: number  = -1;
  bookTitle: string = "";

  readonly loanPeriod = 5; // days

  constructor(private router: Router){
    this.bookDbService = inject(BookDbService);
  }

  @Input()
  set id(providedId: number) {
    this.bookId = providedId;
  }

  @Input()
  set title(providedTitle: string) {
    this.bookTitle = providedTitle;
  }

  xDaysFromNow(): string{
    var date = new Date();
    var futureDate = new Date(date.setDate(date.getDate() + this.loanPeriod));
    return futureDate.toDateString();
  }

  borrow(){
    if (this.bookDbService.borrowBook(this.bookId, this.xDaysFromNow())){
      alert("All set!");
      this.router.navigate(['/search']);
    } else {
      alert("An error occurred.");
    }
  }
}
