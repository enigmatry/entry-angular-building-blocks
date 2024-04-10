import { InjectionToken } from '@angular/core';
import { MatDateFormats } from '@angular/material/core';

export declare type EntryMatDateTime<D> = {
    matDateFormats: MatDateFormats;
    getHours(date: D): number;
    getMinutes(date: D): number;
    getSeconds(date: D): number;
    setTime(date: D, hours: number, minutes: number, seconds: number): D;
};

export const ENTRY_MAT_DATE_TIME = new InjectionToken<EntryMatDateTime<any>>('');
