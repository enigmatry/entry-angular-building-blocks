import { IValidationProblemDetails } from '@enigmatry/entry-components/validation';
import { IEntryAlertDialogData } from '../alert/entry-alert-dialog-data.interface';

/**
 * Error dialog data.
 */
export interface IEntryErrorDialogData extends IEntryAlertDialogData {
  /** Errors to display */
  errors: string[] | IValidationProblemDetails;
}
