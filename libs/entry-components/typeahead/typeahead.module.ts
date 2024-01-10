import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryTypeaheadComponent } from './typeahead.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    EntryTypeaheadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  exports: [
    EntryTypeaheadComponent
  ]
})
export class EntryTypeaheadModule { }
