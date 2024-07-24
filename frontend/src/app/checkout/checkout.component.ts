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

  borrow(){
    this.bookDbService.checkOutBook(this.bookId)
    .subscribe(res => {
      if (res.success){
        alert(res.msg);
        this.router.navigate(['/search']);
      } else {
        alert("An error occurred.");
      }
    });
  }
}
