import { Component } from '@angular/core';
import { SearchFilterExamplesModule } from '../../examples/search-filter/search-filter-examples.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
    templateUrl: './search-filter-documentation.component.html',
    imports: [
        SharedModule,
        SearchFilterExamplesModule
    ]
})
export class SearchFilterDocumentationComponent { }
