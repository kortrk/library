import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const librarianGuard: CanActivateFn = (route, state) => {
  var authService = inject(AuthService);
  console.log("librarianGuard: checking if librarian")
  return authService.isLibrarian();
};
