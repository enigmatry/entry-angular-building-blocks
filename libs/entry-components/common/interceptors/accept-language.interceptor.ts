import { Injectable, LOCALE_ID, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Sets the Accept-Language HTTP request header using the value from LOCALE_ID.
 */
@Injectable()
export class AcceptLanguageInterceptor implements HttpInterceptor {
  private localeId = inject(LOCALE_ID);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      headers: request.headers.set('Accept-Language', this.localeId)
    });
    return next.handle(newRequest);
  }
}
