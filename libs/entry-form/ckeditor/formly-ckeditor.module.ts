import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyCkeditorComponent } from './formly-ckeditor.component';

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
        {
          name: 'ckeditor',
          component: FormlyCkeditorComponent,
          wrappers: ['form-field'],
          defaultOptions: {
            templateOptions: {
              floatLabel: 'always'
            }
          }
        }
      ]
    })
  ]
})
export class FormlyCkeditorModule { }
