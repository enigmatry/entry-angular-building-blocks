import { FormControl } from '@angular/forms';

export class SearchFilterBase<T> {
  key: string;
  value: T | undefined;
  label: string;
  placeholder: string;
  type: string;
  order: number;
  controlType: string;
  maxLength: number;
  formControl: FormControl<T>;

  constructor(options: Partial<SearchFilterBase<T>> = {}) {
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
