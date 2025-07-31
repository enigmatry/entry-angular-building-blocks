import { Injectable } from '@angular/core';
import { SearchFilterParams } from '@enigmatry/entry-components/search-filter';
import { IValidationProblemDetails } from '@enigmatry/entry-components/validation';
import { Observable, of, throwError } from 'rxjs';
import { User, LIST_OF_USERS } from './users';

/**
 * A service that provides some example user data to help showcase the filtering.
 * In a general case this service will call some API to retrieve the data.
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private data: Array<User>;

  constructor() {
    // Provided LIST_OF_USERS is a static list of User entries used to mock API response.
    this.data = LIST_OF_USERS;
  }

  getUsernames = (): Observable<string[]> => of(this.data.map(x => x.userName));

  getUsers(searchParams: SearchFilterParams): Observable<Array<User>> {
    const validationError = this.validateSearchParams(searchParams);
    if (validationError) {
      return validationError;
    }

    let users = this.data;

    if (!this.noFilterParam(searchParams, 'name')) {
      users = users?.filter(x => x.firstName?.toLowerCase().includes(searchParams['name'].toLowerCase())
        || x.lastName?.toLowerCase().includes(searchParams['name'].toLowerCase()));
    }
    if (!this.noFilterParam(searchParams, 'occupation')) {
      users = users?.filter(x => searchParams['occupation'] instanceof Array
        ? searchParams['occupation'].includes(x.occupation)
        : searchParams['occupation'] === x.occupation);
    }
    if (!this.noFilterParam(searchParams, 'username')) {
      users = users?.filter(x => searchParams['username'] instanceof Array
        ? searchParams['username'].includes(x.userName)
        : searchParams['username'] === x.userName);
    }

    if (!this.noFilterParam(searchParams, 'country')) {
      users = users.filter(x => x.country === searchParams['country'].key);
    }

    if (!this.noFilterParam(searchParams, 'dateOfBirth')) {
      users = users.filter(x => x.dateOfBirth >= searchParams['dateOfBirth']);
    }

    return of(users);
  }

  noFilterParam = (searchParams: SearchFilterParams, paramName: string): boolean => searchParams[paramName] === undefined
      || searchParams[paramName] === null
      || searchParams[paramName]?.length === 0;

  validateSearchParams = (searchParams: SearchFilterParams): Observable<never> | null => {
    if (searchParams['dateOfBirth'] && new Date(searchParams['dateOfBirth']) > new Date()) {
      const validationProblemDetails: IValidationProblemDetails = {
        title: 'Validation Error',
        status: 400,
        errors: {
          dateOfBirth: ['The date cannot be in the future.']
        }
      };
      return throwError(() => validationProblemDetails);
    }
    return null;
  };
}