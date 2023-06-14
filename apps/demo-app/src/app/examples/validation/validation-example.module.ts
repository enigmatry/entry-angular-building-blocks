import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationExampleComponent } from './validation-example.component';
import { EntryValidationModule } from '@enigmatry/entry-components';

@NgModule({
  declarations: [
    ValidationExampleComponent
  ],
  imports: [
    CommonModule,
    EntryValidationModule
  ],
  exports: [
    ValidationExampleComponent
  ]
})
export class ValidationExampleModule { }
