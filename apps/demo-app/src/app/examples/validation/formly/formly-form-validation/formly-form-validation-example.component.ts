import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IValidationProblemDetails, setServerSideValidationErrors } from '@enigmatry/entry-components/validation';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationService } from '../../validation.service';

@Component({
    selector: 'app-formly-form-validation-example',
    templateUrl: './formly-form-validation-example.component.html',
    styleUrls: ['./formly-form-validation-example.component.scss'],
    standalone: false
})
export class FormlyFormValidationExampleComponent {
  form = new FormGroup({});
  model = {
    firstName: 'John',
    lastName: 'Doe'
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      templateOptions: { label: 'First name', required: true, minLength: 3 }
    },
    {
      key: 'lastName',
      type: 'input',
      templateOptions: { label: 'Last name', required: true, minLength: 3 }
    }
  ];
  validationResult: IValidationProblemDetails | undefined;
  private readonly _validationService: ValidationService = inject(ValidationService);

  submitForm() {
    this._validationService.submitWithValidationErrors()
      .subscribe({
        error: (error: IValidationProblemDetails) => {
          /** Applies received server side validation errors to the form */
          setServerSideValidationErrors(error, this.form);
          this.validationResult = error;
        }
      });
  }
}
