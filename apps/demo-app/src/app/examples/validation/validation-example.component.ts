import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ValidationService } from './validation.service';
import {
  IValidationProblemDetails,
  copyServerSideValidationErrorsToForm
} from '@enigmatry/entry-components';

@Component({
  selector: 'app-validation-example',
  templateUrl: './validation-example.component.html',
  styleUrls: ['./validation-example.component.scss']
})
export class ValidationExampleComponent implements OnInit {
  form: UntypedFormGroup | undefined;
  validationResult: any;

  field: AbstractControl;

  constructor(
    private _formBuilder: FormBuilder,
    private _validationService: ValidationService) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstName: ['John'],
      lastName: ['Doe']
    });
  }

  submitForm() {
    this._validationService.submitWithValidationErrors()
      .subscribe({
        error: (error: IValidationProblemDetails) => {
          copyServerSideValidationErrorsToForm(this.form, error);
          this.validationResult = error;
          const errors = this.form.get('firstName').errors;
        }
      });
  }
}
