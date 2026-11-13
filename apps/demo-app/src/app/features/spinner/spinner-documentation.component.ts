import { Component } from '@angular/core';
import { SpinnerExampleComponent } from '../../examples/spinner/spinner-example/spinner-example.component';
import { DocumentationContentComponent } from '../../shared/documentation-content/documentation-content.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

@Component({
    selector: 'app-spinner-documentation',
    templateUrl: './spinner-documentation.component.html',
    imports: [
        DocumentationContentComponent,
        ExampleViewerComponent,
        SpinnerExampleComponent
    ]
})
export class SpinnerDocumentationComponent { }
