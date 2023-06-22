import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormExampleComponent } from './reactive-form-validation-example.component';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ENTRY_VALIDATION_CONFIG, EntryValidationConfig, EntryValidationModule } from '@enigmatry/entry-components/validation';
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
    {
      provide: ENTRY_VALIDATION_CONFIG,
      useFactory: () => new EntryValidationConfig({
        /** Configure validation messages for standard client side validators */
        validationMessages: [
          { name: 'required', message: 'This field is mandatory!' },
          { name: 'minlength', message: (control: AbstractControl) => `Minimal length is ${control.errors.minlength.requiredLength}!`}
        ]
      })
    }
  ]
})
export class ReactiveFormValidationExampleModule { }
