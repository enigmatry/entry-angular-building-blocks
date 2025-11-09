import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatError, MatInputModule } from '@angular/material/input';
import { EntryDisplayControlValidationDirective } from './entry-display-control-validation.directive';
import { EntryFormErrorsComponent } from './entry-form-errors.component';

@NgModule({
  declarations: [
    EntryFormErrorsComponent,
    EntryDisplayControlValidationDirective
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatError
  ],
  exports: [
    EntryFormErrorsComponent,
    EntryDisplayControlValidationDirective
  ]
})
export class EntryValidationModule { }
