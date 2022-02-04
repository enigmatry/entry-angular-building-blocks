import { FormGroup } from '@angular/forms';
import {
    formLevelErrorKey,
    IServerValidationDetails
} from './server-validation.interface';

const attachServerValidationToForm = (error: IServerValidationDetails, form: FormGroup) => {
    form.setErrors(null);

    const validationErrors = error?.errors;
    const formErrors: { [key: string]: string[] } = {};

    if (validationErrors) {
        for (const key in validationErrors) {
            if (form.controls[key]) {
                const control = form.controls[key];
                control.setErrors({ controlFromServer: validationErrors[key] });
                control.markAsTouched();
            } else {
                formErrors[formLevelErrorKey] = formErrors[formLevelErrorKey]?.length > 0
                    ? formErrors[formLevelErrorKey].concat(validationErrors[key])
                    : validationErrors[key];
            }
        }
    } else {
        formErrors[formLevelErrorKey] = ['An error occurred on the server.'];
    }
    form.setErrors(formErrors);
    form.markAllAsTouched();
};

export { attachServerValidationToForm };
