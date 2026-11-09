import { NgModule } from '@angular/core';
import { provideEntrySearchFilterConfig } from '@enigmatry/entry-components/search-filter';
import { DynamicSearchFilterExampleComponent } from './dynamic-search-filter/dynamic-search-filter-example.component';
import { SearchFilterExampleComponent } from './search-filter/search-filter-example.component';

@NgModule({
  imports: [
    SearchFilterExampleComponent,
    DynamicSearchFilterExampleComponent
  ],
  exports: [
    SearchFilterExampleComponent,
    DynamicSearchFilterExampleComponent
  ],
  providers: [
    provideEntrySearchFilterConfig({
      applyButtonText: 'Filter'
    })
  ]
})
export class SearchFilterExamplesModule { }
