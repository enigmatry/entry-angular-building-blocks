import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MatDateFormats } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME_FORMATS, EntryDateTimeAdapter, NgControlAccessorDirective, NoopControlValueAccessorDirective } from '@enigmatry/entry-components/common';
import { EntryTimePickerComponent } from './time-picker.component';
import { Subject, takeUntil } from 'rxjs';
import { ENTRY_DATE_TIME_PICKER_CONFIG, EntryDateTimePickerConfig } from './date-time-picker-config.model';

@Component({
    selector: 'entry-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    providers: [
        { provide: MAT_DATE_FORMATS, useFactory: () => inject(ENTRY_MAT_DATE_TIME_FORMATS) },
        { provide: DateAdapter, useClass: EntryDateTimeAdapter }
    ],
    hostDirectives: [NoopControlValueAccessorDirective, NgControlAccessorDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EntryDateTimePickerComponent<D> implements OnInit, OnDestroy {
  @HostBinding('class') class = 'entry-date-time-picker';

  @Input() label: string;
  @Input() showSeconds: boolean | undefined;
  @Input() min: D;
  @Input() max: D;
  @Input() placeholder: string | undefined;
  @Input() hint: string | undefined;
  @Input() defaultTime: D | undefined;
  @Output() dateTimeChanged = new Subject<D>();

  _disabled: boolean;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
    this.setDisabled();
  }

  private ngControlAccessor = inject(NgControlAccessorDirective);
  private dateTimeAdapter: EntryDateTimeAdapter<D, unknown> = inject(DateAdapter) as EntryDateTimeAdapter<D, unknown>;
  private format: MatDateFormats = inject(ENTRY_MAT_DATE_TIME_FORMATS);
  private changeDetectorRef = inject(ChangeDetectorRef);
  public config: EntryDateTimePickerConfig = inject(ENTRY_DATE_TIME_PICKER_CONFIG);

  // Control bound to component using FormsApi (ngModel, formControl, formControlName)
  get formControl(): FormControl<D> {
    return this.ngControlAccessor.control;
  }

  // Control that is connected to calendar
  calendarControl: FormControl<D> = new FormControl<D>(undefined);

  is12HourClock = this.dateTimeAdapter.is12HoursClock(this.format.display.dateInput);

  @ViewChild(EntryTimePickerComponent, { static: true }) timePicker: EntryTimePickerComponent<D>;

  private $destroy = new Subject<void>();

  get minDate() {
    if (!this.min) {
      return undefined;
    }
    const result = this.dateTimeAdapter.clone(this.min);
    this.dateTimeAdapter.setTime(result, 0, 0, 0);
    return result;
  }

  get maxDate() {
    if (!this.max) {
      return undefined;
    }
    const result = this.dateTimeAdapter.clone(this.max);
    this.dateTimeAdapter.setTime(result, 0, 0, 0);
    return result;
  }

  ngOnInit(): void {
    this.calendarControl.setValue(this.formControl.value, { emitEvent: false });
    this.setDisabled();
    this.formControl.statusChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(status => {
        if (status === 'DISABLED') {
          this.calendarControl.disable({ emitEvent: false });
        } else {
          this.calendarControl.enable({ emitEvent: false });
        }
        this.changeDetectorRef.markForCheck();
      })

    this.formControl.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(value => {
        this.calendarControl.setValue(value, { emitEvent: false });
        this.dateTimeChanged.next(value);
      }
      );

    this.calendarControl.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(value => {
        this.timePicker.to24HourClock();
        this.dateTimeAdapter.setTime(value, this.timePicker.hours, this.timePicker.minutes, this.timePicker.seconds);
        this.formControl.setValue(value);
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  private setDisabled() {
    if (this._disabled && this.formControl?.enabled) {
      this.formControl?.disable();
      this.calendarControl?.disable({ emitEvent: false });
    } else if (this.formControl?.disabled) {
      this.formControl?.enable();
      this.calendarControl?.enable({ emitEvent: false });
    }
  }
}
