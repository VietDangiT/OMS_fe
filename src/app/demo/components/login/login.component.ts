import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { User } from './models/login.models';

@Component({
  selector: 'oms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  @HostBinding('class') hostClass = 'oms-login-host';

  showPassword = false;

  users: User[] = [];

  isLoading = false;

  helper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  signInForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    userPassword: new FormControl('', Validators.required),
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

      const values: Partial<{
        userName: string | null;
        userPassword: string | null;
      }> = this.signInForm.value;

      this.authService
        .login(values)
        .pipe(
          tap(res => {
            const token = res.data?.login;

            localStorage.setItem('token', token!);

            const decodedToken = this.helper.decodeToken(token!);
            localStorage.setItem('userId', decodedToken.Id);

            console.log({ ...decodedToken });
            console.log(decodedToken.role);

            this.router.navigate(['dashboard']);
          })
        )
        .subscribe();

      // this.authService
      //   .login(values)
      //   .pipe(
      //     tap((user: Partial<User>) => {
      //       this.isLoading = false;

      //       if (user) {
      //         localStorage.setItem('token', user.token!);

      //         localStorage.setItem('userId', user.id?.toString()!);

      //         this.router.navigate(['/dashboard']);
      //       }
      //     }),
      //     catchError(async err =>
      //       this.messageService.add({
      //         severity: 'error',
      //         summary: 'Error',
      //         detail: err.error,
      //         closable: true,
      //       })
      //     )
      //   )
      //   .subscribe();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
