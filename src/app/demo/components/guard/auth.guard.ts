import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  canActivate() {
    if (this.authService.isAuthenticated() == false) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Waning',
        detail: 'You must sign in to access',
      });

      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }

}
