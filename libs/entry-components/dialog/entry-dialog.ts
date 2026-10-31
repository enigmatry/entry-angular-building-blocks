import { inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogState } from '@angular/material/dialog';

/**
 * Typed handle to the dialog a component is rendered in. Create it with `injectEntryDialog()`.
 */
export class EntryDialog<TData = void, TResult = boolean> {
  /** Data the dialog was opened with */
  readonly data: TData = inject<TData>(MAT_DIALOG_DATA);

  private readonly dialogRef = inject<MatDialogRef<unknown, TResult>>(MatDialogRef);
  private readonly submittingState = signal(false);

  /** Whether the work passed to `submit()` is still running */
  readonly submitting = this.submittingState.asReadonly();

  /** Closes the dialog with a result; the opener receives `undefined` when none is given. Ignored once the dialog is closing, so the first close wins */
  readonly close = (result?: TResult): void => {
    if (this.isOpen()) {
      this.dialogRef.close(result);
    }
  };

  /** Runs `work` while `submitting()` is true; ignored while earlier work runs or once the dialog is closing. The dialog stays open unless `work` closes it */
  readonly submit = async(work: () => Promise<void>): Promise<void> => {
    if (this.submittingState() || !this.isOpen()) {
      return;
    }
    this.submittingState.set(true);
    try {
      await work();
    } finally {
      this.submittingState.set(false);
    }
  };

  private readonly isOpen = (): boolean => this.dialogRef.getState() === MatDialogState.OPEN;
}
