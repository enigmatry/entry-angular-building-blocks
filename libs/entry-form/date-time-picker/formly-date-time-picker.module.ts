import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyDateTimePickerComponent } from './formly-date-time-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormlyModule } from '@ngx-formly/core';
import { DATE_TIME_FORMATS } from './date-time-formats';
import { MatInputModule } from '@angular/material/input';
import { NGX_MAT_DATE_FORMATS, NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';

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
      provide: NGX_MAT_DATE_FORMATS,
      useValue: DATE_TIME_FORMATS
    }
  ]
})
export class FormlyDateTimePickerModule { }
