import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyDateTimePickerComponent } from './formly-date-time-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { DATE_TIME_FORMATS } from './date-time-formats';
import { EntryDateTimePickerModule } from '@enigmatry/entry-components/date-time-picker';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@NgModule({
  declarations: [
    FormlyDateTimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EntryDateTimePickerModule,
    FormlyModule.forChild({
      types: [
        { name: 'datetimepicker', component: FormlyDateTimePickerComponent }
      ]
    })
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_TIME_FORMATS
    }
  ]
})
export class FormlyDateTimePickerModule { }
