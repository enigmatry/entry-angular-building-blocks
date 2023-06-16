import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationService } from '../validation.service';
import { IValidationProblemDetails, handleValidationProblemDetails } from '@enigmatry/entry-components';

@Component({
  selector: 'app-formly-form-validation-example',
  templateUrl: './formly-form-validation-example.component.html',
  styleUrls: ['./formly-form-validation-example.component.scss']
})
export class FormlyFormValidationExampleComponent {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      defaultValue: 'John',
      templateOptions: {
        label: 'First name'
      }
    },
    {
      key: 'lastName',
      type: 'input',
      defaultValue: 'Doe',
      templateOptions: {
        label: 'Last name'
      }
    }
  ];
  validationResult: any;

  constructor(private _validationService: ValidationService) {}

  submitForm() {
    this._validationService.submitWithValidationErrors()
      .subscribe({
        error: (error: IValidationProblemDetails) => {
          handleValidationProblemDetails(this.form, error);
          this.validationResult = error;
        }
      });
  }
}
