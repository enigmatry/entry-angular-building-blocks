/**
 * Arguments of `EntryDialogService.open()` after the component; `data` is required unless the dialog's data type accepts `undefined`.
 */
export type EntryDialogOpenArguments<TData> = undefined extends TData
  ? [data?: TData, disableClose?: boolean, cssClass?: string]
  : [data: TData, disableClose?: boolean, cssClass?: string];
