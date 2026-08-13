import { Directive, ElementRef, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { FORM_FIELD_ERROR_KEY } from './entry-validation';
import { ENTRY_VALIDATION_CONFIG } from './entry-validation-config.model';

/**
 * A directive that displays configured validation messages or server side validations for given form control.
 * The messages are separated with coma(,) and displayed as _innerText_ value of host component.
 *
 * @example
 * ```html
 * <div entryDisplayControlValidation [control]="myForm.controls.firstName">
 * </div
 * ```
 */
@Directive({
    selector: '[entryDisplayControlValidation]',
    standalone: false
})
export class EntryDisplayControlValidationDirective {
  /** Form control for which the validation messages are displayed for. */
  readonly control = input.required<AbstractControl>();

  private readonly config = inject(ENTRY_VALIDATION_CONFIG);
  private readonly element = inject(ElementRef);

  constructor() {
    toObservable(this.control)
      .pipe(
        // clear on switch: the subscription below only ever writes on 'INVALID', so a re-bound
        // control would otherwise leave the previous control's message in the DOM
        tap(() => this.element.nativeElement.innerText = ''),
        switchMap(control => control.statusChanges),
        takeUntilDestroyed()
      )
      .subscribe((controlStatus: FormControlStatus) => {
        if (controlStatus === 'INVALID') {
          this.element.nativeElement.innerText = this.extractValidationMessages(this.control());
        }
      });
  }

  private readonly extractValidationMessages = (control: AbstractControl): string => {
    const errors = control.errors;
    if (!errors) {
      return '';
    }
    const errorsString = this.config.validationMessages
      .map(validationMessage => errors[validationMessage.name]
        ? typeof validationMessage.message === 'string'
          ? validationMessage.message : validationMessage.message(control)
        : ''
      )
      .filter(message => message !== '')
      .join(', ');

    const serverErrors = errors[FORM_FIELD_ERROR_KEY];
    const serverErrorsString = serverErrors instanceof Array ? serverErrors.join(', ') : '';

    return [errorsString, serverErrorsString].filter(x => x !== '').join(', ');
  };
}
