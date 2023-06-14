import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationExampleComponent } from './validation-example.component';
import { EntryValidationModule } from '@enigmatry/entry-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

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
