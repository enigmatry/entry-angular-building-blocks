import { Directive, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FORM_FIELD_ERROR_KEY } from './entry-validation';
import { ENTRY_VALIDATION_CONFIG } from './entry-validation-config.model';

/**
 * A directive that displays configured validation messages or server side validations for given form control.
 * The messages are separated with coma(,) and displayed as _innerHTML_ value of host component.
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
export class EntryDisplayControlValidationDirective implements OnInit, OnDestroy {
  /** Form control for which the validation messages are displayed for. */
  @Input() control: AbstractControl;

  private controlSubscription: Subscription | undefined;

  private readonly config = inject(ENTRY_VALIDATION_CONFIG);
  private readonly element = inject(ElementRef);

  ngOnInit(): void {
    this.controlSubscription = this.control.statusChanges
      .subscribe((controlStatus: FormControlStatus) => {
        if (controlStatus === 'INVALID') {
          this.element.nativeElement.innerText = this.extractValidationMessages();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }

  private extractValidationMessages(): string {
    if (!this.control.errors) {
      return '';
    }
    const errorsString = this.config.validationMessages
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map(validationMessage => this.control.errors![validationMessage.name]
        ? typeof validationMessage.message === 'string'
          ? validationMessage.message : validationMessage.message(this.control)
        : ''
      )
      .filter(message => message !== '')
      .join(', ');

    const serverErrors = this.control.errors[FORM_FIELD_ERROR_KEY];
    const serverErrorsString = serverErrors instanceof Array ? serverErrors.join(', ') : '';

    return [errorsString, serverErrorsString].filter(x => x !== '').join(', ');
  }
}
