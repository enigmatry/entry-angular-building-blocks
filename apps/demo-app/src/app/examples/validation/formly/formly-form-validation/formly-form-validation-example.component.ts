import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationService } from '../../validation.service';
import { IValidationProblemDetails, setServerSideValidationErrors } from '@enigmatry/entry-components/validation';

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

  constructor(private _validationService: ValidationService) {}

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
