import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryDateTimePickerModule } from '@enigmatry/entry-components/date-time-picker';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyDateTimePickerComponent } from './formly-date-time-picker.component';

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
  ]
})
export class FormlyDateTimePickerModule { }
