import { NgModule, Provider } from '@angular/core';
import { EntryDateAdapter } from './entry-date-adapter';
import { EntryNativeDateAdapter } from './native-data-adapter';
import { DateAdapter, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME } from './entry-date-time';

export * from './entry-date-time';
export * from './entry-date-adapter';
export * from './native-data-adapter';
export * from './internal-date-time-adapter';

@NgModule({
    providers: [
        { provide: EntryDateAdapter, useClass: EntryNativeDateAdapter }
    ]
})
export class EntryNativeDateModule { }

@NgModule({
    providers: [provideEntryNativeDateAdapter()]
})
export class EntryMatNativeDateModule { }

export function provideEntryNativeDateAdapter(formats: MatDateFormats = MAT_NATIVE_DATE_FORMATS): Provider[] {
    return [
        { provide: DateAdapter, useClass: EntryNativeDateAdapter },
        { provide: ENTRY_MAT_DATE_TIME, useValue: formats }
    ]
}