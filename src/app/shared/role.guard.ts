import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<any> {
    const canActivateRoles = route.data['roles'];

    return this.authService.user$.pipe(
      map((user) => {
        if (user) {
          return canActivateRoles.includes(user.role);
        }
      }),
      tap((canActivate) => {
        if (canActivate) {
          return;
        }

        alert(
          'This option is available to the user with the role: ' +
            canActivateRoles
        );
      })
    );
  }
}
