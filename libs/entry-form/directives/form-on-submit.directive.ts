import { Directive, ElementRef, HostListener, Input, OnDestroy, Self } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'form[entryForm]',
  standalone: true
})
export class FormOnSubmitDirective implements OnDestroy {

  @Input() shouldDisableSubmitButton = true;
  @Input() disablePeriodInMs = 2000; // ms

  readonly invalidControlClass = '.ng-invalid';
  readonly submitButtonSelector = 'button[type=submit]';
  readonly focusableInputs = 'input:not([disabled]),select:not([disabled]),textarea:not([disabled])';

  private destroy$ = new Subject<void>();

  constructor(
    @Self() private _form: ControlContainer,
    private _elementRef: ElementRef<HTMLFormElement>) { }

  @HostListener('submit')
  submitListener() {
    const isValid = this._form.valid;

    if (isValid) {
      if (this.shouldDisableSubmitButton) {
        this.disableSubmitButton(this.disablePeriodInMs);
      }
    } else {
      this.scrollToInvalidControl();
    }
  }

  disableSubmitButton(disablePeriodInMs: number): void {
    const submitButton: HTMLButtonElement =
      this._elementRef.nativeElement.querySelector(this.submitButtonSelector);

    if (submitButton) {
      submitButton.disabled = true;

      timer(disablePeriodInMs)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => submitButton.disabled = false);
    }
  }

  scrollToInvalidControl() {
    const firstInvalidControl: HTMLElement =
      this._elementRef.nativeElement.querySelector(this.invalidControlClass);

    if (firstInvalidControl) {
      // scroll into view
      firstInvalidControl.scrollIntoView({
        behavior: 'auto',
        block: 'center'  // vertical alignment
      });

      // set focus on invalid control
      const focusableElement: HTMLElement = firstInvalidControl.matches(this.focusableInputs)
        ? firstInvalidControl
        : firstInvalidControl.querySelector(this.focusableInputs);
      if (focusableElement) {
        timer(300)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => focusableElement.focus());
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
