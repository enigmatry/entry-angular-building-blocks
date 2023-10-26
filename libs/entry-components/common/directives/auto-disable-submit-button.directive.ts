import { Directive, ElementRef, Host, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subject, fromEvent, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// selects submit button which is not disabled manually
const selector = 'button[type=submit]:not([disabled])';

/**
 * Submit button is disabled automatically for short period of time, after form is submitted.
 * Unless disabled is handled manually.
 */
@Directive({
  standalone: true,
  selector
})
export class AutoDisableSubmitButtonDirective implements OnInit, OnDestroy {

  @Input() disablePeriodInMs = 2000; // ms
  private destroy$ = new Subject<void>();

  constructor(@Host() @Optional() private form: ControlContainer,
    private elementRef: ElementRef<HTMLButtonElement>) { }

  ngOnInit(): void {
    if (!this.form) {
      return;
    }
    const formElement = this.elementRef.nativeElement.closest('form');
    if (!formElement) {
      return;
    }
    fromEvent(formElement, 'submit')
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
        if (this.form.valid) {
          this.disableSubmitButton(this.disablePeriodInMs);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private disableSubmitButton(disablePeriodInMs: number): void {
    const submitButton = this.elementRef.nativeElement;

    timer(disablePeriodInMs)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => submitButton.disabled = false);
  }
}
