import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  var authService = inject(AuthService);
  console.log("loggedInGuard: checking login status")
  return authService.loggedIn();
};
