import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyDateTimePickerComponent } from './formly-date-time-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDateAdapter, NgxMatDatetimePickerModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
    FormlyDateTimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    FormlyModule.forChild({
      types: [
        { name: 'date-time-picker', component: FormlyDateTimePickerComponent, wrappers: ['form-field'] }
      ]
    })
  ]
})
export class FormlyDateTimePickerModule { }
