import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLogin: boolean = true;
  isLoading: boolean = false;
  error: string = '';
  roleOptions = [{ role: 'user' }, { role: 'author' }];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initAuthForm();
  }

  onSubmit() {
    if (!this.authForm.valid) return;

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    const role = this.authForm.value.role;

    let authObs: Observable<AuthResData | undefined>;

    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password, role);
    }

    authObs.subscribe(
      () => {
        this.router.navigate(['recipes']);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.error = error.message;
      }
    );

    this.authForm.reset();
  }

  switchAuthModelHandler() {
    this.isLogin = !this.isLogin;
    this.authForm.reset();
    this.initAuthForm();
  }

  initAuthForm() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      role: new FormControl(null, [
        !this.isLogin ? Validators.required : Validators.nullValidator,
      ]),
    });
  }
}
