import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NG_INVALID_CLASS } from '../constants';

/**
 * Scroll to first invalid control when form is submitted.
 * Directive is applied to 'form[formGroup],form[ngForm]' (reactive or template driven forms)
 */
@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'form[formGroup],form[ngForm]'
})
export class ScrollToInvalidControlDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private readonly form = inject(ControlContainer, { self: true });
  private readonly elementRef = inject(ElementRef<HTMLFormElement>);

  ngOnInit(): void {
    fromEvent(this.elementRef.nativeElement, 'submit')
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
        if (this.form.invalid) {
          this.scrollToInvalidControl();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private scrollToInvalidControl() {
    const firstInvalidControl: HTMLElement | null =
      this.elementRef.nativeElement.querySelector(NG_INVALID_CLASS);

    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({
        behavior: 'smooth',
        block: 'center' // vertical alignment
      });
    }
  }
}
