import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  var authService = new AuthService();
  console.log("checking login status")
  console.log(authService.loggedIn())
  return authService.loggedIn();
};
