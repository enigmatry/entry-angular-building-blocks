import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryFormErrorsComponent } from './entry-form-errors.component';
import { MatInputModule } from '@angular/material/input';
import { EntryDisplayControlValidationDirective } from './entry-display-control-validation.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
