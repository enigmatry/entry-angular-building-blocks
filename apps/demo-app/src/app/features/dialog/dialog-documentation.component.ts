import { Component } from '@angular/core';
import { AlertExampleComponent } from '../../examples/dialog/alert/alert-example.component';
import { ConfirmExampleComponent } from '../../examples/dialog/confirm/confirm-example.component';
import { CustomDialogExampleComponent } from '../../examples/dialog/custom/custom-dialog-example.component';
import { ErrorDialogExampleComponent } from '../../examples/dialog/error/error-example.component';
import { FormDialogExampleComponent } from '../../examples/dialog/form/form-dialog-example.component';
import { DocumentationContentComponent } from '../../shared/documentation-content/documentation-content.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

@Component({
    selector: 'app-dialog-documentation',
    templateUrl: './dialog-documentation.component.html',
    imports: [
        DocumentationContentComponent,
        ExampleViewerComponent,
        AlertExampleComponent,
        ConfirmExampleComponent,
        CustomDialogExampleComponent,
        ErrorDialogExampleComponent,
        FormDialogExampleComponent
    ]
})
export class DialogDocumentationComponent { }
