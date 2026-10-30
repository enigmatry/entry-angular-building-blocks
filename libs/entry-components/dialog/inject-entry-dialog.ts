import { EntryDialog } from './entry-dialog';

/**
 * Creates the typed handle to the dialog a component is rendered in. Assign it to a public `dialog` field so that
 * `EntryDialogService.open()` infers the data and result types from the component.
 *
 * @example
 * ```ts
 * readonly dialog = injectEntryDialog<EditUserData, User>();
 * ```
 */
export const injectEntryDialog = <TData = void, TResult = boolean>(): EntryDialog<TData, TResult> =>
  new EntryDialog<TData, TResult>();
