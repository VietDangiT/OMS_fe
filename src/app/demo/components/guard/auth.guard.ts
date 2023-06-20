import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NotificationService } from '../share/message/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  canActivate() {
    if (this.authService.isAuthenticated() == false) {
      this.notificationService.errorNotification(
        $localize`You must sign in to access`
      );

      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
