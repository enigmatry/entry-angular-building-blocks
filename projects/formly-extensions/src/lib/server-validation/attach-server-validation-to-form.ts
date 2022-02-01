import { FormGroup } from '@angular/forms';
import { formLevelErrorKey, IServerValidationDetails } from './server-validation.interface';

const attachServerValidationToForm = (error: IServerValidationDetails, form: FormGroup) => {
    form.setErrors(null);

    const validationErrors = error?.errors;
    const formErrors: { [key: string]: string[] } = {};

    if (validationErrors) {
        for (const key in validationErrors) {
            if (form.controls[key]) {
                const control = form.controls[key];
                control.setErrors({ fromServer: validationErrors[key] });
                control.markAsTouched();
            } else {
                formErrors[formLevelErrorKey] = formErrors[formLevelErrorKey]?.length > 0
                    ? formErrors[formLevelErrorKey].concat(validationErrors[key])
                    : validationErrors[key];
            }
        }
    }
    form.setErrors(formErrors);
    // else {
    //     console.log('No validation errors found from server');
    //     formErrors[defaultKey] = ['An error occurred on the server.'];
    // }
};

export { attachServerValidationToForm };
