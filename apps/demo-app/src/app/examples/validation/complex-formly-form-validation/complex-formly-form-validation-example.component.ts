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
    children: [
      { name: 'Dragana' },
      { name: 'Jovana' },
      { name: 'Mila' }
    ]
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
          templateOptions: { label: 'First name' }
        },
        {
          key: 'lastName',
          type: 'input',
          templateOptions: { label: 'Last name' }
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
          templateOptions: { label: 'First name' }
        },
        {
          key: 'lastName',
          type: 'input',
          templateOptions: { label: 'Last name' }
        }
      ]
    },
    {
      key: 'children',
      defaultValue: [ undefined ],
      fieldArray: {
        key: 'children',
        fieldGroup: [
          {
            key: 'name'
          }
        ]
      }
      // fieldArray: {
      //   fieldGroup: [
      //     {
      //       key: 'name',
      //       type: 'input',
      //       templateOptions: { label: 'Name' }
      //     },
      //     {
      //       key: 'name',
      //       type: 'input',
      //       templateOptions: { label: 'Name' }
      //     },
      //     {
      //       key: 'name',
      //       type: 'input',
      //       templateOptions: { label: 'Name' }
      //     }
      //   ]
      // }
    }
  ];
  validationResult: any;

  constructor(private _validationService: ValidationService) {}

  submitForm() {
    this._validationService.submitWithComplexValidationErrors()
      .subscribe({
        error: (error: IValidationProblemDetails) => {
          handleValidationProblemDetails(this.form, error);
          this.validationResult = error;
        }
      });
  }
}
