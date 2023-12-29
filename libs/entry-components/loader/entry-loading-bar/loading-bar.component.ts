/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EntryLoadingService } from '../loading.service';
import { ThemePalette } from '@angular/material/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'entry-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryLoadingBarComponent {

  @Input() type: 'loader' | 'progress-bar' = 'loader';
  @Input() color: ThemePalette = 'primary';
  @Input() backgroundOverlay = true;
  @Input() diameter = 30;

  private _enableRequestTracking: boolean;

  @Input()
  set enableRequestTracking(value: BooleanInput) {
    this._enableRequestTracking = coerceBooleanProperty(value);
    this._loadingService.enableRequestTracking = this._enableRequestTracking;
  }
  get enableRequestTracking(): boolean {
    return this._enableRequestTracking;
  }

  loading$ = this._loadingService.loading$;
  constructor(private _loadingService: EntryLoadingService) { }
}
