import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { SearchFilterRoutingModule } from './search-filter-routing.module';
import { SearchFilterComponent } from './search-filter.component';
import { SearchFilterExamplesModule } from '../../examples/search-filter/search-filter-examples.module';


@NgModule({
  declarations: [
    SearchFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SearchFilterRoutingModule,
    SearchFilterExamplesModule
  ]
})
export class SearchFilterModule { }
