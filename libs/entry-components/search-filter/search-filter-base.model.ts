import { ControlType } from './control-type';

/**
 * Base Entry search filter input configuration.
 *
 * @remarks Configuration only. The form state lives in the search filter component model, and
 * nothing is written back onto these objects. To change a filter's value, hand the component a new
 * array of filters carrying the values you want.
 */
export class SearchFilterBase<T> {
  /** Unique search-filter input key. Also the key this filter's value takes in the emitted params. */
  key: string;
  /** Value to display/select in the input control. */
  value: T | undefined;
  /** Label text to be displayed for the search-filter input control */
  label: string;
  /** Placeholder text for search-filter input control  */
  placeholder: string;
  /** Type of input control e.g. 'text' or 'email' */
  type: string;
  /** Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' */
  controlType: ControlType;
  /** Max text length accepted by a text filter (default is 256). */
  maxLength: number;
  /** Whether a value must be given before the search can run (default is false). */
  required: boolean;
  /**
   * Optional function to format the value before displaying it in the input control.
   *
   * @remarks Takes `unknown`, not `T`: `T` in a function-parameter position on a property makes the
   * class contravariant under `strictFunctionTypes`, so a filter of a concrete value type would stop
   * being assignable to one of `unknown` and the filter arrays could not be typed. Narrow inside.
   */
  formatValue: ((value: unknown) => unknown) | undefined;

  private readonly maxPossibleLength = 256;

  constructor(options: Partial<SearchFilterBase<T>> = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.controlType = options.controlType || ControlType.text;
    this.type = options.type || 'text';
    this.maxLength = options.maxLength || this.maxPossibleLength;
    this.required = options.required ?? false;
    this.formatValue = options.formatValue;
  }
}
