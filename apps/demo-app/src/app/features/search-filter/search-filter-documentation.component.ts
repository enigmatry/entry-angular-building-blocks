import { Component } from '@angular/core';
import { DynamicSearchFilterExampleComponent } from '../../examples/search-filter/dynamic-search-filter/dynamic-search-filter-example.component';
import { SearchFilterExampleComponent } from '../../examples/search-filter/search-filter/search-filter-example.component';
import { DocumentationContentComponent } from '../../shared/documentation-content/documentation-content.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

@Component({
    selector: 'app-search-filter-documentation',
    templateUrl: './search-filter-documentation.component.html',
    imports: [
        DocumentationContentComponent,
        ExampleViewerComponent,
        DynamicSearchFilterExampleComponent,
        SearchFilterExampleComponent
    ]
})
export class SearchFilterDocumentationComponent { }
