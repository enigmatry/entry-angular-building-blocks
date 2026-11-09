import { NgModule } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { provideEntryValidationConfig } from '@enigmatry/entry-components/validation';
import { ReactiveFormExampleComponent } from './reactive-form-validation-example.component';

@NgModule({
  imports: [
    ReactiveFormExampleComponent
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
