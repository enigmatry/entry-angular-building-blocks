import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FORM_FIELD_ERROR_KEY } from './entry-validation';

@Pipe({
  name: 'asString'
})
export class AsStringPipe implements PipeTransform {

  transform(value: ValidationErrors | null): string | undefined {
    if (value === null) {
      return undefined;
    }
    const errors = value[FORM_FIELD_ERROR_KEY];
    return errors instanceof Array ? errors.join(', ') : undefined;
  }
}
