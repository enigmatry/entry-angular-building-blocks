import { InjectionToken } from '@angular/core';
import { MatDateFormats } from '@angular/material/core';

export declare type EntryMatDateTime<D> = {
    matDateFormats: MatDateFormats;
    compareDate(first: D, second: D): number;
};

export const ENTRY_MAT_DATE_TIME = new InjectionToken<EntryMatDateTime<any>>('');
