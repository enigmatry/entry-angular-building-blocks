import { Component } from '@angular/core';
import { FormlyValidationExampleModule } from '../../examples/validation/formly/formly-validation-example.module';
import { ReactiveFormExampleComponent } from '../../examples/validation/reactive-form/reactive-form-validation-example.component';
import { DocumentationContentComponent } from '../../shared/documentation-content/documentation-content.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

@Component({
    selector: 'app-validation-documentation',
    templateUrl: './validation-documentation.component.html',
    imports: [
        DocumentationContentComponent,
        ExampleViewerComponent,
        FormlyValidationExampleModule,
        ReactiveFormExampleComponent
    ]
})
export class ValidationDocumentationComponent { }
