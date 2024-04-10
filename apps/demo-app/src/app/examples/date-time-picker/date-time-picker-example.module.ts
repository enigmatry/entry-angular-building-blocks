import { NgModule } from "@angular/core";
import { DateTimePickerExampleComponent } from "./date-time-picker-example.component";
import { CommonModule } from "@angular/common";
import { EntryDateTimePickerModule } from "libs/entry-components/date-time-picker/entry-date-time-picker.module";
import { DateFnsAdapter } from "@angular/material-date-fns-adapter";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { ENTRY_MAT_DATE_TIME } from "@enigmatry/entry-components";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [
        DateTimePickerExampleComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        EntryDateTimePickerModule
    ],
    exports: [
        DateTimePickerExampleComponent
    ],
    providers: [

        {
            provide: DateAdapter,
            useClass: DateFnsAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        {
            provide: ENTRY_MAT_DATE_TIME,
            useValue: {
                matDateFormats: {
                    parse: {
                        dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm'],
                    },
                    display: {
                        dateInput: 'dd-MM-yyyy HH:mm',
                        monthYearLabel: 'LLL uuuu',
                        dateA11yLabel: 'PP',
                        monthYearA11yLabel: 'LLLL uuuu',
                    },
                },
                getHours(date: Date): number {
                    return date.getHours();
                },
                getMinutes(date: Date): number {
                    return date.getMinutes();
                },
                getSeconds(date: Date): number {
                    return date.getSeconds();
                },
                setTime(date: Date, hours: number, minutes: number, seconds: number): Date {
                    date.setHours(hours);
                    date.setMinutes(minutes);
                    date.setSeconds(seconds);
                    return date;
                }
            }
        }
    ]
})
export class DateTimePickerExampleModule { }