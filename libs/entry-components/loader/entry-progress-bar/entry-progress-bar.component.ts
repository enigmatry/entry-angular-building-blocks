import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { EntryLoadingService } from '../entry-loading.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'entry-progress-bar',
  templateUrl: './entry-progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryProgressBarComponent implements OnDestroy {
  loading$: Observable<boolean>;
  private _destroy$ = new Subject<void>();

  constructor(private loadingService: EntryLoadingService) {
    this.loading$ = combineLatest({
      enabled: this.loadingService.enabled$,
      loading: this.loadingService.loading$
    }).pipe(
      takeUntil(this._destroy$),
      map(({ enabled, loading }) => enabled && loading)
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
