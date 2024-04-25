import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EntryDateTimePickerModule } from "@enigmatry/entry-components/date-time-picker";
import { MinMaxComponent } from './min-max/min-max.component';
import { BasicComponent } from './basic/basic.component';
import { DisableComponent } from './disable/disable.component';
import { MeridiemComponent } from './meridiem/meridiem.component';
import { provideEntryNativeTimeAdapter } from "@enigmatry/entry-components/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from "@angular/material-date-fns-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SecondsComponent } from './seconds/seconds.component';

@NgModule({
  declarations: [
    BasicComponent,
    MinMaxComponent,
    DisableComponent,
    MeridiemComponent,
    SecondsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EntryDateTimePickerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    BasicComponent,
    DisableComponent,
    MinMaxComponent,
    MeridiemComponent,
    SecondsComponent
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_DATE_FNS_FORMATS
    },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    provideEntryNativeTimeAdapter({
      parse: {
        dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm'],
      },
      display: {
        dateInput: 'dd-MM-yyyy HH:mm',
        monthYearLabel: 'LLL uuuu',
        dateA11yLabel: 'PP',
        monthYearA11yLabel: 'LLLL uuuu',
      }
    })
  ]
})
export class DateTimePickerExampleModule { }