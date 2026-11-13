import { Component } from '@angular/core';
import { PermissionsExampleComponent } from '../../examples/permissions/permissions-example/permissions-example.component';
import { DocumentationContentComponent } from '../../shared/documentation-content/documentation-content.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

@Component({
    selector: 'app-permissions-documentation',
    templateUrl: './permissions-documentation.component.html',
    imports: [
        DocumentationContentComponent,
        ExampleViewerComponent,
        PermissionsExampleComponent
    ]
})
export class PermissionsDocumentationComponent { }
