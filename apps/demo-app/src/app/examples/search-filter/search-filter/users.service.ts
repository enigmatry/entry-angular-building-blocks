import { Injectable } from '@angular/core';
import { SearchFilterParams } from '@enigmatry/entry-components/search-filter';
import { Observable, of } from 'rxjs';
import { User, Occupation, LIST_OF_USERS } from './user.model';

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

  getUsers(searchParams: SearchFilterParams): Array<User> {
    let users = this.data;

    if (!!searchParams.name) {
      users = users?.filter(x => x.firstName?.toLowerCase().includes(searchParams.name.toLowerCase())
        || x.lastName?.toLowerCase().includes(searchParams.name.toLowerCase()));
    }
    if (!!searchParams.email) {
      users = users?.filter(x => x.userName?.toLowerCase().includes(searchParams.email.toLowerCase()));
    }
    users = this.filterOccupation(users, searchParams);
    users = this.filterUsername(users, searchParams);

    return users;
  }

  private filterOccupation(users: User[], searchParams: SearchFilterParams): User[] {
    if (searchParams.occupation === undefined
      || searchParams.occupation.length === 0
      || searchParams.occupation[0] === undefined) {
      return users;
    }
    // if (!!searchParams.occupation?.length) {
    return users?.filter(x => searchParams.occupation instanceof Array
      ? searchParams.occupation.includes(x.occupation)
      : searchParams.occupation === x.occupation);
    // }
    // return users;
  }

  private filterUsername(users: User[], searchParams: SearchFilterParams): User[] {
    if (!!searchParams.username?.length) {
      users = users?.filter(x => searchParams.username instanceof Array
        ? searchParams.username.includes(x.userName)
        : searchParams.username === x.userName);
    }
    return users;
  }
}



