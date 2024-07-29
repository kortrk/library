import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthHelperService } from './auth-helper.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  var authHelperService = inject(AuthHelperService);
  return authHelperService.assumeLoggedIn();
};
