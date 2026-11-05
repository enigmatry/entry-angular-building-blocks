import { ControlType } from './control-type';
import { SearchFilterBase } from './search-filter-base.model';
import { SearchFilterParams } from './search-filter-params.type';
import { SearchFilterValue, SearchFilterValues } from './search-filter-values.type';
import { SelectSearchFilter } from './select/select-search-filter.model';

/** The model as it stood before a rebind, with the filters it was built from. */
export interface PreviousSearchFilterModel {
  source: readonly SearchFilterBase<unknown>[];
  value: SearchFilterValues;
}

/** Whether the filter's value is the array of everything selected, rather than a single key. */
export const isMultiSelect = (searchFilter: SearchFilterBase<unknown>): boolean =>
  searchFilter instanceof SelectSearchFilter && searchFilter.multiSelect;

/**
 * The value a filter holds when it is empty.
 *
 * @remarks Text filters get `''` rather than `null` so they stay inside the schema's string
 * narrowing from first render - with `null` the `maxLength` rule is inactive until the first
 * keystroke, and the `maxlength` attribute the forms API writes from it is absent, so a paste into
 * an empty filter would not be truncated.
 */
export const emptySearchFilterValue = (searchFilter: SearchFilterBase<unknown>): SearchFilterValue => {
  if (searchFilter.controlType === ControlType.text) {
    return '';
  }
  return isMultiSelect(searchFilter) ? [] : null;
};

/** The model one bound filter contributes, its declared value coerced away from `undefined`. */
export const searchFilterEntry = (searchFilter: SearchFilterBase<unknown>): [string, SearchFilterValue] =>
  [searchFilter.key, (searchFilter.value as SearchFilterValue | undefined) ?? emptySearchFilterValue(searchFilter)];

/** The kind of control a filter renders, which also fixes the shape of the value it holds. */
const controlKind = (searchFilter: SearchFilterBase<unknown>): string =>
  `${searchFilter.controlType}${isMultiSelect(searchFilter) ? ':multiple' : ''}`;

/** Whether two filters for one key would hold a value of the same shape. */
const holdsTheSameShape = (earlier: SearchFilterBase<unknown>, current: SearchFilterBase<unknown>): boolean =>
  controlKind(earlier) === controlKind(current);

/**
 * What the template tracks a rendered filter by, so a filter that changes kind gets a new control.
 *
 * @remarks Tracking by key alone would keep the same `mat-select` when a select turns multi-select,
 * and Material throws when `multiple` changes after initialization.
 */
export const searchFilterRenderIdentity = (searchFilter: SearchFilterBase<unknown>): string =>
  JSON.stringify([searchFilter.key, controlKind(searchFilter)]);

/**
 * The entry a filter takes when the filters are handed over again.
 *
 * @remarks What the user typed survives only while the filter declares the same value and keeps
 * the same shape. A new declared value wins, and so does a different kind of filter for the key:
 * a multi-select handed a text filter's string would be bound to a scalar, which Material rejects.
 */
export const carriedSearchFilterEntry = (
  searchFilter: SearchFilterBase<unknown>,
  previous: PreviousSearchFilterModel | undefined
): [string, SearchFilterValue] => {
  const earlier = previous?.source.find(candidate => candidate.key === searchFilter.key);
  // `Object.hasOwn`, not a plain read: a key such as `constructor` would otherwise find Object's own member.
  const typed = previous !== undefined && Object.hasOwn(previous.value, searchFilter.key)
    ? previous.value[searchFilter.key]
    : undefined;
  if (earlier === undefined || typed === undefined) {
    return searchFilterEntry(searchFilter);
  }
  if (earlier.value !== searchFilter.value || !holdsTheSameShape(earlier, searchFilter)) {
    return searchFilterEntry(searchFilter);
  }
  return [searchFilter.key, typed];
};

/** The entry a filter takes on `reset(values)`: the value given for its key, else the value it declares. */
export const restoredSearchFilterEntry = (
  searchFilter: SearchFilterBase<unknown>,
  values: SearchFilterParams
): [string, SearchFilterValue] => {
  const given = Object.hasOwn(values, searchFilter.key) ? values[searchFilter.key] as SearchFilterValue | undefined : undefined;
  if (given === undefined) {
    return searchFilterEntry(searchFilter);
  }
  return [searchFilter.key, given ?? emptySearchFilterValue(searchFilter)];
};
