import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FORM_FIELD_ERROR_KEY } from './entry-validation';
import { ENTRY_VALIDATION_CONFIG, EntryValidationConfig } from './entry-validation-config.model';

@Pipe({
  name: 'asString'
})
export class AsStringPipe implements PipeTransform {
  constructor(@Inject(ENTRY_VALIDATION_CONFIG) public readonly config: EntryValidationConfig) {}

  transform(value: ValidationErrors | null | undefined): string | undefined {
    if (!value) {
      return undefined;
    }

    const errorsString = this.config.validationMessages
      .map(validationMessage => value[validationMessage.name]
        ? typeof(validationMessage.message) === 'string'
          ? validationMessage.message : validationMessage.message()
        : ''
      )
      .filter(message => message !== '')
      .join(', ');

    const serverErrors = value[FORM_FIELD_ERROR_KEY];
    const serverErrorsString = serverErrors instanceof Array ? serverErrors.join(', ') : '';

    return [errorsString, serverErrorsString].filter(x => x !== '').join(', ');
  }
}
