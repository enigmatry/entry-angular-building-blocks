import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyCkeditorComponent } from './formly-ckeditor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    FormlyCkeditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormlyModule.forChild({
      types: [
        { name: 'ckeditor', component: FormlyCkeditorComponent, wrappers: ['form-field'] }
      ]
    })
  ]
})
export class FormlyCkeditorModule { }
