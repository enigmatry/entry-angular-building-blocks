import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Injectable, LOCALE_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @deprecated switch to acceptLanguageInterceptor function (See: https://angular.dev/guide/http/interceptors#configuring-interceptors)
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

/**
 * Sets the Accept-Language HTTP request header using the value from LOCALE_ID.
 */
export const acceptLanguageInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const localeId = inject(LOCALE_ID);

  const newRequest = request.clone({
    headers: request.headers.set('Accept-Language', localeId)
  });
  return next(newRequest);
};
