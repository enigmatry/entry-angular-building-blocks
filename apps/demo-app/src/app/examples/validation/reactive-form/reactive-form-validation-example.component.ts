import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IValidationProblemDetails, setServerSideValidationErrors } from '@enigmatry/entry-components/validation';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-reactive-form-validation-example',
  templateUrl: './reactive-form-validation-example.component.html',
  styleUrl: './reactive-form-validation-example.component.scss',
  standalone: false
})
export class ReactiveFormExampleComponent {
  readonly validationResult = signal<IValidationProblemDetails | undefined>(undefined);
  private readonly defaultLength = 3;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly validationService: ValidationService = inject(ValidationService);

  // Nothing here depends on a lifecycle moment, so the form is built with the field.
  form: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
  }> = this.formBuilder.group({
    firstName: new FormControl('John', [Validators.required, Validators.minLength(this.defaultLength)]),
    lastName: new FormControl('Doe', [Validators.required, Validators.minLength(this.defaultLength)])
  });

  submitForm() {
    this.validationService.submitWithValidationErrors()
      .subscribe({
        error: (error: IValidationProblemDetails) => {
          /** Applies received server side validation errors to the form */
          setServerSideValidationErrors(error, this.form);
          this.validationResult.set(error);
        }
      });
  }

  readonly reset = (): void => {
    this.form.reset();
    this.validationResult.set(undefined);
  };
}
