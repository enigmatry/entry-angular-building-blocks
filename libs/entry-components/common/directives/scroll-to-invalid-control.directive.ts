import { Directive, ElementRef, OnDestroy, OnInit, Self } from '@angular/core';
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
  selector: 'form[formGroup],form[ngForm]'
})
export class ScrollToInvalidControlDirective implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    @Self() private form: ControlContainer,
    private elementRef: ElementRef<HTMLFormElement>) { }

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
        block: 'center'  // vertical alignment
      });
    }
  }
}
