/* eslint-disable @angular-eslint/prefer-inject */
import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { EntryTimeAdapter } from './entry-time-adapter';

/**
 * Extends DateAdapter with time support. Used by EntryDateTimePicker component.
 */
@Injectable()
export class EntryDateTimeAdapter<D, L> extends DateAdapter<D, L> implements EntryTimeAdapter<D> {
	constructor(
		@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: L,
		@SkipSelf() private readonly dateAdapter: DateAdapter<D, L>,
		private readonly timeAdapter: EntryTimeAdapter<D>) {
		super();
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
		return this.dateAdapter.parse(value, parseFormat) as D;
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

	override getHours(date: D): number {
		return this.timeAdapter.getHours(date);
	}

	override getMinutes(date: D): number {
		return this.timeAdapter.getMinutes(date);
	}

	override getSeconds(date: D): number {
		return this.timeAdapter.getSeconds(date);
	}

	override setTime(date: D, hours: number, minutes: number, seconds: number): D {
		return this.timeAdapter.setTime(date, hours, minutes, seconds);
	}

	is12HoursClock(displayFormat: any): boolean {
		const now = this.format(this.today(), displayFormat).toLowerCase();
		return now.includes('a') || now.includes('p');
	}

	override compareDate(first: D, second: D): number {
		return this.getYear(first) - this.getYear(second) ||
			this.getMonth(first) - this.getMonth(second) ||
			this.getDate(first) - this.getDate(second) ||
			this.getHours(first) - this.getHours(second) ||
			this.getMinutes(first) - this.getMinutes(second) ||
			this.getSeconds(first) - this.getSeconds(second);
	}
}
