import { PathKind, REQUIRED, SchemaFn, SchemaPathTree, applyEach, applyWhenValue, maxLength, metadata, minLength,
  required, requiredError, validate } from '@angular/forms/signals';
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

/** Whether the filter holds an option's key, which the options are free to make `false`. */
const holdsAnOptionKey = (searchFilter: SearchFilterBase<unknown>): boolean =>
  searchFilter.controlType === ControlType.select || searchFilter.controlType === ControlType.autocomplete;

/**
 * The rules that make a required filter hold something.
 *
 * @remarks `required` counts `false` as empty, so a filter holding an option key gets the same
 * check written against `null` instead - an option whose key is `false` would never satisfy
 * `required`. The metadata is what marks the control required in the DOM, so it is set either way.
 */
const applyPresenceRules = (
  itemPath: SchemaPathTree<SearchFilterValue, PathKind.Child>,
  configFor: (key: string | undefined) => SearchFilterBase<unknown> | undefined,
  requiredMessage: string
): void => {
  metadata(itemPath, REQUIRED, context => configFor(context.key())?.required === true);

  required(itemPath, {
    when: context => {
      const searchFilter = configFor(context.key());
      return searchFilter?.required === true && !holdsAnOptionKey(searchFilter);
    },
    message: requiredMessage
  });

  validate(itemPath, context => {
    const searchFilter = configFor(context.key());
    const missing = searchFilter?.required === true && holdsAnOptionKey(searchFilter) && context.value() === null;
    return missing ? requiredError({ message: requiredMessage }) : undefined;
  });
};

/**
 * The rules over a filter's length, and the multi-select presence check that rides along.
 *
 * @remarks A length rule cannot be typed against the heterogeneous leaf, so the value is narrowed
 * first. That narrowing re-roots the path, which is why the key comes from `pathKeys` and not
 * `key()`. An empty multi-select is `[]`, which is not `null`, so its presence check lives here.
 */
const applyLengthRules = (
  itemPath: SchemaPathTree<SearchFilterValue, PathKind.Child>,
  configFor: (key: string | undefined) => SearchFilterBase<unknown> | undefined,
  messages: { requiredMessage: string; maxLengthMessage: string }
): void => {
  applyWhenValue(itemPath, (value): value is string => typeof value === 'string', textPath => {
    maxLength(
      textPath,
      context => configFor(context.pathKeys().at(lastKeyIndex))?.maxLength ?? 0,
      { message: messages.maxLengthMessage }
    );
  });

  applyWhenValue(itemPath, (value): value is readonly unknown[] => Array.isArray(value), arrayPath => {
    minLength(
      arrayPath,
      context => configFor(context.pathKeys().at(lastKeyIndex))?.required === true ? 1 : 0,
      { message: messages.requiredMessage }
    );
  });
};

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
    applyPresenceRules(itemPath, configFor, messages.requiredMessage);
    applyLengthRules(itemPath, configFor, messages);
  });
};
