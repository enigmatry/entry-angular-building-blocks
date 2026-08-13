import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer } from '@angular/forms';
import { fromEvent } from 'rxjs';
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
export class ScrollToInvalidControlDirective {
  private readonly form = inject(ControlContainer, { self: true });
  private readonly elementRef = inject(ElementRef<HTMLFormElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Nothing can submit the form before it has rendered, so the listener is attached then rather
    // than in ngOnInit.
    afterNextRender(() => {
      fromEvent(this.elementRef.nativeElement, 'submit')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(_ => {
          if (this.form.invalid) {
            this.scrollToInvalidControl();
          }
        });
    });
  }

  private readonly scrollToInvalidControl = (): void => {
    const firstInvalidControl: HTMLElement | null =
      this.elementRef.nativeElement.querySelector(NG_INVALID_CLASS);

    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({
        behavior: 'smooth',
        block: 'center' // vertical alignment
      });
    }
  };
}
