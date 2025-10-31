/* eslint-disable @typescript-eslint/no-empty-function */
import { Directive } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: NoopControlValueAccessorDirective
        }
    ]
})
export class NoopControlValueAccessorDirective implements ControlValueAccessor {
    writeValue = (_obj: any): void => { };
    registerOnChange = (_fn: any): void => { };
    registerOnTouched = (_fn: any): void => { };
    setDisabledState = (_isDisabled: boolean): void => { };
}