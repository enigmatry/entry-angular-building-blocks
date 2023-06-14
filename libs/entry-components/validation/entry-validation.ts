import { UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { IValidationProblemDetails } from './validation-problem-details.interface';

const FORM_ERROR_KEY = 'general';
const FIELD_ERROR_KEY = 'fromServer';

const copyServerSideValidationErrorsToForm = (form: UntypedFormGroup, error: IValidationProblemDetails) => {
    form.setErrors(null);
    const validationErrors = error?.errors;
    const formErrors: ValidationErrors = {};

    if (validationErrors) {
        for (const key in validationErrors) {
            if (form.controls[key]) {
                const control = form.controls[key];
                const fieldErrors = {} as ValidationErrors;
                fieldErrors[FIELD_ERROR_KEY] = validationErrors[key];
                control.setErrors(fieldErrors);
                control.markAsTouched();
            } else {
                formErrors[FORM_ERROR_KEY] =
                    formErrors[FORM_ERROR_KEY]?.concat(validationErrors[key]) || validationErrors[key];
            }
        }
    } else {
        formErrors[FORM_ERROR_KEY] = [ `An error occurred on the server.` ];
    }

    form.setErrors(formErrors);
};

export {
    copyServerSideValidationErrorsToForm
};
