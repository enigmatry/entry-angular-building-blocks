import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryFormErrorsComponent } from './entry-form-errors.component';
import { MatInputModule } from '@angular/material/input';
import { EntryControlValidationDirective } from './entry-control-validation.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EntryFormErrorsComponent,
    EntryControlValidationDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    EntryFormErrorsComponent,
    EntryControlValidationDirective
  ]
})
export class EntryValidationModule { }
