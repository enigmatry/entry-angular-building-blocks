import { Injectable } from '@angular/core';
import { IValidationProblemDetails } from '@enigmatry/entry-components';
import { Observable, throwError } from 'rxjs';

/**
 * A service used to mock API validation error responses.
 */
@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  submitWithValidationErrors(): Observable<any> {
    return throwError({
      errors: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': [
          'The combination of First and Last already exists.',
          'And one more error, just to show off.'
        ],
        firstName: ['This name is not cool enough.']
      }
    } as IValidationProblemDetails);
  }
}
