import { Observable } from 'rxjs';
import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';
import { SelectOption } from '../select-option.model';

/**
 * Search filter autocomplete field configuration. Options for the autocomplete are provided
 * indirectly via the search function that takes a string and returns an observable array of
 * SelectOption<T>
 */
export class AutocompleteSearchFilter<T> extends SearchFilterBase<SelectOption<T>> {
  override controlType = ControlType.autocomplete;
  /** Callback function for autocomplete options */
  search: (input: string | null) => Observable<SelectOption<T>[]>;
  /** Minimum number of characters that must enter to trigger the search function(default is 3) */
  minimumCharacters: number;
  /** Delay in typing before triggering the search function in milliseconds(default is 300) */
  debounceTime: number;

  private readonly defaultMinimumCharacters = 3;
  private readonly defaultDebounceTime = 300;

  constructor(options: Partial<AutocompleteSearchFilter<T>> = {}) {
    super(options);
    if (!options.search) {
      throw new Error('Search function must be provided for AutocompleteSearchFilter');
    }
    this.search = options.search;
    this.debounceTime = options.debounceTime ?? this.defaultDebounceTime;
    this.minimumCharacters = options.minimumCharacters ?? this.defaultMinimumCharacters;
  }
}
