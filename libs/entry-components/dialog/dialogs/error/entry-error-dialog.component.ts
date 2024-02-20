import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { EntryDialogComponent } from '../entry-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEntryErrorDialogData } from './entry-error-dialog-data.interface';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../../entry-dialog-config.model';

@Component({
  selector: 'entry-error-dialog',
  templateUrl: './entry-error-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryErrorDialogComponent extends EntryDialogComponent {
  errors: string[] = [];
  constructor(
    protected readonly mdDialogRef: MatDialogRef<EntryDialogComponent>,
    @Inject(ENTRY_DIALOG_CONFIG) public readonly config: EntryDialogConfig,
    @Inject(MAT_DIALOG_DATA) public data: IEntryErrorDialogData) {
    super(mdDialogRef, config);
    this.extractValidationErrors();
  }

  private extractValidationErrors(): void {
    if (Array.isArray(this.data.errors)) {
      this.errors = this.data.errors as string[];
    } else if (this.data.errors.errors) {
      const validationErrors = this.data.errors.errors;
      this.errors = Object.entries(validationErrors)
        .map(values => values[1])
        .reduce((a, b) => a.concat(b), []);
    } else if (this.data.message) {
      this.errors = [this.data.message];
    }
  }
}
