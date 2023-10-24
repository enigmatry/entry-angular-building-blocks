import { Directive, ElementRef, HostListener, Input, OnDestroy, Self } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'form[entryForm]',
  standalone: true
})
export class EntryFormDirective implements OnDestroy {

  @Input() shouldScrollToInvalidControl = true;
  @Input() shouldDisableSubmitButton = true;
  @Input() disablePeriodInMs = 1000;

  readonly invalidFieldClassName = '.ng-invalid';
  readonly focusableElements = 'input:not([disabled]),select:not([disabled]),textarea:not([disabled])';
  readonly submitButtonSelector = 'button[type=submit]';

  private destroy$ = new Subject<void>();

  constructor(@Self() private form: ControlContainer,
    private elementRef: ElementRef<HTMLFormElement>) { }

  @HostListener('submit')
  submitListener() {
    const isValid = this.form.valid;
    if (isValid) {
      this.disableSubmitButton(this.disablePeriodInMs);
    } else {
      this.form.control.markAllAsTouched();
      this.scrollToInvalidControl();
    }
  }

  disableSubmitButton(disablePeriodInMs: number) {
    const submitButton: HTMLButtonElement =
      this.elementRef.nativeElement.querySelector(this.submitButtonSelector);

    if (submitButton) {
      submitButton.disabled = true;

      timer(disablePeriodInMs)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => submitButton.disabled = false);
    }
  }

  scrollToInvalidControl() {
    const firstInvalidControl: HTMLElement =
      this.elementRef.nativeElement.querySelector(this.invalidFieldClassName);

    if (firstInvalidControl) {
      // scroll into view
      firstInvalidControl.scrollIntoView({
        behavior: 'smooth',
        block: 'center'  // vertical alignment
      });
      // set focus on invalid control
      const focusableElement: HTMLElement = firstInvalidControl.matches(this.focusableElements)
        ? firstInvalidControl
        : firstInvalidControl.querySelector(this.focusableElements);
      if (focusableElement) {
        // focusableElement.focus();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
