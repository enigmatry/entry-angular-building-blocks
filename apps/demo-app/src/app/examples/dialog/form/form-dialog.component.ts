import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, viewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { EntryDialogModule, injectEntryDialog } from '@enigmatry/entry-components/dialog';
// eslint-disable-next-line @stylistic/max-len
import { EntryValidationModule, IValidationProblemDetails, provideEntryValidationConfig, setServerSideValidationErrors } from '@enigmatry/entry-components/validation';
import { firstValueFrom, timer } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { FormDialogData } from './form-dialog-data.interface';
import { FormDialogResult } from './form-dialog-result.interface';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    imports: [SharedModule, EntryDialogModule, EntryValidationModule],
    providers: [provideEntryValidationConfig({ validationMessages: [{ name: 'required', message: 'This field is required.' }] })]
})
export class FormDialogComponent {
    private static readonly saveDurationInMilliseconds = 1000;
    private static readonly serverValidationErrors: IValidationProblemDetails = {
        errors: {
            '': ['The combination of first and last name already exists.'],
            firstName: ['This first name is already taken.']
        }
    };

    readonly dialog = injectEntryDialog<FormDialogData, FormDialogResult>();

    private readonly inputs = viewChildren(MatInput);

    protected readonly form = new FormGroup({
        firstName: new FormControl('', { nonNullable: true, validators: Validators.required }),
        lastName: new FormControl('', { nonNullable: true, validators: Validators.required })
    });

    private readonly focusFirstInvalidField = (): void => {
        const firstInvalidField = this.inputs().find(input => input.ngControl.invalid);
        firstInvalidField?.focus();
    };

    private readonly saveOnServer = async(): Promise<void> => {
        await firstValueFrom(timer(FormDialogComponent.saveDurationInMilliseconds));
        if (this.dialog.data.simulateServerErrors) {
            throw new HttpErrorResponse({ status: HttpStatusCode.BadRequest, error: FormDialogComponent.serverValidationErrors });
        }
    };

    protected readonly save = (): Promise<void> => this.dialog.submit(async() => {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.focusFirstInvalidField();
            return;
        }
        const name = this.form.getRawValue();
        try {
            await this.saveOnServer();
            this.dialog.close(name);
        } catch(error) {
            if (!(error instanceof HttpErrorResponse) || error.status !== HttpStatusCode.BadRequest) {
                throw error;
            }
            setServerSideValidationErrors(error.error, this.form);
            this.focusFirstInvalidField();
        }
    });
}
