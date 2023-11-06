import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormExampleComponent } from './reactive-form-validation-example.component';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryValidationModule, provideEntryValidationConfig } from '@enigmatry/entry-components/validation';
import { SharedModule } from '../../../shared/shared.module';

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
  ],
  exports: [
    ReactiveFormExampleComponent
  ],
  providers: [
    provideEntryValidationConfig({
      validationMessages: [
        { name: 'required', message: 'This field is mandatory!' },
        { name: 'minlength', message: (control: AbstractControl) => `Minimal length is ${control.errors.minlength.requiredLength}!` }
      ]
    })
  ]
})
export class ReactiveFormValidationExampleModule { }
