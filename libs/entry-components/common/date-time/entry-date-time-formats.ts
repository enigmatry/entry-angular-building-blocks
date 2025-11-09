import { InjectionToken } from '@angular/core';
import { MatDateFormats } from '@angular/material/core';

export type EntryDateTimeFormats = MatDateFormats;

export const defaultDateTimeFormats = {
  parse: {
    dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm', 'dd-MM-yyyy HH:mm:ss']
  },
  display: {
    dateInput: 'dd-MM-yyyy HH:mm',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

export const ENTRY_MAT_DATE_TIME_FORMATS = new InjectionToken<EntryDateTimeFormats>('entry-date-time-formats');