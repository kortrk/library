import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const librarianGuard: CanActivateFn = (route, state) => {
  var authService = new AuthService();
  console.log("librarianGuard: checking if librarian")
  return authService.isLibrarian();
};
