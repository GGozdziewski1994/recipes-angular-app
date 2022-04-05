import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResData {
  id: number;
  email: string;
  token: string;
  role: string;
  password?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private URL: string = 'http://localhost:3000/auth';
  private authorized = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  get authorized$() {
    return this.authorized.asObservable();
  }

  get user$() {
    return this.user.asObservable();
  }

  signup(email: string, password: string, role: string) {
    return this.http
      .post<AuthResData>(this.URL, {
        email,
        password,
        role,
        token: this.generateToken(),
      })
      .pipe(
        catchError((error) => throwError(error)),
        tap((data) => {
          this.handleAuth(data.email, data.id, data.token, data.role);
        })
      );
  }

  login(email: string, password: string) {
    return this.http.get<AuthResData[]>(this.URL).pipe(
      catchError((error) => throwError(error)),
      map((res) => {
        const user = res.find((user) => {
          return user.email === email && user.password === password;
        });
        return user;
      }),
      tap((data) => {
        if (data) {
          this.handleAuth(data.email, data.id, data.token, data.role);
        }
      })
    );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: number;
      role: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.role,
      userData._token
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.authorized.next(!!loadedUser);
      this.router.navigate(['recipes']);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['auth']);
  }

  private handleAuth(email: string, id: number, token: string, role: string) {
    const user = new User(email, id, role, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.authorized.next(!!user);
  }

  private generateToken() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
