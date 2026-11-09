import { FieldTree, ValidationError } from '@angular/forms/signals';
import { SearchFilterServerError } from './search-filter-action.type';
import { SearchFilterValues } from './search-filter-values.type';

/** A server message as a submission error, on its filter's field when it names one and on the form otherwise. */
export const toSubmissionError = (
  field: FieldTree<SearchFilterValues>,
  error: SearchFilterServerError
): ValidationError.WithOptionalFieldTree => error.key === undefined
  ? { kind: 'serverError', message: error.message }
  : { kind: 'serverError', message: error.message, fieldTree: (field as Record<string, unknown>)[error.key] as FieldTree<unknown> };

/** The keys whose value changed between the submitted values and the current ones. */
export const changedKeys = (submitted: SearchFilterValues, current: SearchFilterValues): ReadonlySet<string> =>
  new Set([...Object.keys(submitted), ...Object.keys(current)].filter(key => submitted[key] !== current[key]));

/** Whether a server message no longer applies: its filter changed, or for a form-level message, any filter did. */
export const isStale = (error: SearchFilterServerError, changed: ReadonlySet<string>): boolean =>
  error.key === undefined ? changed.size > 0 : changed.has(error.key);
