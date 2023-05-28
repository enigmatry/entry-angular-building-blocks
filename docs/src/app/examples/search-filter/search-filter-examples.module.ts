import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterExampleComponent } from './search-filter/search-filter-example.component';
import { SharedModule } from '../../shared/shared.module';
import { EntrySearchFilterModule } from 'projects/entry-components/search-filter/entry-search-filter.module';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    SearchFilterExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntrySearchFilterModule,
    MatTableModule
  ],
  exports: [
    SearchFilterExampleComponent
  ]
})
export class SearchFilterExamplesModule { }
