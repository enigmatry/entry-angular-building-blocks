import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { EntryButtonModule } from '@enigmatry/entry-components/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EntrySearchFilterComponent } from './entry-search-filter.component';
import { TextSearchFilterComponent } from './text-search-filter/text-search-filter.component';
import { SelectSearchFilterComponent } from './select-search-filter/select-search-filter.component';
import { AutocompleteSearchFilterComponent } from './autocomplete-search-filter/autocomplete-search-filter.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    EntrySearchFilterComponent,
    TextSearchFilterComponent,
    SelectSearchFilterComponent,
    AutocompleteSearchFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    EntryButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule
  ],
  exports: [
    EntrySearchFilterComponent
  ]
})
export class EntrySearchFilterModule { }
