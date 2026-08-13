import { DestroyRef, Directive, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControlDirective, FormControlName, NgControl, NgModel, UntypedFormControl } from '@angular/forms';

@Directive({
    standalone: true
})
export class NgControlAccessorDirective implements OnInit {
    control: UntypedFormControl;

    ngControl = inject(NgControl, {
        optional: true,
        self: true
    });

    private readonly destroyRef = inject(DestroyRef);

    ngOnInit() {
        if (this.ngControl instanceof FormControlDirective ||
            this.ngControl instanceof FormControlName ||
            this.ngControl instanceof NgModel) {
            this.control = this.ngControl.control;
        } else {
            this.control = new UntypedFormControl();
        }

        if (this.ngControl instanceof NgModel) {
            const ngModel = this.ngControl as NgModel;
            ngModel.control.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(newValue => {
                    if (ngModel.model !== newValue || ngModel.viewModel !== newValue) {
                        ngModel.viewToModelUpdate(newValue);
                    }
                });
        }
    }
}
