import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryValidationModule } from '@enigmatry/entry-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FormlyValidationExampleModule } from './formly/formly-validation-example.module';
import { ReactiveFormValidationExampleModule } from './reactive-form/reactive-form-validation-example.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EntryValidationModule,
    FormlyValidationExampleModule,
    ReactiveFormValidationExampleModule
  ],
  exports: [
    FormlyValidationExampleModule,
    ReactiveFormValidationExampleModule
  ]
})
export class ValidationExampleModule { }
