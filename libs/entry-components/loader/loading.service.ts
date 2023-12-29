import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryLoadingService {

  private _loading$ = new BehaviorSubject<boolean>(false);

  private _enableRequestTracking = false;
  private _urlMap: Map<string, boolean> = new Map<string, boolean>();

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable().pipe(distinctUntilChanged());
  }

  get enableRequestTracking(): boolean {
    return this._enableRequestTracking;
  }

  set enableRequestTracking(enabled: boolean) {
    this._enableRequestTracking = enabled;
    if (!enabled) {
      this._urlMap.clear();
    }
  }

  toggleLoading(loading: boolean) {
    this._loading$.next(loading);
  }

  setRequestLoading(loading: boolean, url: string): void {
    if (!this._enableRequestTracking) {
      return;
    }
    if (loading) {
      this._urlMap.set(url, loading);
      this._loading$.next(true);
    } else if (!loading && this._urlMap.has(url)) {
      this._urlMap.delete(url);
    }
    // Set loading to 'false' if all outgoing requests are completed
    if (this._urlMap.size === 0) {
      this._loading$.next(false);
    }
  }
}
