import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryFormErrorsComponent } from './entry-form-errors.component';
import { EntryFormFieldErrorsComponent } from './entry-form-field-errors.component';
import { MatInputModule } from '@angular/material/input';
import { AsStringPipe } from './as-string.pipe';

@NgModule({
  declarations: [
    EntryFormErrorsComponent,
    EntryFormFieldErrorsComponent,
    AsStringPipe
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
