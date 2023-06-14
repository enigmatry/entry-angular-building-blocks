import { UntypedFormGroup } from '@angular/forms';
import { IValidationProblemDetails } from './validation-problem-details.interface';

const DEFAULT_KEY = 'general';

const copyServerSideValidationErrorsToForm = (form: UntypedFormGroup, error: IValidationProblemDetails) => {
    form.setErrors(null);
    const validationErrors = error?.errors;
    const formErrors: { [key: string]: string[] } = {};
    const fileKeys: string[] = ['fileName', 'filePath', 'fileId', 'File'];

    if (validationErrors) {
        // eslint-disable-next-line guard-for-in
        for (const key in validationErrors) {
            const  keySplitByCapital = key.split(/(?=[A-Z])/);

            if (form.controls[key] && !fileKeys.some(fileKey => fileKey === key || keySplitByCapital.includes(fileKey))) {
                const control = form.controls[key];
                control.setErrors({ fromServer: validationErrors[key] });
                control.markAsTouched();
            } else {
                const keyOrDefault = DEFAULT_KEY;
                formErrors[keyOrDefault] = formErrors[keyOrDefault]?.concat(validationErrors[key]) || validationErrors[key];
                form.setErrors(formErrors);
            }
        }
    }
};

export {
    copyServerSideValidationErrorsToForm
};
