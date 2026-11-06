import { Signal, isSignal, signal } from '@angular/core';
import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';
import { SelectOption } from '../select-option.model';

const toOptionsSignal = <T>(options: SelectSearchFilterOptions<T> | undefined): Signal<readonly SelectOption<T>[]> => {
  if (options === undefined) {
    return signal([]);
  }
  return isSignal(options) ? options : signal(options);
};

/** Either a fixed option list or a reactive one. */
export type SelectSearchFilterOptions<T> = readonly SelectOption<T>[] | Signal<readonly SelectOption<T>[]>;

/**
 * Search filter select input field configuration.
 *
 * @remarks Options are a signal, so a list that arrives later is bound rather than piped: pass a
 * `signal`, a `computed`, a `resource().value`, or `toSignal(source$)`. A plain array is accepted
 * and wrapped, so a fixed list needs no ceremony.
 */
export class SelectSearchFilter<T> extends SearchFilterBase<T> {
  override controlType = ControlType.select;

  /** The options to choose from (default is an empty list). */
  readonly options: Signal<readonly SelectOption<T>[]>;

  /** Enables selection of multiple options (default is false). */
  multiSelect: boolean;

  /**
   * Whether a single-select filter offers a 'none selected' option as its first entry
   * (default is true).
   */
  showNoneOption: boolean;

  constructor(options: Partial<Omit<SelectSearchFilter<T>, 'options'>> & { options?: SelectSearchFilterOptions<T> } = {}) {
    super(options as Partial<SearchFilterBase<T>>);
    this.options = toOptionsSignal(options.options);
    this.multiSelect = options.multiSelect ?? false;
    this.showNoneOption = options.showNoneOption ?? true;
  }
}

