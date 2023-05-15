import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyDateTimePickerComponent } from './formly-date-time-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormlyModule } from '@ngx-formly/core';
import { NgxMatDateFnsAdapter } from './date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DATE_TIME_FORMATS } from './date-time-formats';
import { MatInputModule } from '@angular/material/input';
import { NGX_MAT_DATE_FORMATS, NgxMatDateAdapter, NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    FormlyDateTimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    FormlyModule.forChild({
      types: [
        { name: 'datetimepicker', component: FormlyDateTimePickerComponent, wrappers: ['form-field'] }
      ]
    })
  ],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatDateFnsAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: NGX_MAT_DATE_FORMATS,
      useValue: DATE_TIME_FORMATS
    }
  ]
})
export class FormlyDateTimePickerModule { }
