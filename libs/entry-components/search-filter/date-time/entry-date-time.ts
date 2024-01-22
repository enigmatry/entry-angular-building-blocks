import { InjectionToken } from '@angular/core';

export declare type EntryMatDateTime<D> = {
    dateTimeFormat: string;
    compareDate(first: D, second: D): number;
};

export const ENTRY_MAT_DATE_TIME = new InjectionToken<EntryMatDateTime<any>>('');
