import { FormControl } from '@angular/forms';
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
  searchFunction: (input: string) => Observable<SelectOption<T>[]>;
  /** Minimum number of characters that must enter to trigger the search function(default is 3) */
  minimumCharacters = 3;
  /** Delay in typing between trigger the search function in milliseconds(default is 500) */
  toggleTime = 500;

  constructor(options: Partial<AutocompleteSearchFilter<T>> = {}) {
    super(options);
    this.searchFunction = options.searchFunction;
    this.placeholder = options.placeholder;
    this.label = options.label;
    this.minimumCharacters = options.minimumCharacters ?? 3;
  }
}
