import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MatDateFormats } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME_FORMATS, EntryDateTimeAdapter, NgControlAccessorDirective, NoopControlValueAccessorDirective } from '@enigmatry/entry-components/common';
import { EntryTimePickerComponent } from './time-picker.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'entry-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useFactory: () => inject(ENTRY_MAT_DATE_TIME_FORMATS) },
    { provide: DateAdapter, useClass: EntryDateTimeAdapter }
  ],
  hostDirectives: [NoopControlValueAccessorDirective, NgControlAccessorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryDateTimePickerComponent<D> implements OnInit, OnDestroy, OnChanges {
  @HostBinding('class') class = 'entry-date-time-picker';

  @Input() label: string;
  @Input() showSeconds: boolean;
  @Input() disabled: boolean;
  @Input() min: D;
  @Input() max: D;  

  ngControlAccessor = inject(NgControlAccessorDirective);
  dateTimeAdapter: EntryDateTimeAdapter<D, unknown> = inject(DateAdapter) as EntryDateTimeAdapter<D, unknown>;
  format: MatDateFormats = inject(ENTRY_MAT_DATE_TIME_FORMATS);

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
    const result = this.dateTimeAdapter.clone(this.min as D);
    this.dateTimeAdapter.setTime(result, 0, 0, 0);
    return result;
  }

  get maxDate() {
    const result = this.dateTimeAdapter.clone(this.max as D);
    this.dateTimeAdapter.setTime(result, 0, 0, 0);
    return result;
  }

  ngOnInit(): void {
    if (!this.formControl.value) {
      this.formControl.setValue(this.dateTimeAdapter.today());
    }

    this.calendarControl.setValue(this.formControl.value);

    this.formControl.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(value =>
        this.calendarControl.setValue(value, { emitEvent: false })
      );

    this.calendarControl.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(value => {
        this.timePicker.to24HourClock();
        this.dateTimeAdapter.setTime(value, this.timePicker.hours, this.timePicker.minutes, this.timePicker.seconds);
        this.formControl.setValue(value);
      });
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.disabled) {
      this.formControl.disable();
      this.calendarControl.disable();
    } else {
      this.formControl.enable();
      this.calendarControl.enable();
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
