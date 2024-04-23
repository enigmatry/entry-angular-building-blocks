import { Component, HostBinding, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MatDateFormats } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME_FORMATS, EntryDateTimeAdapter, NgControlAccessorDirective, NoopControlValueAccessorDirective } from '@enigmatry/entry-components/common';
import { EntryTimePickerComponent } from './time-picker.component';

@Component({
  selector: 'entry-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useFactory: () => inject(ENTRY_MAT_DATE_TIME_FORMATS) },
    { provide: DateAdapter, useClass: EntryDateTimeAdapter }
  ],
  hostDirectives: [NoopControlValueAccessorDirective, NgControlAccessorDirective]
})
export class EntryDateTimePickerComponent<D> implements OnInit {
  @HostBinding('class') class = 'entry-date-time-picker';

  @Input() label: string;
  @Input() showSeconds: boolean;

  ngControlAccessor = inject(NgControlAccessorDirective);
  dateTimeAdapter: EntryDateTimeAdapter<D, unknown> = inject(DateAdapter) as EntryDateTimeAdapter<D, unknown>;
  format: MatDateFormats = inject(ENTRY_MAT_DATE_TIME_FORMATS);

  // Control bound to component using FormsApi (ngModel, formControl, formControlName)
  get formControl(): FormControl<D> {
    return this.ngControlAccessor.control;
  }

  // Control that is connected to calendar 
  calendarControl: FormControl<D> = new FormControl<D>(undefined);

  is12HoursFormat = this.dateTimeAdapter.is12HoursFormat(this.format.display.dateInput);

  @ViewChild(EntryTimePickerComponent, { static: true }) timePicker: EntryTimePickerComponent<D>;

  ngOnInit(): void {
    if (!this.formControl.value) {
      this.formControl.setValue(this.dateTimeAdapter.today());
    }

    this.calendarControl.setValue(this.formControl.value);

    this.formControl.valueChanges.subscribe(value =>
      this.calendarControl.setValue(value, { emitEvent: false })
    );

    this.calendarControl.valueChanges.subscribe(value => {
      this.dateTimeAdapter.setTime(value, this.timePicker.hours, this.timePicker.minutes ?? 0, this.timePicker.seconds ?? 0);
      this.formControl.setValue(value);
    });
  }
}
