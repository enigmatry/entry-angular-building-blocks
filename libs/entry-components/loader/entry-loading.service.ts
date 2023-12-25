/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryLoadingService {

  private _enabled = new BehaviorSubject<boolean>(true);
  public readonly enabled$ = this._enabled.pipe(distinctUntilChanged());

  private _loading = new BehaviorSubject<boolean>(false);

  public readonly loading$ =
    combineLatest({ enabled: this._enabled, loading: this._loading })
      .pipe(
        map(({ enabled, loading }) => enabled && loading),
        distinctUntilChanged()
      );

  setEnable(enabled: boolean) {
    this._enabled.next(enabled);
  }

  setLoading(loading: boolean) {
    this._loading.next(loading);
  }
}
