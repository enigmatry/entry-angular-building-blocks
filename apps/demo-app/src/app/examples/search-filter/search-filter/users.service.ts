import { Service } from '@angular/core';
import { IValidationProblemDetails } from '@enigmatry/entry-components/validation';
import { Observable, of, throwError } from 'rxjs';
import { UserSearchParams } from './user-search-params';
import { User, LIST_OF_USERS } from './users';

/**
 * A service that provides some example user data to help showcase the filtering.
 * In a general case this service will call some API to retrieve the data.
 */
@Service()
export class UsersService {
  private data: Array<User>;

  constructor() {
    // Provided LIST_OF_USERS is a static list of User entries used to mock API response.
    this.data = LIST_OF_USERS;
  }

  readonly getUsernames = (): Observable<string[]> => of(this.data.map(x => x.userName));

  readonly getUsers = (searchParams: Partial<UserSearchParams> = {}): Observable<Array<User>> => {
    const validationError = this.validateSearchParams(searchParams);
    if (validationError) {
      return validationError;
    }

    const { name, occupation = [], username, country, dateOfBirth, score } = searchParams;
    let users = this.data;
    if (name) {
      const lowerName = name.toLowerCase();
      users = users.filter(x => x.firstName.toLowerCase().includes(lowerName) || x.lastName.toLowerCase().includes(lowerName));
    }
    if (occupation.length) {
      users = users.filter(x => occupation.includes(x.occupation));
    }
    if (username) {
      users = users.filter(x => x.userName === username);
    }
    if (country) {
      users = users.filter(x => x.country === country);
    }
    if (dateOfBirth) {
      users = users.filter(x => x.dateOfBirth >= dateOfBirth);
    }
    if (score) {
      users = users.filter(x => x.score === score);
    }
    return of(users);
  };

  private readonly validateSearchParams = (searchParams: Partial<UserSearchParams>): Observable<never> | null => {
    if (searchParams.dateOfBirth && searchParams.dateOfBirth > new Date()) {
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
