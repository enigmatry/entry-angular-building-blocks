import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EntryButtonModule } from '@enigmatry/entry-components/button';
import { EntryValidationModule } from '@enigmatry/entry-components/validation';
import { AutocompleteSearchFilterComponent } from './autocomplete/autocomplete-search-filter.component';
import { DateSearchFilterComponent } from './date/date-search-filter.component';
import { DateTimeSearchFilterComponent } from './date-time/date-time-search-filter.component';
import { EntrySearchFilterComponent } from './entry-search-filter.component';
import { SelectSearchFilterComponent } from './select/select-search-filter.component';
import { TextSearchFilterComponent } from './text/text-search-filter.component';

@NgModule({
  declarations: [
    EntrySearchFilterComponent,
    TextSearchFilterComponent,
    SelectSearchFilterComponent,
    AutocompleteSearchFilterComponent,
    DateTimeSearchFilterComponent,
    DateSearchFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    EntryButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    EntryValidationModule
  ],
  exports: [
    EntrySearchFilterComponent
  ]
})
export class EntrySearchFilterModule { }
