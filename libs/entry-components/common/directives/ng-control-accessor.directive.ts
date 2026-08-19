import { afterNextRender, DestroyRef, Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';

@Directive({
    standalone: true
})
export class NgControlAccessorDirective {
    ngControl = inject(NgControl, {
        optional: true,
        self: true
    });

    private standaloneControl: AbstractControl | undefined;
    private readonly destroyRef = inject(DestroyRef);

    /**
     * Control the host is bound to through the forms API, or a standalone control when the host is
     * not bound to one. Resolved per read, because the owning form directive only populates its
     * control in `ngOnChanges` - memoising would lock in the fallback. Only the fallback is cached.
     *
     * Typed as `AbstractControl` because the directive cannot know the host's value type: a directive
     * takes no type arguments from the element it sits on. A host that does know casts to its own.
     */
    get control(): AbstractControl {
        const boundControl = this.boundControl();
        if (boundControl) {
            return boundControl;
        }
        this.standaloneControl ??= new FormControl(null);
        return this.standaloneControl;
    }

    constructor() {
        afterNextRender(() => this.keepNgModelInSync());
    }

    private readonly boundControl = (): AbstractControl | undefined => {
        if (this.ngControl instanceof FormControlDirective ||
            this.ngControl instanceof FormControlName ||
            this.ngControl instanceof NgModel) {
            // Typed non-null by the forms API, but genuinely undefined until its ngOnChanges runs.
            return this.ngControl.control as AbstractControl | undefined;
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
