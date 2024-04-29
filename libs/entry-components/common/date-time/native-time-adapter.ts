import { Injectable, Provider } from "@angular/core";
import { EntryTimeAdapter } from "./entry-time-adapter";
import { EntryDateTimeFormats, defaultDateTimeFormats, ENTRY_MAT_DATE_TIME_FORMATS } from "./entry-date-time-formats";

@Injectable()
export class EntryNativeTimeAdapter extends EntryTimeAdapter<Date> {

  getHours(date: Date): number {
    return date?.getHours();
  }

  getMinutes(date: Date): number {
    return date?.getMinutes();
  }

  getSeconds(date: Date): number {
    return date?.getSeconds();
  }

  setTime(date: Date, hours: number, minutes: number, seconds: number): Date {
    date?.setHours(hours, minutes, seconds, 0);
    return date;
  }
}

export function provideEntryNativeTimeAdapter(dateTimeFormats: EntryDateTimeFormats = defaultDateTimeFormats): Provider[] {
  return [
    { provide: EntryTimeAdapter, useClass: EntryNativeTimeAdapter },
    { provide: ENTRY_MAT_DATE_TIME_FORMATS, useValue: dateTimeFormats }
  ]
}