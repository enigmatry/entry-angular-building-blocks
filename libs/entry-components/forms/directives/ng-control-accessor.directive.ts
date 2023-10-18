import { Directive, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControlDirective, FormControlName, NgControl, NgModel, UntypedFormControl } from '@angular/forms';
import { NoopCvaDirective } from './noop-cva.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// We want to use form control created via formControl, formControlName and ngModel directives
// in our custom input component and forward it to inner <input/> element.
// and avoid creating a redundant value accessor wrapper.
// https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55

@Directive({
  standalone: true
})
export class NgControlAccessorDirective implements OnInit, OnDestroy {

  control: UntypedFormControl | undefined;

  readonly ngControl = inject(NgControl, {
    optional: true,
    self: true
  });

  readonly noopCva = inject(NoopCvaDirective, {
    optional: true,
    self: true
  });

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Use form control created via formControl, formControlName and ngModel directives
    if (this.ngControl instanceof FormControlDirective
      || this.ngControl instanceof FormControlName
      || this.ngControl instanceof NgModel) {
      this.control = this.ngControl.control;
    }

    // We need to fix not emitting ngModelChange
    if (this.ngControl instanceof NgModel && this.noopCva) {
      const ngModel = this.ngControl as NgModel;
      ngModel.control.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(newValue => {
          if (ngModel.model !== newValue || ngModel.viewModel !== newValue) {
            ngModel.viewToModelUpdate(newValue);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
