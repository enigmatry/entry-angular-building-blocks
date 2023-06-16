import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryFormErrorsComponent } from './entry-form-errors.component';
import { EntryFormFieldErrorsComponent } from './entry-form-field-errors.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    EntryFormErrorsComponent,
    EntryFormFieldErrorsComponent
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
