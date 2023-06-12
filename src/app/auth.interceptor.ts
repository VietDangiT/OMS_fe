import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './demo/service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthenticationToken;
    if (token) {
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }
  }
}
