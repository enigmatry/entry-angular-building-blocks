import { afterNextRender, DestroyRef, Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';

/**
 * Reaches around a no-op `ControlValueAccessor` to get at the control the host is really bound to.
 *
 * @remarks Exists only because `EntryDateTimePickerComponent` does not implement
 * `ControlValueAccessor`. It applies the no-op accessor host directive to satisfy Angular's
 * requirement that a `[formControl]`-bound element have an accessor, then uses this directive to
 * take the control and write to it directly. `keepNgModelInSync` patches up the `ngModel` case that
 * the no-op accessor breaks.
 *
 * Implementing `ControlValueAccessor` properly on the picker removes all three pieces - the no-op
 * accessor, this directive and the `ngModel` sync. That is a behavioural refactor rather than a
 * syntax change, so it is tracked separately from the signals migration.
 */
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

    /** Resolved per read: the owning form directive only populates its control in `ngOnChanges`, so memoising would lock in the fallback. */
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
