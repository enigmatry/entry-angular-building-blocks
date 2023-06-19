import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormExampleComponent } from './reactive-form-validation-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ENTRY_VALIDATION_CONFIG, EntryValidationConfig, EntryValidationModule } from '@enigmatry/entry-components';
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
        validationMessages: [
          { name: 'required', message: 'This field is mandatory!' },
          { name: 'minlength', message: 'Maximal number of characters is 4.' }
        ]
      })
    }
  ]
})
export class ReactiveFormValidationExampleModule { }
