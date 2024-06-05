import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';
import { DetailsBookComponent } from './details-book/details-book.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReviewComponent } from './review/review.component';
import { loggedInGuard } from './logged-in.guard';

export const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'search', component: SearchComponent},
  {path: 'details', component: DetailsBookComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [loggedInGuard]},
  {path: 'review', component: ReviewComponent, canActivate: [loggedInGuard]},
  {path: '**', component: SearchComponent}
  // {path: '**', redirectTo: ''} // keep last
];
