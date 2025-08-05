import { NumberInput, coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, fromEvent, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NG_VALID_CLASS } from '../constants';

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
export class AutoDisableButtonDirective implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  private _disableIntervalInMs = 2000;
  private readonly elementRef: ElementRef<HTMLButtonElement> = inject(ElementRef);

  @Input('entry-auto-disable')
  get disableIntervalInMs() {
    return this._disableIntervalInMs;
  }
  set disableIntervalInMs(value: NumberInput) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this._disableIntervalInMs = coerceNumberProperty(value, 2000);
  }

  ngOnInit(): void {
    const button = this.elementRef.nativeElement;
    const isTypeSubmit = button.getAttribute('type') === 'submit';
    const form: HTMLFormElement | null = button.closest('form');

    if (isTypeSubmit && form) {
      // listen to form submit event
      fromEvent(form, 'submit')
        .pipe(takeUntil(this._destroy$))
        .subscribe(_ => {
          if (form.matches(NG_VALID_CLASS)) {
            this.disableButton(this._disableIntervalInMs);
          }
        });
    } else {
      // otherwise listen to click event
      fromEvent(button, 'click')
        .pipe(takeUntil(this._destroy$))
        .subscribe(_ => this.disableButton(this._disableIntervalInMs));
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private disableButton(disablePeriodInMs: number): void {
    const button = this.elementRef.nativeElement;

    button.disabled = true;

    timer(disablePeriodInMs)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => button.disabled = false);
  }
}
