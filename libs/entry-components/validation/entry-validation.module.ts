import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EntryDisplayControlValidationDirective } from './entry-display-control-validation.directive';
import { EntryFormErrorsComponent } from './entry-form-errors.component';

@NgModule({
  declarations: [
    EntryFormErrorsComponent,
    EntryDisplayControlValidationDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    EntryFormErrorsComponent,
    EntryDisplayControlValidationDirective
  ]
})
export class EntryValidationModule { }
