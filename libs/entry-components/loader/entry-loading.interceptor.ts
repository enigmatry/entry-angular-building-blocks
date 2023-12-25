import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryLoadingService } from './entry-loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class EntryLoadingInterceptor implements HttpInterceptor {
  private requestsCount = 0;

  constructor(private loadingService: EntryLoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.registerRequest(1);

    return next.handle(req).pipe(
      finalize(() => this.registerRequest(-1)));
  }

  registerRequest(increment: number) {
    this.requestsCount += increment;
    this.loadingService.setLoading(this.requestsCount > 0);
  }
}
