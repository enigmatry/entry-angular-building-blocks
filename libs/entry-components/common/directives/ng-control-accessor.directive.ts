import { Directive, OnDestroy, OnInit, inject } from "@angular/core";
import { FormControlDirective, FormControlName, NgControl, NgModel, UntypedFormControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

@Directive({
    standalone: true
})
export class NgControlAccessorDirective implements OnDestroy, OnInit {
    control: UntypedFormControl;

    ngControl = inject(NgControl, {
        optional: true,
        self: true
    });

    private destroy$ = new Subject<void>();

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
                .pipe(takeUntil(this.destroy$))
                .subscribe(newValue => {
                    if (ngModel.model !== newValue || ngModel.viewModel !== newValue) {
                        ngModel.viewToModelUpdate(newValue);
                    }
                })
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}