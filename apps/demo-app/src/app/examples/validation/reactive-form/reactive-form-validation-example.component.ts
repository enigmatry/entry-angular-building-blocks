import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { EntryButtonDirective } from '@enigmatry/entry-components/button';
import { ScrollToInvalidControlDirective } from '@enigmatry/entry-components/common';
import {
  IValidationProblemDetails,
  setServerSideValidationErrors,
  EntryDisplayControlValidationDirective,
  EntryFormErrorsComponent,
  provideEntryValidationConfig
} from '@enigmatry/entry-components/validation';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-reactive-form-validation-example',
  templateUrl: './reactive-form-validation-example.component.html',
  styleUrl: './reactive-form-validation-example.component.scss',
  imports: [
    ScrollToInvalidControlDirective,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    EntryDisplayControlValidationDirective,
    EntryFormErrorsComponent,
    MatButton,
    EntryButtonDirective,
    JsonPipe
  ],
  providers: [
    provideEntryValidationConfig({
      validationMessages: [
        { name: 'required', message: 'This field is mandatory!' },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        { name: 'minlength', message: (control: AbstractControl) => `Minimal length is ${control!.errors!['minlength'].requiredLength}!` }
      ]
    })
  ]
})
export class ReactiveFormExampleComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly validationService: ValidationService = inject(ValidationService);

  readonly validationResult = signal<IValidationProblemDetails | undefined>(undefined);
  private readonly defaultLength = 3;

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
