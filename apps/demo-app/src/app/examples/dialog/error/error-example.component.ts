import { Component, inject } from '@angular/core';
import { EntryDialogService } from '@enigmatry/entry-components/dialog';
import { IValidationProblemDetails } from '@enigmatry/entry-components/validation';
import { firstValueFrom } from 'rxjs';
import { ValidationService } from '../../validation/validation.service';

@Component({
  selector: 'app-error-dialog-example',
  templateUrl: './error-example.component.html',
  standalone: false
})
export class ErrorDialogExampleComponent {
  private readonly entryDialog: EntryDialogService = inject(EntryDialogService);
  private readonly service: ValidationService = inject(ValidationService);

  protected readonly openError = async(): Promise<void> => {
    try {
      await firstValueFrom(this.service.submitWithValidationErrors());
    } catch(error) {
      this.entryDialog.openError({
        title: `One or more validation errors occurred`,
        message: `Please correct the following and try again.`,
        errors: error as IValidationProblemDetails
      });
    }
  };
}
