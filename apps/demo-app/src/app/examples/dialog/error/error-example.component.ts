import { Component, inject } from '@angular/core';
import { EntryDialogService } from '@enigmatry/entry-components/dialog';
import { ValidationService } from '../../validation/validation.service';

@Component({
  selector: 'app-error-dialog-example',
  templateUrl: './error-example.component.html',
  standalone: false
})
export class ErrorDialogExampleComponent {
  private readonly _entryDialog: EntryDialogService = inject(EntryDialogService);
  private readonly service: ValidationService = inject(ValidationService);

  openError() {
    this.service.submitWithValidationErrors()
      .subscribe({
        error: err => this._entryDialog.openError({
          title: `One or more validation errors occurred`,
          errors: err
        })
      });
  }
}
