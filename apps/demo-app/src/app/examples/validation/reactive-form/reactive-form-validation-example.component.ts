import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IValidationProblemDetails, setServerSideValidationErrors } from '@enigmatry/entry-components/validation';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-reactive-form-validation-example',
  templateUrl: './reactive-form-validation-example.component.html',
  styleUrls: ['./reactive-form-validation-example.component.scss'],
  standalone: false
})
export class ReactiveFormExampleComponent implements OnInit {
  form: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
  }>;

  validationResult: IValidationProblemDetails | undefined;
  private readonly defaultLength = 3;

  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _validationService: ValidationService = inject(ValidationService);

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstName: new FormControl('John', [Validators.required, Validators.minLength(this.defaultLength)]),
      lastName: new FormControl('Doe', [Validators.required, Validators.minLength(this.defaultLength)])
    });
  }

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
