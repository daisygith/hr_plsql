import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from '../models/role';

// TODO zamienic na guard funkcyjny tak jak AuthGuardService
@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as Role[];

    if (this._authService.hasRole(requiredRoles)) {
      return true;
    }

    this._router.navigate(['/unauthorized']);
    return false;
  }
}
