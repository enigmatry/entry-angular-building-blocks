import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryLoadingService } from './loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class EntryLoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: EntryLoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.loadingService.enableRequestTracking) {
      return next.handle(req);
    }

    this.loadingService.setRequestLoading(true, req.url);

    return next.handle(req).pipe(
      finalize(() => this.loadingService.setRequestLoading(false, req.url)));
  }
}
