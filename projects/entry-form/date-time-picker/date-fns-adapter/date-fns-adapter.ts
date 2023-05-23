import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Inject, Injectable, Optional } from '@angular/core';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Injectable()
export class NgxMatDateFnsAdapter extends DateFnsAdapter implements NgxMatDateAdapter<Date> {
  constructor(@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale) {
    super(matDateLocale);
  }

  getHour(date: Date): number {
    return date.getHours();
  }

  getMinute(date: Date): number {
    return date.getMinutes();
  }

  getSecond(date: Date): number {
    return date.getSeconds();
  }

  setHour(date: Date, value: number): void {
    date.setHours(value);
  }

  setMinute(date: Date, value: number): void {
    date.setMinutes(value);
  }

  setSecond(date: Date, value: number): void {
    date.setSeconds(value);
  }

  isSameTime(a: Date, b: Date): boolean {
    if (!a || !b) {
      return true;
    }
    return this.getHour(a) === this.getHour(b)
      && this.getMinute(a) === this.getMinute(b)
      && this.getSecond(a) === this.getSecond(b);
  }

  copyTime(toDate: Date, fromDate: Date): void {
    this.setHour(toDate, this.getHour(fromDate));
    this.setMinute(toDate, this.getMinute(fromDate));
    this.setSecond(toDate, this.getSecond(fromDate));
  }

  compareDateWithTime(first: Date, second: Date, showSeconds?: boolean | undefined): number {
    let response =
      super.compareDate(first, second) ||
      this.getHour(first) - this.getHour(second) ||
      this.getMinute(first) - this.getMinute(second);

    if (showSeconds) {
      response = response || this.getSecond(first) - this.getSecond(second);
    }
    return response;
  }

  setTimeByDefaultValues(date: Date, defaultTime: number[]): void {
    if (!Array.isArray(defaultTime)) {
      throw Error('@Input defaultTime should be an array');
    }
    this.setHour(date, defaultTime[0] || 0);
    this.setMinute(date, defaultTime[1] || 0);
    this.setSecond(date, defaultTime[2] || 0);
  }
}
