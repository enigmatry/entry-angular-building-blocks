import { SchemaFn, applyEach, applyWhenValue, maxLength, required } from '@angular/forms/signals';
import { ControlType } from './control-type';
import { SearchFilterBase } from './search-filter-base.model';
import { SearchFilterValue, SearchFilterValues } from './search-filter-values.type';
import { SelectSearchFilter } from './select/select-search-filter.model';

const lastKeyIndex = -1;

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
  return searchFilter instanceof SelectSearchFilter && searchFilter.multiSelect ? [] : null;
};

/** The model one bound filter contributes, its declared value coerced away from `undefined`. */
export const searchFilterEntry = (searchFilter: SearchFilterBase<unknown>): [string, SearchFilterValue] =>
  [searchFilter.key, (searchFilter.value as SearchFilterValue | undefined) ?? emptySearchFilterValue(searchFilter)];

/** A model holding every bound filter's declared value. */
export const buildSearchFilterModel = (
  searchFilters: readonly SearchFilterBase<unknown>[]
): SearchFilterValues => Object.fromEntries(searchFilters.map(searchFilterEntry));

/**
 * The rules for a filter set whose keys are not known until runtime.
 *
 * @remarks Rules go through `applyEach`, which merges into every key the model gains - including
 * keys added after `form()` ran. A rule written against `path[key]` could not: the schema is
 * compiled once, non-reactively, and a field path may not be used outside its owning schema.
 */
export const searchFilterSchema = (
  searchFilters: () => readonly SearchFilterBase<unknown>[],
  messages: { requiredMessage: string; maxLengthMessage: string }
): SchemaFn<SearchFilterValues> => rootPath => {
  const configFor = (key: string | undefined): SearchFilterBase<unknown> | undefined =>
    searchFilters().find(searchFilter => searchFilter.key === key);

  applyEach(rootPath, itemPath => {
    required(itemPath, {
      when: context => configFor(context.key())?.required === true,
      message: messages.requiredMessage
    });

    // A length rule cannot be typed against the heterogeneous leaf, so the value is narrowed first.
    // That narrowing re-roots the path, which is why the key comes from `pathKeys` and not `key()`.
    applyWhenValue(itemPath, (value): value is string => typeof value === 'string', textPath => {
      maxLength(
        textPath,
        context => configFor(context.pathKeys().at(lastKeyIndex))?.maxLength ?? 0,
        { message: messages.maxLengthMessage }
      );
    });
  });
};
