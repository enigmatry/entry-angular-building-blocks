import { afterNextRender, DestroyRef, Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControlDirective, FormControlName, NgControl, NgModel, UntypedFormControl } from '@angular/forms';

@Directive({
    standalone: true
})
export class NgControlAccessorDirective {
    ngControl = inject(NgControl, {
        optional: true,
        self: true
    });

    private resolvedControl: UntypedFormControl | undefined;
    private readonly destroyRef = inject(DestroyRef);

    /**
     * Control the host is bound to through the forms API.
     *
     * @remarks Resolved on first read instead of in ngOnInit: `NgControl.control` is only populated
     * once the owning form directive has wired itself up, and consumers read this well after that.
     */
    get control(): UntypedFormControl {
        this.resolvedControl ??= this.resolveControl();
        return this.resolvedControl;
    }

    constructor() {
        afterNextRender(() => this.keepNgModelInSync());
    }

    private readonly resolveControl = (): UntypedFormControl => {
        if (this.ngControl instanceof FormControlDirective ||
            this.ngControl instanceof FormControlName ||
            this.ngControl instanceof NgModel) {
            return this.ngControl.control;
        }
        return new UntypedFormControl();
    };

    private readonly keepNgModelInSync = (): void => {
        if (!(this.ngControl instanceof NgModel)) {
            return;
        }
        const ngModel = this.ngControl;
        ngModel.control.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(newValue => {
                if (ngModel.model !== newValue || ngModel.viewModel !== newValue) {
                    ngModel.viewToModelUpdate(newValue);
                }
            });
    };
}
