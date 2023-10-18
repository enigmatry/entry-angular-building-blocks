import { ChangeDetectorRef, Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';

/**
 * Do we need to re-implement the default ControlValueAccessor?
 * https://github.com/angular/angular/blob/main/packages/forms/src/directives/default_value_accessor.ts
 *
 * Or is there a better solution?
 * https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55
 * https://unicorn-utterances.com/posts/angular-components-control-value-accessor
 */
@Component({
  selector: 'entry-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class EntryInputComponent implements ControlValueAccessor {

  @Input() label: string;

  @Input() placeholder: string;

  @Input() hint: string;

  // The HTML5 input types
  // https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types
  // examples
  // https://mdn.github.io/learning-area/html/forms/basic-input-examples/
  //
  @Input() type: 'text' | 'password' | 'email' | 'tel' = 'text';

  @Input() name: string;

  @Input() required = false;

  @Input() minLength?: number;

  @Input() maxLength?: number;

  control: FormControl<any>;

  private _value: any;

  constructor(
    @Optional() @Self() private _ngControl: NgControl,
    private _changeDetectorRef: ChangeDetectorRef) {

    if (_ngControl instanceof FormControlDirective ||
      _ngControl instanceof FormControlName ||
      _ngControl instanceof NgModel) {

      this._ngControl.valueAccessor = this;
      this.control = _ngControl.control;
    }
  }

  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    if (newValue !== this._value) {
      this._value = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }

  // handle InputEvent
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
  // The input event is fired every time the value of the element changes.
  // This is unlike the change event, which only fires when the value is committed.
  handleInput(event: any) {
    this.controlValueAccessorOnChange(event.target.value);
  }

  // implements ControlValueAccessor
  writeValue(value: any): void {
    this.value = value;
    this._changeDetectorRef.markForCheck();
  }

  // implements ControlValueAccessor
  registerOnChange(fn: any): void {
    this.controlValueAccessorOnChange = fn;
  }

  // implements ControlValueAccessor
  registerOnTouched(fn: any): void {
    this.controlValueAccessorOnTouched = fn;
  }

  controlValueAccessorOnChange = (_: any) => () => { };
  controlValueAccessorOnTouched = () => { };
}
