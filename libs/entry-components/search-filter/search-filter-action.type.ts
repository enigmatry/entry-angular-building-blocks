import { SearchFilterParams } from './search-filter-params.type';

/** A server-side validation message, optionally aimed at one filter. */
export interface SearchFilterServerError {
  /** The `SearchFilterBase.key` the message belongs to. Omit to show it above the filters. */
  key?: string;
  message: string;
}

/**
 * Runs the search. Return the server's validation messages to place them on their filters, or
 * nothing when the search succeeded.
 *
 * @remarks Returned messages are submission errors: Angular routes each to its field and clears it
 * as soon as the user edits that filter.
 */
export type SearchFilterAction =
  (values: SearchFilterParams) => Promise<readonly SearchFilterServerError[] | void>;
