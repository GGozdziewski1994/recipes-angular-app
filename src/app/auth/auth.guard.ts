import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<any> {
    return this.authService.authorized$.pipe(
      take(1),
      tap((isAuth) => {
        if (isAuth) {
          return;
        }

        this.router.navigate(['auth']);
      })
    );
  }
}
