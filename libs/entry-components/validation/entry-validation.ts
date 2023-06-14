import { UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { IValidationProblemDetails } from './validation-problem-details.interface';

const DEFAULT_KEY = 'general';
const FROM_SERVER_KEY = 'fromServer';

const copyServerSideValidationErrorsToForm = (form: UntypedFormGroup, error: IValidationProblemDetails) => {
    form.setErrors(null);
    const validationErrors = error?.errors;
    const formErrors: ValidationErrors = {};

    if (validationErrors) {
        for (const key in validationErrors) {
            if (form.controls[key]) {
                const control = form.controls[key];
                const fieldErrors = {} as ValidationErrors;
                fieldErrors[FROM_SERVER_KEY] = validationErrors[key];
                control.setErrors(fieldErrors);
                control.markAsTouched();
            } else {
                formErrors[DEFAULT_KEY] =
                    formErrors[DEFAULT_KEY]?.concat(validationErrors[key]) || validationErrors[key];
            }
        }
    } else {
        formErrors[DEFAULT_KEY] = [ `An error occurred on the server.` ];
    }

    form.setErrors(formErrors);
};

export {
    copyServerSideValidationErrorsToForm
};
