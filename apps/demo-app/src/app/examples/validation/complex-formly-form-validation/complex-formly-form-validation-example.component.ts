import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IValidationProblemDetails, handleValidationProblemDetails } from '@enigmatry/entry-components';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-complex-formly-form-validation-example',
  templateUrl: './complex-formly-form-validation-example.component.html',
  styleUrls: ['./complex-formly-form-validation-example.component.scss']
})
export class ComplexFormlyFormValidationExampleComponent {
  form = new FormGroup({});
  model = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe'
    },
    partnerInfo: {
      firstName: 'Johanna',
      lastName: 'Doe'
    },
    children: [ 'Dragana', 'Jovana', 'Mila' ]
  };
  fields: FormlyFieldConfig[] = [
    {
      type: 'field-set',
      key: 'personalInfo',
      templateOptions: { label: 'Personal Info' },
      fieldGroup: [
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
      ]
    },
    {
      type: 'field-set',
      key: 'partnerInfo',
      templateOptions: { label: 'Partner Info' },
      fieldGroup: [
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
      ]
    },
    {
      key: 'children',
      type: 'repeat-name',
      templateOptions: { label: 'Children' },
      fieldArray: {
        key: 'name',
        type: 'input',
        templateOptions: { label: 'Name', required: true }
      }
    }
  ];
  validationResult: any;

  constructor(private _validationService: ValidationService) {}

  submitForm() {
    this._validationService.submitWithComplexValidationErrors()
      .subscribe({
        error: (error: IValidationProblemDetails) => {
          /** Applies received server side validation errors to the form */
          handleValidationProblemDetails(this.form, error);
          this.validationResult = error;
        }
      });
  }
}