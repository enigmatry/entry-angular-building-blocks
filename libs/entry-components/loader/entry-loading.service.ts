/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryLoadingService {

  private _enabled = new BehaviorSubject<boolean>(true);
  public readonly enabled$ = this._enabled.pipe(distinctUntilChanged());

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.pipe(distinctUntilChanged());

  setEnable(enabled: boolean) {
    this._enabled.next(enabled);
  }

  setLoading(loading: boolean) {
    this._loading.next(loading);
  }
}
