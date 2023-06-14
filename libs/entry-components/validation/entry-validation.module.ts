import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryFormErrorsComponent } from './entry-form-errors.component';

@NgModule({
  declarations: [
    EntryFormErrorsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EntryFormErrorsComponent
  ]
})
export class EntryValidationModule { }
