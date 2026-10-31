import { EntryDialog } from './entry-dialog';

/**
 * A component `EntryDialogService.open()` can open: it exposes its typed dialog handle as `dialog`.
 */
export interface EntryDialogContent<TData, TResult> {
  /** Handle created with `injectEntryDialog()`; it has to be a public field so `open()` can infer the data and result types */
  readonly dialog: EntryDialog<TData, TResult>;
}
