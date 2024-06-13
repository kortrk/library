import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';
import { DetailsBookComponent } from './details-book/details-book.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReviewComponent } from './review/review.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { loggedInGuard } from './logged-in.guard';
import { librarianGuard } from './librarian.guard';

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'search', component: SearchComponent},
  {path: 'details', component: DetailsBookComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [loggedInGuard]},
  {path: 'review', component: ReviewComponent, canActivate: [loggedInGuard]},
  {path: 'edit-book', component: EditBookComponent, canActivate: [librarianGuard]},
  {path: '**', component: SearchComponent}
  // {path: '**', redirectTo: ''} // keep last
];
