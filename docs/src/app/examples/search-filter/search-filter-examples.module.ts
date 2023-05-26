import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterExampleComponent } from './search-filter/search-filter-example.component';



@NgModule({
  declarations: [
    SearchFilterExampleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchFilterExampleComponent
  ]
})
export class SearchFilterExamplesModule { }
