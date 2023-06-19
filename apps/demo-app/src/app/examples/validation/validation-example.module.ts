import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryValidationModule } from '@enigmatry/entry-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormExampleComponent } from './reactive-form-validation/reactive-form-validation-example.component';
import { FormlyValidationExampleModule } from './formly/formly-validation-example.module';

@NgModule({
  declarations: [
    ReactiveFormExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EntryValidationModule,
    FormlyValidationExampleModule
  ],
  exports: [
    ReactiveFormExampleComponent,
    FormlyValidationExampleModule
  ]
})
export class ValidationExampleModule { }
