import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationService } from '../../validation.service';
import { IValidationProblemDetails, handleValidationProblemDetails } from '@enigmatry/entry-components';

@Component({
  selector: 'app-formly-form-validation-example',
  templateUrl: './formly-form-validation-example.component.html',
  styleUrls: ['./formly-form-validation-example.component.scss']
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
      templateOptions: { label: 'First name', required: true }
    },
    {
      key: 'lastName',
      type: 'input',
      templateOptions: { label: 'Last name', required: true }
    }
  ];
  validationResult: any;

  constructor(private _validationService: ValidationService) {}

  submitForm() {
    this._validationService.submitWithValidationErrors()
      .subscribe({
        error: (error: IValidationProblemDetails) => {
          /** Applies received server side validation errors to the form */
          handleValidationProblemDetails(this.form, error);
          this.validationResult = error;
        }
      });
  }
}
