/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, OnDestroy, OnInit, Self } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Scroll to first invalid control when form is submitted and invalid.
 * Directive is applied to form tag with [formGroup] or [ngForm] directive attached.
 */
@Directive({
  standalone: true,
  selector: 'form[formGroup],form[ngForm]'
})
export class ScrollToInvalidFormControlDirective implements OnInit, OnDestroy {

  private invalidControlClassName = '.ng-invalid';
  private destroy$ = new Subject<void>();

  constructor(@Self() private form: ControlContainer, private elementRef: ElementRef<HTMLFormElement>) { }

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
    const firstInvalidControl: HTMLElement =
      this.elementRef.nativeElement.querySelector(this.invalidControlClassName);

    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({
        behavior: 'auto',
        block: 'center'  // vertical alignment
      });
    }
  }
}
