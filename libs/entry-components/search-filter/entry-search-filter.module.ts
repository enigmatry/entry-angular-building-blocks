import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { EntryButtonModule } from '@enigmatry/entry-components/button';
import { EntrySearchFilterComponent } from './entry-search-filter.component';
import { TextSearchFilterComponent } from './text/text-search-filter.component';
import { SelectSearchFilterComponent } from './select/select-search-filter.component';
import { AutocompleteSearchFilterComponent } from './autocomplete/autocomplete-search-filter.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DateTimeSearchFilterComponent } from './date-time/date-time-search-filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateSearchFilterComponent } from './date/date-search-filter.component';

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
    MatFormFieldModule
  ],
  exports: [
    EntrySearchFilterComponent
  ]
})
export class EntrySearchFilterModule { }
