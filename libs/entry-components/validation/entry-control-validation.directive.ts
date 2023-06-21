import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ENTRY_VALIDATION_CONFIG, EntryValidationConfig } from './entry-validation-config.model';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FORM_FIELD_ERROR_KEY } from './entry-validation';

@Directive({
  selector: '[entryControlValidation]'
})
export class EntryControlValidationDirective implements OnInit, OnDestroy {
  @Input() control: AbstractControl;

  private _controlSubscription: Subscription | undefined;

  constructor(
    @Inject(ENTRY_VALIDATION_CONFIG) private readonly _config: EntryValidationConfig,
    private readonly _element: ElementRef) {}

  ngOnInit(): void {
    this._controlSubscription = this.control.statusChanges
      .subscribe((controlStatus: FormControlStatus) => {
        if (controlStatus === 'INVALID') {
          this._element.nativeElement.innerHTML = this.extractValidationMessages();
        }
      });
  }

  ngOnDestroy(): void {
    if (this._controlSubscription) {
      this._controlSubscription.unsubscribe();
    }
  }

  private extractValidationMessages(): string {
    if (!this.control.errors) {
      return '';
    }
    const errorsString = this._config.validationMessages
      .map(validationMessage => this.control.errors[validationMessage.name]
        ? typeof(validationMessage.message) === 'string'
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
