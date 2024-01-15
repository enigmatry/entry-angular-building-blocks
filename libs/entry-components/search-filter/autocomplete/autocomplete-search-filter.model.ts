import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';
import { SelectOption } from '../select-option.model';
import { Observable } from 'rxjs';

/**
 * Search filter autocomplete field configuration. Options for the autocomplete are provided
 * indirectly via the search function that takes a string and returns an observable array of
 * SelectOption<T>
 */
export class AutocompleteSearchFilter<T> extends SearchFilterBase<T>{
  controlType = ControlType.autocomplete;
  /** Callback function for autocomplete options */
  search: (input: string) => Observable<SelectOption<T>[]>;
  /** Minimum number of characters that must enter to trigger the search function(default is 3) */
  minimumCharacters: number;
  /** Delay in typing before triggering the search function in milliseconds(default is 300) */
  debounceTime: number;

  constructor(options: Partial<AutocompleteSearchFilter<T>> = {}) {
    super(options);
    this.search = options.search;
    this.placeholder = options.placeholder;
    this.label = options.label;
    this.debounceTime = options.debounceTime ?? 300;
    this.minimumCharacters = options.minimumCharacters ?? 3;
  }
}
