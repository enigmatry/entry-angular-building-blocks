import { InjectionToken, inject } from '@angular/core';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

export declare type EntryMatDateTime<D> = {
    dateTimeFormat: string;
    compareDate(first: D, second: D): number;
};

export const ENTRY_MAT_DATE_TIME = new InjectionToken<EntryMatDateTime<any>>('');

export const EXTEND_MAT_DATE_FORMAT_WITH_DATE_TIME = (): MatDateFormats => {
    const formats = inject(MAT_DATE_FORMATS, { skipSelf: true });
    const dateTimeFormat = inject(ENTRY_MAT_DATE_TIME).dateTimeFormat;
    const result = { ...formats };
    const parseFormat = result.parse.dateInput;
    result.display.dateInput = dateTimeFormat;
    result.parse.dateInput = Array.isArray(parseFormat)
        ? parseFormat.push(dateTimeFormat)
        : [parseFormat, dateTimeFormat];
    return result;
};
