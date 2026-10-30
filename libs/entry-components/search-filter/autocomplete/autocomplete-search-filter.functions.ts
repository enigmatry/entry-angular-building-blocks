import { SelectOption } from '../select-option.model';
import { AutocompleteSearchFilter } from './autocomplete-search-filter.model';

/** The callbacks a lookup runs with, captured so that replacing one supersedes a lookup in flight. */
export interface LabelLookupParams<T> {
  key: T;
  resolveLabel: AutocompleteSearchFilter<T>['resolveLabel'];
  search: AutocompleteSearchFilter<T>['search'];
}

/** Reports a failed lookup. Not called for an aborted one, which is a supersession rather than a fault. */
export type ReportLookupFailure = (error: unknown, abortSignal: AbortSignal) => void;

// `debounced` asks for a promise that resolves when the wait is over, and without RxJS a timer is
// the only way to express one.
// eslint-disable-next-line promise/avoid-new
export const delay = (milliseconds: number): Promise<void> => new Promise(resolve => {
  setTimeout(resolve, milliseconds);
});

/** The options matching what the user typed, or none when the lookup failed. */
export const searchOptions = async<T>(
  search: AutocompleteSearchFilter<T>['search'],
  text: string,
  abortSignal: AbortSignal,
  report: ReportLookupFailure
): Promise<readonly SelectOption<T>[]> => {
  try {
    return await search(text, abortSignal);
  } catch(error) {
    report(error, abortSignal);
    return [];
  }
};

/** The label for a key the user did not pick here, through the resolver or a search that matches it. */
export const lookupLabel = async<T>(
  params: LabelLookupParams<T>,
  abortSignal: AbortSignal,
  report: ReportLookupFailure
): Promise<string | undefined> => {
  const { key, resolveLabel, search } = params;
  try {
    if (resolveLabel) {
      return await resolveLabel(key, abortSignal);
    }
    const matches = await search(String(key), abortSignal);
    return matches.find(option => option.key === key)?.label;
  } catch(error) {
    report(error, abortSignal);
    return undefined;
  }
};
