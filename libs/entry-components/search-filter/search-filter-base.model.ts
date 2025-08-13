import { FormControl } from '@angular/forms';
import { ControlType } from './control-type';

/**
 * Base Entry search filter input component.
 */
export class SearchFilterBase<T> {
  /** Unique search-filter input key */
  key: string;
  /** Default value to be displayed/selected in the input control */
  value: T | undefined;
  /** Label text to be displayed for the search-filter input control */
  label: string;
  /** Placeholder text for search-filter input control  */
  placeholder: string;
  /** Type of input control e.g. 'text' or 'email' */
  type: string;
  /** Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' */
  controlType: ControlType;
  /** Max text length to be entered in the input component (default is 256) */
  maxLength: number;
  /** A reference to the form control it represents */
  formControl: FormControl<T | undefined>;
  /** Optional function to format the value before displaying it in the input control */
  formatValue: ((value: T) => T) | undefined;

  private readonly maxPossibleLength = 256;

  constructor(options: Partial<SearchFilterBase<T>> = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.controlType = options.controlType || ControlType.text;
    this.type = options.type || ControlType.text;
    this.maxLength = options.maxLength || this.maxPossibleLength;
    this.formatValue = options.formatValue;
  }

  setValue(value: T | undefined) {
    this.value = value;
    if (this.formControl) {
      this.formControl.patchValue(value);
    }
  }

  toFormControl(): FormControl<T> {
    return new FormControl<T>(this.value);
  }
}
