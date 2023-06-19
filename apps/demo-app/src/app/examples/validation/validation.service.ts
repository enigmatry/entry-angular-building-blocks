/* eslint-disable @typescript-eslint/naming-convention */
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
        '': [
          'The combination of First & Last name already exists.',
          'And one more error, just to show off.'
        ],
        firstName: [
          'This name is not cool enough.',
          'Second error on field level, just in case.'
        ],
        lastName: ['Last name is also not cool.']
      }
    } as IValidationProblemDetails);
  }

  submitWithComplexValidationErrors(): Observable<any> {
    return throwError({
      errors: {
        '': ['Personal & Partner do not match.'],
        'personalInfo.firstName': ['This name is not cool enough.'],
        'personalInfo.lastName': ['Also not cool.'],
        'partnerInfo.firstName': ['Already exist.'],
        'partnerInfo.lastName': ['Cannot be the same last name.'],
        'children.0': ['Oldest'],
        'children.1': ['Middle'],
        'children.2': ['Good kid']
      }
    } as IValidationProblemDetails);
  }
}
