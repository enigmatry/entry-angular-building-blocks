import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryValidationModule } from '@enigmatry/entry-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ValidationExampleComponent } from './reactive-form-validation/reactive-form-validation-example.component';

@NgModule({
  declarations: [
    ValidationExampleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    EntryValidationModule
  ],
  exports: [
    ValidationExampleComponent
  ]
})
export class ValidationExampleModule { }
