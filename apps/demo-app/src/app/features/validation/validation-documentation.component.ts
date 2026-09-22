import { Component } from '@angular/core';
import { FormlyValidationExampleModule } from '../../examples/validation/formly/formly-validation-example.module';
import { ReactiveFormValidationExampleModule } from '../../examples/validation/reactive-form/reactive-form-validation-example.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
    selector: 'app-validation-documentation',
    templateUrl: './validation-documentation.component.html',
    imports: [
        SharedModule,
        ReactiveFormValidationExampleModule,
        FormlyValidationExampleModule
    ]
})
export class ValidationDocumentationComponent { }
