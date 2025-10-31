import { Injectable, Provider } from '@angular/core';
import { EntryDateTimeFormats, defaultDateTimeFormats, ENTRY_MAT_DATE_TIME_FORMATS } from './entry-date-time-formats';
import { EntryTimeAdapter } from './entry-time-adapter';

@Injectable()
export class EntryNativeTimeAdapter extends EntryTimeAdapter<Date> {
  getHours = (date: Date): number => date?.getHours();

  getMinutes = (date: Date): number => date?.getMinutes();

  getSeconds = (date: Date): number => date?.getSeconds();

  setTime = (date: Date, hours: number, minutes: number, seconds: number): Date => {
    date?.setHours(hours, minutes, seconds, 0);
    return date;
  };
}

export const provideEntryNativeTimeAdapter = (dateTimeFormats: EntryDateTimeFormats = defaultDateTimeFormats): Provider[] => [
    { provide: EntryTimeAdapter, useClass: EntryNativeTimeAdapter },
    { provide: ENTRY_MAT_DATE_TIME_FORMATS, useValue: dateTimeFormats }
  ];