import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { injectEntryDialog } from '@enigmatry/entry-components/dialog';
import { IValidationProblemDetails, setServerSideValidationErrors } from '@enigmatry/entry-components/validation';
import { firstValueFrom, timer } from 'rxjs';
import { ValidationService } from '../../validation/validation.service';
import { FormDialogData } from './form-dialog-data.interface';
import { FormDialogResult } from './form-dialog-result.interface';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    standalone: false
})
export class FormDialogComponent {
    private static readonly saveDurationInMilliseconds = 1000;

    private readonly validationService: ValidationService = inject(ValidationService);
    readonly dialog = injectEntryDialog<FormDialogData, FormDialogResult>();

    protected readonly form = new FormGroup({
        firstName: new FormControl('', { nonNullable: true, validators: Validators.required }),
        lastName: new FormControl('', { nonNullable: true, validators: Validators.required })
    });

    private readonly saveOnServer = async(): Promise<void> => {
        await firstValueFrom(timer(FormDialogComponent.saveDurationInMilliseconds));
        if (this.dialog.data.simulateServerErrors) {
            await firstValueFrom(this.validationService.submitWithValidationErrors());
        }
    };

    protected readonly save = (): Promise<void> => this.dialog.submit(async() => {
        if (this.form.invalid) {
            return;
        }
        try {
            await this.saveOnServer();
            this.dialog.close(this.form.getRawValue());
        } catch(error) {
            setServerSideValidationErrors(error as IValidationProblemDetails, this.form);
        }
    });
}
