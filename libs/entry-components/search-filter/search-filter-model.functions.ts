import { PathKind, REQUIRED, SchemaFn, SchemaPathTree, applyEach, applyWhenValue, maxLength, metadata, minLength,
  required, requiredError, validate } from '@angular/forms/signals';
import { ControlType } from './control-type';
import { SearchFilterBase } from './search-filter-base.model';
import { isMultiSelect } from './search-filter-entries.functions';
import { SearchFilterValue, SearchFilterValues } from './search-filter-values.type';

const lastKeyIndex = -1;

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
      context => {
        const searchFilter = configFor(context.pathKeys().at(lastKeyIndex));
        return searchFilter?.controlType === ControlType.text ? searchFilter.maxLength : undefined;
      },
      { message: messages.maxLengthMessage }
    );
  });

  applyWhenValue(itemPath, (value): value is readonly unknown[] => Array.isArray(value), arrayPath => {
    minLength(
      arrayPath,
      context => {
        const searchFilter = configFor(context.pathKeys().at(lastKeyIndex));
        // Only a multi-select's array is the selection; a single-select or autocomplete key may be an array.
        const requiredMultiSelect = searchFilter !== undefined && isMultiSelect(searchFilter) && searchFilter.required;
        return requiredMultiSelect ? 1 : 0;
      },
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
