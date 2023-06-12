import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, tap } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { User } from './models/login.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  showPassword = false;

  users: User[] = [];

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  signInForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    UserPassword: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.signInForm.markAllAsTouched();
    if (!this.signInForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter valid form value',
        closable: true,
      });
    } else {
      this.isLoading = true;

      this.authService
        .login(this.signInForm.value)
        .pipe(
          catchError(async err =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error,
              closable: true,
            })
          ),
          tap((token: string) => {
            this.isLoading = false;

            if (!!token) {
              localStorage.setItem('token', token);

              this.router.navigate(['/dashboard']);
            }
          })
        )
        .subscribe();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
