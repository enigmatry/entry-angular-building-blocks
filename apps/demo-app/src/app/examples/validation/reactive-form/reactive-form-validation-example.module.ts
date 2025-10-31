import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryValidationModule, provideEntryValidationConfig } from '@enigmatry/entry-components/validation';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormExampleComponent } from './reactive-form-validation-example.component';

@NgModule({
  declarations: [
    ReactiveFormExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EntryValidationModule
  ],
  exports: [
    ReactiveFormExampleComponent
  ],
  providers: [
    provideEntryValidationConfig({
      validationMessages: [
        { name: 'required', message: 'This field is mandatory!' },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        { name: 'minlength', message: (control: AbstractControl) => `Minimal length is ${control!.errors!['minlength'].requiredLength}!` }
      ]
    })
  ]
})
export class ReactiveFormValidationExampleModule { }
