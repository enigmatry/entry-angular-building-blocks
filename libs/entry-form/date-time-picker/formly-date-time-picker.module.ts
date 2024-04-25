import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyDateTimePickerComponent } from './formly-date-time-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { EntryDateTimePickerModule } from '@enigmatry/entry-components/date-time-picker';

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
