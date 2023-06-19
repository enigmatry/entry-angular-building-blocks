import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IValidationProblemDetails, handleValidationProblemDetails } from '@enigmatry/entry-components';
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
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required]
    });
  }

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
