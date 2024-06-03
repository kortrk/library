import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';
import { DetailsBookComponent } from './details-book/details-book.component';

export const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'search', component: SearchComponent},
  {path: 'details', component: DetailsBookComponent},
  {path: '**', component: SearchComponent} // keep last
];
