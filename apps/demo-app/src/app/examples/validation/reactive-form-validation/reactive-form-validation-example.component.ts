import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { IValidationProblemDetails, copyServerSideValidationErrorsToForm } from '@enigmatry/entry-components';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-reactive-form-validation-example',
  templateUrl: './reactive-form-validation-example.component.html',
  styleUrls: ['./reactive-form-validation-example.component.scss']
})
export class ReactiveFormExampleComponent implements OnInit {
  form: UntypedFormGroup | undefined;
  validationResult: any;

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
        }
      });
  }
}
