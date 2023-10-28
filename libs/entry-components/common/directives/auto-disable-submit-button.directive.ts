import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, fromEvent, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NG_VALID_CLASS } from '../constants';

/**
 * Auto disable submit button when form is submitted, unless disabling is handled manually.
 * Directive is applied to 'button[type=submit]:not([disabled])'
 */
@Directive({
  standalone: true,
  selector: 'button[type=submit]:not([disabled])'
})
export class AutoDisableSubmitButtonDirective implements OnInit, OnDestroy {

  @Input() disableIntervalInMs = 2000;
  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef<HTMLButtonElement>) { }

  ngOnInit(): void {
    const form: HTMLFormElement = this.elementRef.nativeElement.closest('form');
    if (!form) {
      return;
    }
    fromEvent(form, 'submit')
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
        if (form.matches(NG_VALID_CLASS)) {
          this.disableSubmitButton(this.disableIntervalInMs);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private disableSubmitButton(disablePeriodInMs: number): void {
    const submitButton = this.elementRef.nativeElement;

    submitButton.disabled = true;

    timer(disablePeriodInMs)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => submitButton.disabled = false);
  }
}
