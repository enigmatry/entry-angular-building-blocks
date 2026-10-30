import { inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  /** Closes the dialog with a result; the opener receives `undefined` when none is given */
  readonly close = (result?: TResult): void => this.dialogRef.close(result);

  /** Runs `work` while `submitting()` is true and ignores calls made until it settles; the dialog stays open unless `work` closes it */
  readonly submit = async(work: () => Promise<void>): Promise<void> => {
    if (this.submittingState()) {
      return;
    }
    this.submittingState.set(true);
    try {
      await work();
    } finally {
      this.submittingState.set(false);
    }
  };
}
