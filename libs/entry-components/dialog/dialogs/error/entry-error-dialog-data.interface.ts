import { IValidationProblemDetails } from '@enigmatry/entry-components/validation';
import { EntryAlertDialogData } from '../alert/entry-alert-dialog-data.interface';

/**
 * Error dialog data: the errors are listed below the optional message.
 */
export interface EntryErrorDialogData extends Omit<EntryAlertDialogData, 'message'> {
  /** Dialog content message, shown above the errors */
  message?: string;
  /** Errors to display */
  errors: string[] | IValidationProblemDetails;
}
