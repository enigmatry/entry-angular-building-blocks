import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryFormErrorsComponent } from './entry-form-errors.component';
import { EntryFormFieldErrorsComponent } from './entry-form-field-errors.component';
import { MatInputModule } from '@angular/material/input';
import { AsFieldValidationPipe } from './as-field-validation.pipe';

@NgModule({
  declarations: [
    EntryFormErrorsComponent,
    EntryFormFieldErrorsComponent,
    AsFieldValidationPipe
  ],
  imports: [
    CommonModule,
    MatInputModule
  ],
  exports: [
    EntryFormErrorsComponent,
    EntryFormFieldErrorsComponent
  ]
})
export class EntryValidationModule { }
