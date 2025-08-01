import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { provideEntryNativeTimeAdapter } from '@enigmatry/entry-components/common';
import { EntryDateTimePickerModule } from '@enigmatry/entry-components/date-time-picker';
import { provideEntryValidationConfig } from '@enigmatry/entry-components/validation';
import { BasicComponent } from './basic/basic.component';
import { DefaultTimeComponent } from './default-time/default-time.component';
import { DisableComponent } from './disable/disable.component';
import { MeridiemComponent } from './meridiem/meridiem.component';
import { MinMaxComponent } from './min-max/min-max.component';
import { SecondsComponent } from './seconds/seconds.component';
import { WithValidationComponent } from './with-validation/with-validation.component';

@NgModule({
  declarations: [
    BasicComponent,
    MinMaxComponent,
    DisableComponent,
    MeridiemComponent,
    SecondsComponent,
    DefaultTimeComponent,
    WithValidationComponent
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
    SecondsComponent,
    DefaultTimeComponent,
    WithValidationComponent
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_DATE_FNS_FORMATS
    },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    provideEntryNativeTimeAdapter({
      parse: {
        dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm']
      },
      display: {
        dateInput: 'dd-MM-yyyy HH:mm',
        monthYearLabel: 'LLL uuuu',
        dateA11yLabel: 'PP',
        monthYearA11yLabel: 'LLLL uuuu'
      }
    }),
    provideEntryValidationConfig({
      validationMessages: [
        { name: 'required', message: 'This field is required.' }
      ]
    })
  ]
})
export class DateTimePickerExampleModule { }