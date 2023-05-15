import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { EntrySearchFilterComponent } from './entry-search-filter.component';
import { EntrySearchFilterInputComponent } from './search-filter-input/search-filter-input.component';

@NgModule({
  declarations: [
    EntrySearchFilterComponent,
    EntrySearchFilterInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [
    EntrySearchFilterComponent
  ]
})
export class EntrySearchFilterModule { }
