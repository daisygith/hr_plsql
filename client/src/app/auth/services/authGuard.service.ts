import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthGuardService: CanActivateFn = (route, state) => {
  let isAuthenticated = inject(AuthService).isAuthenticated();
  let router = inject(Router);

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
