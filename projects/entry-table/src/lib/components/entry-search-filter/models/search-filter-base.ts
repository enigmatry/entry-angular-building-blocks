export class SearchFilterBase<T> {
  key: string;
  value: T | undefined;
  label: string;
  placeholder: string;
  type: string;
  order: number;
  controlType: string;
  maxLength: number;

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
}
