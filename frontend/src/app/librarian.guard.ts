import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthHelperService } from './auth-helper.service';

export const librarianGuard: CanActivateFn = (route, state) => {
  var authHelperService = inject(AuthHelperService);
  console.log("librarianGuard: checking if librarian")
  return authHelperService.assumeLibrarian();
};
