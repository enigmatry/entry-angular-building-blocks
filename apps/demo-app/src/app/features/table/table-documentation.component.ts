import { Component } from '@angular/core';
import { TableExampleComponent } from '../../examples/table/table-example/table-example.component';
import { DocumentationContentComponent } from '../../shared/documentation-content/documentation-content.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

@Component({
    selector: 'app-table-documentation',
    templateUrl: './table-documentation.component.html',
    imports: [
        DocumentationContentComponent,
        ExampleViewerComponent,
        TableExampleComponent
    ]
})
export class TableDocumentationComponent { }
