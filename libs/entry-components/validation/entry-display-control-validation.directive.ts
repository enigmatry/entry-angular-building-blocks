import { Directive, ElementRef, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { EMPTY, startWith, switchMap, tap } from 'rxjs';
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
        // clear on switch, so a re-bound control cannot leave the previous one's message behind
        tap(() => this.element.nativeElement.innerText = ''),
        // `startWith` covers a control that is already invalid when bound, which is the normal state
        // straight after `setServerSideValidationErrors`. The guard covers a null control - every
        // search-filter template binds `form().get(key)!`, and a key with no control would otherwise
        // error this pipeline for good, since `toObservable` replays and never re-subscribes.
        switchMap(control => control ? control.statusChanges.pipe(startWith(control.status)) : EMPTY),
        takeUntilDestroyed()
      )
      .subscribe((controlStatus: FormControlStatus) => {
        const control = this.control();
        // Clearing on anything other than INVALID matters now that the text is written on bind:
        // master only ever wrote, so a message survived the field being corrected.
        this.element.nativeElement.innerText = controlStatus === 'INVALID'
          ? this.extractValidationMessages(control)
          : '';
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
