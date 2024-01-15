import { Observable } from 'rxjs';
import { SearchFilterBase } from '../search-filter-base.model';
import { ControlType } from '../control-type';
import { SelectOption } from '../select-option.model';

/**
 * Search filter select input field configuration. Select options can be provided as fixed list (`options`)
 * or observable (dynamic) list (`options$`).
 */
export class SelectSearchFilter<T> extends SearchFilterBase<T> {
  override controlType = ControlType.select;
  /** Fixed list of select filter options (default is empty list) */
  options: SelectOption<T>[] = [];
  /** Observable (dynamic) list of select filter options */
  options$: Observable<SelectOption<T>[]> | undefined;
  /**
   * Enables selection of multiple options (default is true).
   * If it is set to false, 'none selected' option becomes available as a first option.
   * */
  multiSelect = true;

  constructor(options: Partial<SelectSearchFilter<T>> = {}) {
    super(options);
    this.options = options.options;
    this.options$ = options.options$;
    this.multiSelect = options.multiSelect;
  }
}
