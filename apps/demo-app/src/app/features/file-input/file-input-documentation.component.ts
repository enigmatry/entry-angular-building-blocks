import { Component } from '@angular/core';
import { FileInputBasicExampleComponent } from '../../examples/file-input/file-input-basic-example/file-input-basic-example.component';
import { FileInputFormExampleComponent } from '../../examples/file-input/file-input-form-example/file-input-form-example.component';
import {
  FileInputSignalFormExampleComponent
} from '../../examples/file-input/file-input-signal-form-example/file-input-signal-form-example.component';
import { FileInputValidationExampleComponent } from '../../examples/file-input/file-input-validation-example/file-input-validation-example.component';
import { DocumentationContentComponent } from '../../shared/documentation-content/documentation-content.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

@Component({
    selector: 'app-file-input-documentation',
    templateUrl: './file-input-documentation.component.html',
    imports: [
        DocumentationContentComponent,
        ExampleViewerComponent,
        FileInputBasicExampleComponent,
        FileInputFormExampleComponent,
        FileInputSignalFormExampleComponent,
        FileInputValidationExampleComponent
    ]
})
export class FileInputDocumentationComponent {}
