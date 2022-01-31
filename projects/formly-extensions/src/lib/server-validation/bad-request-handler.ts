import { FormGroup } from '@angular/forms';
import { IValidationDetails } from './validation-details.interface';

const handleBadRequest = (form: FormGroup, error: IValidationDetails) => {
    form.setErrors(null);
    const defaultKey = 'general';
    const validationErrors = error?.errors;
    const formErrors: { [key: string]: string[] } = {};

    if (validationErrors) {
        for (const key in validationErrors) {
            if (form.controls[key]) {
                console.log(`Setting error to control ${key}: ${validationErrors[key]}`);
                const control = form.controls[key];
                control.setErrors({ fromServer: validationErrors[key] });
                control.markAsTouched();
            } else {
                console.log(`Control with key '${key}' not found in form. Message: ${validationErrors[key]}`);
                formErrors[defaultKey] = validationErrors[key];
            }
        }
    }
    form.setErrors(formErrors);
    // else {
    //     console.log('No validation errors found from server');
    //     formErrors[defaultKey] = ['An error occurred on the server.'];
    // }
};

export { handleBadRequest };
