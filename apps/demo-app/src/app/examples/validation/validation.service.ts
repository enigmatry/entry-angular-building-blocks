/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { IValidationProblemDetails } from '@enigmatry/entry-components/validation';
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
        '': [
          'The combination of First & Last name already exists.'
        ],
        firstName: [
          'First name is not cool enough.'
        ],
        lastName: ['Last name is also not cool.']
      }
    } as IValidationProblemDetails);
  }

  submitWithComplexValidationErrors(): Observable<any> {
    return throwError({
      errors: {
        '': ['Personal & Partner info do not match.'],
        'personalInfo.firstName': ['This name is not cool enough.'],
        'personalInfo.lastName': ['Also not cool.'],
        'partnerInfo.firstName': ['Already exists.'],
        'partnerInfo.lastName': ['Cannot be the same last name like in Personal info.'],
        'children.0': [`First child name is not 'Dragana'`],
        'children.1': [`Middle child name is not 'Jovana'`],
        'children.2': [`Last child name is not 'Mila'`]
      }
    } as IValidationProblemDetails);
  }
}
