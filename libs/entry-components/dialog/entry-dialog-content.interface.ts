import { EntryDialog } from './entry-dialog';

/**
 * A component `EntryDialogService.open()` can open: it exposes its typed dialog handle as `dialog`.
 */
export interface EntryDialogContent<TData, TResult> {
  readonly dialog: EntryDialog<TData, TResult>;
}
