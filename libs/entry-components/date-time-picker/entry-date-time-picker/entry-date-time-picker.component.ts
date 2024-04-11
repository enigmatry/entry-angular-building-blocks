import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME, EntryDateTimeAdapter } from '@enigmatry/entry-components/common';

@Component({
  selector: 'entry-date-time-picker',
  templateUrl: './entry-date-time-picker.component.html',
  styleUrls: ['./entry-date-time-picker.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useFactory: () => inject(ENTRY_MAT_DATE_TIME).matDateFormats },
    { provide: DateAdapter, useClass: EntryDateTimeAdapter }
  ]
})
export class EntryDateTimePickerComponent<D> implements OnInit {
  @Input() datetimeControl = new FormControl<D>(null);
  @Input() showSeconds = false;
  @Input() label: string;
  minutes: FormControl<number>;
  hours: FormControl<number>;
  seconds: FormControl<number>;
  amPm: FormControl<boolean>;
  calendarControl = new FormControl<D>(this.datetimeControl.value);
  hasAmPm: boolean;
  possibleHours: number[];
  possibleMinutesAndSeconds = Array.from({ length: 60 }, (_, i) => i);
  dateAdapter: EntryDateTimeAdapter<D, any>;

  constructor() {
    const format = inject(ENTRY_MAT_DATE_TIME).matDateFormats;
    this.dateAdapter = inject(DateAdapter) as EntryDateTimeAdapter<D, any>;
    const today = this.dateAdapter.today();
    if (this.datetimeControl.value === null) {
      this.datetimeControl.setValue(today);
      this.calendarControl.setValue(today);
    }
    const nowString = this.dateAdapter.format(today, format.display.dateInput);
    this.hasAmPm = nowString.toUpperCase().includes('AM') || nowString.toUpperCase().includes('PM');
    this.minutes = new FormControl<number>(this.dateAdapter.getMinutes(this.datetimeControl.value));
    this.hours = new FormControl<number>(this.dateAdapter.getHours(this.datetimeControl.value));
    this.seconds = new FormControl<number>(this.dateAdapter.getSeconds(this.datetimeControl.value));
    this.amPm = new FormControl<boolean>(this.hours.value >= 12);
    this.possibleHours = this.hasAmPm ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i);
  }

  ngOnInit(): void {
    this.datetimeControl.valueChanges.subscribe(value => {
      this.hours.setValue(this.dateAdapter.getHours(value) ?? 0);
      this.minutes.setValue(this.dateAdapter.getMinutes(value) ?? 0);
      this.amPm.setValue(value ? this.dateAdapter.getHours(value) >= 12 : false);
      this.calendarControl.setValue(value, { emitEvent: false });
    });

    this.calendarControl.valueChanges.subscribe(value => {
      if (value) {
        value = this.dateAdapter.setTime(value, this.hours.value ?? 0 + (this.hasAmPm && this.amPm.value ? 12 : 0), this.minutes.value ?? 0, this.seconds.value ?? 0);
      }
      this.datetimeControl.setValue(value, { emitEvent: false });
    });
  }
}
