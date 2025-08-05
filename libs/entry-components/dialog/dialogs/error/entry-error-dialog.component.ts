import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../../entry-dialog-config.model';
import { EntryDialogComponent } from '../entry-dialog.component';
import { IEntryErrorDialogData } from './entry-error-dialog-data.interface';

@Component({
  selector: 'entry-error-dialog',
  templateUrl: './entry-error-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class EntryErrorDialogComponent extends EntryDialogComponent {
  errors: string[] = [];
  protected override readonly mdDialogRef: MatDialogRef<EntryDialogComponent> = inject(MatDialogRef<EntryDialogComponent>);
  override readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);
  readonly data: IEntryErrorDialogData = inject(MAT_DIALOG_DATA);

  constructor() {
    super();
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
