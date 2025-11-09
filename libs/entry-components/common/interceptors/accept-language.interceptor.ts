import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { LOCALE_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';

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
