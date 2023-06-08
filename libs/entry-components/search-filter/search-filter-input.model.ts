import { FormControl } from '@angular/forms';

/**
 * Base Entry search filter input component.
 */
export class SearchFilterInput<T> {
  /** Unique search-filter input key */
  key: string;
  /** Default value to be displayed/selected in the input control */
  value: T | undefined;
  /** Label text to be displayed for the search-filter input control */
  label: string;
  /** Placeholder text for search-filter input control  */
  placeholder: string;
  /** Type of input control e.g. 'email' */
  type: string;
  order: number;
  /** Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' */
  controlType: string;
  /** Max text length to be entered in the input component (default is 256) */
  maxLength: number;
  formControl: FormControl<T>;

  constructor(options: Partial<SearchFilterInput<T>> = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.maxLength = options.maxLength || 256;
  }

  setValue(value: T | undefined) {
    this.value = value;
    if (this.formControl) {
      this.formControl.patchValue(value);
    }
  }
}
