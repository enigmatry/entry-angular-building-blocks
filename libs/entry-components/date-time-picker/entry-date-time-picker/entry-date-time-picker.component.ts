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
export class EntryDateTimePickerComponent implements OnInit {
  @Input() datetimeControl = new FormControl<Date>(new Date());
  @Input() showSeconds = false;
  @Input() label: string;
  minutes: FormControl<number>;
  hours: FormControl<number>;
  seconds: FormControl<number>;
  amPm: FormControl<boolean>;
  calendarControl: FormControl<Date> = new FormControl<Date>(this.datetimeControl.value);
  hasAmPm: boolean;
  possibleHours: number[];
  possibleMinutesAndSeconds = Array.from({ length: 60 }, (_, i) => i);

  constructor() {
    const dateAdapter = inject(DateAdapter);
    const format = inject(ENTRY_MAT_DATE_TIME).matDateFormats;
    const nowString = dateAdapter.format(dateAdapter.today(), format.display.dateInput);
    this.hasAmPm = nowString.toUpperCase().includes('AM') || nowString.toUpperCase().includes('PM');
    this.minutes = new FormControl<number>(this.datetimeControl.value.getMinutes());
    this.hours = new FormControl<number>(this.datetimeControl.value.getHours());
    this.seconds = new FormControl<number>(this.datetimeControl.value.getSeconds());
    this.amPm = new FormControl<boolean>(this.hours.value >= 12);
    this.possibleHours = this.hasAmPm ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i);
  }

  ngOnInit(): void {
    this.datetimeControl.valueChanges.subscribe(value => {
      this.hours.setValue(value.getHours() ?? 0);
      this.minutes.setValue(value.getMinutes() ?? 0);
      this.amPm.setValue(value ? value.getHours() >= 12 : false);
      this.calendarControl.setValue(value, { emitEvent: false });
    });

    this.calendarControl.valueChanges.subscribe(value => {
      if(value){
        value.setHours(this.hours.value ?? 0 + (this.hasAmPm && this.amPm.value ? 12 : 0));
        value.setMinutes(this.minutes.value ?? 0);
        value.setSeconds(this.seconds.value ?? 0);
      }
      this.datetimeControl.setValue(value, { emitEvent: false });
    });
  }
}
