import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME, EntryMatDateTime } from './entry-date-time';

/**
 * Extends provided DateAdapter with date time support
 */
@Injectable()
export class EntryDateTimeAdapter<D, L> extends DateAdapter<D, L> {
    private compareFunction: (first: D, second: D) => number;

    constructor(@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: L,
        @Inject(ENTRY_MAT_DATE_TIME) entryMatDateTime: EntryMatDateTime<D>,
        @SkipSelf() private dateAdapter: DateAdapter<D, L>) {
        super();
        this.compareFunction = entryMatDateTime.compareDate;
        this.dateAdapter.setLocale(matDateLocale);
    }

    getYear(date: D): number {
        return this.dateAdapter.getYear(date);
    }

    getMonth(date: D): number {
        return this.dateAdapter.getMonth(date);
    }

    getDate(date: D): number {
        return this.dateAdapter.getDate(date);
    }

    getDayOfWeek(date: D): number {
        return this.dateAdapter.getDayOfWeek(date);
    }

    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        return this.dateAdapter.getMonthNames(style);
    }

    getDateNames(): string[] {
        return this.dateAdapter.getDateNames();
    }

    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        return this.dateAdapter.getDayOfWeekNames(style);
    }

    getYearName(date: D): string {
        return this.dateAdapter.getYearName(date);
    }

    getFirstDayOfWeek(): number {
        return this.dateAdapter.getFirstDayOfWeek();
    }

    getNumDaysInMonth(date: D): number {
        return this.dateAdapter.getNumDaysInMonth(date);
    }

    clone(date: D): D {
        return this.dateAdapter.clone(date);
    }

    createDate(year: number, month: number, date: number): D {
        return this.dateAdapter.createDate(year, month, date);
    }

    today(): D {
        return this.dateAdapter.today();
    }

    parse(value: any, parseFormat: any): D {
        return this.dateAdapter.parse(value, parseFormat);
    }

    format(date: D, displayFormat: any): string {
        return this.dateAdapter.format(date, displayFormat);
    }

    addCalendarYears(date: D, years: number): D {
        return this.dateAdapter.addCalendarYears(date, years);
    }

    addCalendarMonths(date: D, months: number): D {
        return this.dateAdapter.addCalendarMonths(date, months);
    }

    addCalendarDays(date: D, days: number): D {
        return this.dateAdapter.addCalendarDays(date, days);
    }

    toIso8601(date: D): string {
        return this.dateAdapter.toIso8601(date);
    }

    isDateInstance(obj: any): boolean {
        return this.dateAdapter.isDateInstance(obj);
    }

    isValid(date: D): boolean {
        return this.dateAdapter.isValid(date);
    }

    invalid(): D {
        return this.dateAdapter.invalid();
    }

    override compareDate(first: D, second: D): number {
        return this.compareFunction(first, second);
    }
}
