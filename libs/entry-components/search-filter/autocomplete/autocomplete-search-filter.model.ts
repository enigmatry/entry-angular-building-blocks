import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';
import { SelectOption } from '../select-option.model';

/**
 * Search filter autocomplete field configuration.
 *
 * @remarks The filter's value is the selected option's `key`, not the whole option, so the emitted
 * params stay router-shaped. The displayed label comes from whichever option carries that key -
 * see `resolveLabel` for the case where the key was restored from a URL and no lookup has run.
 */
export class AutocompleteSearchFilter<T> extends SearchFilterBase<T> {
  override controlType = ControlType.autocomplete;

  /** Looks up the options matching what the user typed. Abort when the signal fires. */
  search: (input: string, abortSignal: AbortSignal) => Promise<readonly SelectOption<T>[]>;

  /**
   * Resolves the label for a value the user did not pick in this session - a key restored from a
   * URL, say. Falls back to `search(String(key))` and matching on key when not supplied.
   */
  resolveLabel: ((key: T, abortSignal: AbortSignal) => Promise<string | undefined>) | undefined;

  /** Minimum number of characters that must be entered to trigger the search (default is 3). */
  minimumCharacters: number;

  /** Delay in typing before triggering the search function, in milliseconds (default is 300). */
  debounceTime: number;

  private readonly defaultMinimumCharacters = 3;
  private readonly defaultDebounceTime = 300;

  constructor(options: Partial<AutocompleteSearchFilter<T>> = {}) {
    super(options);
    if (!options.search) {
      throw new Error('Search function must be provided for AutocompleteSearchFilter');
    }
    this.search = options.search;
    this.resolveLabel = options.resolveLabel;
    this.debounceTime = options.debounceTime ?? this.defaultDebounceTime;
    this.minimumCharacters = options.minimumCharacters ?? this.defaultMinimumCharacters;
  }
}
