import { InjectionToken } from '@angular/core';

export declare type EntryMatDateTime<D> = {
    dateTimeFormat: string;
    compareDate(first: D, second: D): number;
};

export const ENTRY_MAT_DATE_TIME = new InjectionToken<EntryMatDateTime<any>>('');
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/ban-types
export declare function ENTRY_MAT_DATE_TIME_FACTORY(): {};
