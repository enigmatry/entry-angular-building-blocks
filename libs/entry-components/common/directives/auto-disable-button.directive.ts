import { NumberInput, coerceNumberProperty } from '@angular/cdk/coercion';
import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, timer } from 'rxjs';
import { NG_VALID_CLASS } from '../constants';

const DEFAULT_DISABLE_INTERVAL_IN_MS = 2000;

/**
 * Auto disable button after click or submit with entry-auto-disable directive.
 * Directive is applied to 'button[entry-auto-disable]:not([disabled])'
 * Default auto disable interval is 2000ms (2sec)
 *
 * Usage
 * <button mat-button entry-submit-button entry-auto-disable type="submit">Submit</button>
 * or with auto disabled interval in milliseconds
 * <button mat-button entry-submit-button entry-auto-disable="5000" type="submit">Submit</button>
 */
@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'button[entry-auto-disable]:not([disabled])'
})
export class AutoDisableButtonDirective {
  private readonly elementRef: ElementRef<HTMLButtonElement> = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  /** How long the button stays disabled after a click or submit, in milliseconds. */
  readonly disableIntervalInMs = input(DEFAULT_DISABLE_INTERVAL_IN_MS, {
    alias: 'entry-auto-disable',
    transform: (value: NumberInput) => coerceNumberProperty(value, DEFAULT_DISABLE_INTERVAL_IN_MS)
  });

  constructor() {
    // The enclosing <form> has to be in the DOM before `closest` can find it, so this waits for the first render.
    afterNextRender(() => this.listenForDisableTrigger());
  }

  private readonly listenForDisableTrigger = (): void => {
    const button = this.elementRef.nativeElement;
    const isTypeSubmit = button.getAttribute('type') === 'submit';
    const form: HTMLFormElement | null = button.closest('form');

    if (isTypeSubmit && form) {
      // listen to form submit event
      fromEvent(form, 'submit')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(_ => {
          if (form.matches(NG_VALID_CLASS)) {
            this.disableButton(this.disableIntervalInMs());
          }
        });
      return;
    }
    // otherwise listen to click event
    fromEvent(button, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(_ => this.disableButton(this.disableIntervalInMs()));
  };

  private readonly disableButton = (disablePeriodInMs: number): void => {
    const button = this.elementRef.nativeElement;

    button.disabled = true;

    timer(disablePeriodInMs)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => button.disabled = false);
  };
}
