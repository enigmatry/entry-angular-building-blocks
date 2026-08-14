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

    private standaloneControl: UntypedFormControl | undefined;
    private readonly destroyRef = inject(DestroyRef);

    /**
     * Control the host is bound to through the forms API, or a standalone control when the host is
     * not bound to one.
     *
     * @remarks Resolved per read rather than memoised on the first one. `FormControlName._control`
     * and `FormControlDirective.form` are only populated once the owning form directive has run its
     * `ngOnChanges`, so an early read genuinely has nothing to return - memoising it would either
     * cache `undefined` behind a non-nullable type or lock in the standalone fallback for good. Only
     * the fallback is cached, so its identity is stable for as long as it is in use.
     */
    get control(): UntypedFormControl {
        const boundControl = this.boundControl();
        if (boundControl) {
            return boundControl;
        }
        this.standaloneControl ??= new UntypedFormControl();
        return this.standaloneControl;
    }

    constructor() {
        afterNextRender(() => this.keepNgModelInSync());
    }

    private readonly boundControl = (): UntypedFormControl | undefined => {
        if (this.ngControl instanceof FormControlDirective ||
            this.ngControl instanceof FormControlName ||
            this.ngControl instanceof NgModel) {
            return this.ngControl.control as UntypedFormControl | undefined;
        }
        return undefined;
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
