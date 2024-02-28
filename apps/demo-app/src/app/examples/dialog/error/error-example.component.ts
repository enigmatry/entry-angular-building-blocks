import { Component } from '@angular/core';
import { EntryDialogService } from '@enigmatry/entry-components/dialog';
import { ValidationService } from '../../validation/validation.service';

@Component({
  selector: 'app-error-dialog-example',
  templateUrl: './error-example.component.html',
})
export class ErrorDialogExampleComponent {

  constructor(private _entryDialog: EntryDialogService, private service: ValidationService) { }

  openError() {
    this.service.submitWithValidationErrors()
      .subscribe({
        error: (err) => this._entryDialog.openError({
          title: `One or more validation errors occurred`,
          errors: err
        })
      });
    
  }
}
