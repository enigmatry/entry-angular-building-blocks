import { MatDateFormats } from '@angular/material/core';
import { EntryMatDateTime } from './entry-date-time';

export const matDateFormatFactory = (formats: MatDateFormats, entryMatDateTime: EntryMatDateTime<any>): MatDateFormats => {
    const dateFormats = formats;
    dateFormats.parse.dateInput = Array.isArray(dateFormats.parse.dateInput)
        ? [...dateFormats.parse.dateInput, entryMatDateTime.dateTimeFormat]
        : [dateFormats.parse.dateInput, entryMatDateTime.dateTimeFormat];
    dateFormats.display.dateInput = Array.isArray(dateFormats.display.dateInput)
        ? [...dateFormats.display.dateInput, entryMatDateTime.dateTimeFormat]
        : [dateFormats.display.dateInput, entryMatDateTime.dateTimeFormat];
    return dateFormats;
};
