import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormExampleComponent } from './reactive-form-validation-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryValidationModule } from '@enigmatry/entry-components';
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
  ]
})
export class ReactiveFormValidationExampleModule { }
