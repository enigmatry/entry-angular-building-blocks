import { Component } from '@angular/core';
import { ButtonExampleComponent } from '../../examples/button/button-example/button-example.component';
import { DocumentationContentComponent } from '../../shared/documentation-content/documentation-content.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

@Component({
    selector: 'app-button-documentation',
    templateUrl: './button-documentation.component.html',
    imports: [
        DocumentationContentComponent,
        ExampleViewerComponent,
        ButtonExampleComponent
    ]
})
export class ButtonDocumentationComponent { }
