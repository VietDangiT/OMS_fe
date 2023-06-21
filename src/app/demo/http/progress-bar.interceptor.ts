import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ProgressBarService } from '../components/share/progress-bar/progress-bar.service';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {
  progressBarService = inject(ProgressBarService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.progressBarService.showProgressBar(true);

    return next
      .handle(request)
      .pipe(finalize(() => this.progressBarService.showProgressBar(false)));
  }
}
