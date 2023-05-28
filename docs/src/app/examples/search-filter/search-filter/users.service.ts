import { Injectable } from '@angular/core';
import { PagedData, SortDirection } from '@enigmatry/entry-table';
import { User } from './api-reference';
import { GetUsersQuery } from './qet-users-query.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private data: PagedData<User>;

  constructor() {
    this.data = this.fetchData();
  }

  getUsers(query: GetUsersQuery): PagedData<User> {
    const start = Math.max(0, query.pageNumber - 1) * query.pageSize;
    const end = Math.min(start + query.pageSize, this.data.items?.length || 0);
    const pageData = Object.assign({}, this.data);

    const compareUsers = (a: User, b: User): number => {
      if (query.sortBy === 'userName') {
        return compareStrings(a.userName, b.userName);
      } else if (query.sortBy === 'firstName') {
        return compareStrings(a.firstName, b.firstName);
      } else if (query.sortBy === 'lastName') {
        return compareStrings(a.lastName, b.lastName);
      } else if (query.sortBy === 'dateOfBirth') {
        return compareDates(a.dateOfBirth, b.dateOfBirth);
      } else if (query.sortBy === 'createdOn') {
        return compareDates(a.createdOn, b.createdOn);
      } else if (query.sortBy === 'updatedOn') {
        return compareDates(a.updatedOn, b.updatedOn);
      }
      return 0;
    };

    const compareStrings = (a: string | undefined, b: string | undefined): number => {
      const sortDirection = sortDirectionAsNumber();
      return sortDirection * (a || '').localeCompare(b || '');
    };

    const compareDates = (a: Date | undefined, b: Date | undefined): number => {
      const sortDirection = sortDirectionAsNumber();
      let compare = 0;
      if ((a || new Date()).getTime() > (b || new Date()).getTime()) {
        compare = 1;
      } else if ((a || new Date()).getTime() < (b || new Date()).getTime()) {
        compare = -1;
      };

      return compare * sortDirection;
    };

    const sortDirectionAsNumber = (): number =>
      query.sortDirection === 'asc' as SortDirection ? 1 : query.sortDirection === 'desc' as SortDirection ? -1 : 0;

    pageData.items = this.data.items;
    if (!!query.name.value) {
      pageData.items = pageData.items?.filter(x => x.firstName?.toLowerCase().includes(query.name.value.toLowerCase())
        || x.lastName?.toLowerCase().includes(query.name.value.toLowerCase()));
    }
    if (!!query.email.value) {
      pageData.items = pageData.items?.filter(x => x.userName?.toLowerCase().includes(query.email.value.toLowerCase()));
    }
    pageData.items = pageData.items?.sort(compareUsers).slice(start, end);
    pageData.pageNumber = query.pageNumber;
    return pageData;
  }

  getUser(id: string): User | undefined {
    return this.data.items?.find(x => x.id === id);
  }

  addUser(user: User): void {
    user.id = '' + ((this.data.items?.length || 0) + 1);
    user.createdOn = new Date();
    this.data.items?.push(user);
    this.data.totalCount = (this.data.totalCount || 0) + 1;
  }

  updateUser(user: User): void {
    user.updatedOn = new Date();
  }

  private fetchData(): PagedData<User> {
    const records: PagedData<User> = {
      pageNumber: 1,
      pageSize: 5,
      totalCount: 11,
      items: [
        new User({
          id: '1',
          userName: 'emmett.oconnell@example.com',
          firstName: 'Emmett',
          lastName: 'O\'Connell',
          dateOfBirth: new Date(1992, 3, 3),
          createdOn: new Date(2020, 3, 2),
          updatedOn: new Date(2022, 2, 26)
        }),
        new User({
          id: '2',
          userName: 'lila.fairbanks@example.com',
          firstName: 'Lila',
          lastName: 'Fairbanks',
          dateOfBirth: new Date(1985, 5, 26),
          createdOn: new Date(2021, 12, 31),
          updatedOn: new Date(2023, 2, 24)
        }),
        new User({
          id: '3',
          userName: 'preston.mcallister@example.com',
          firstName: 'Preston',
          lastName: 'McAllister',
          dateOfBirth: new Date(1977, 9, 14),
          createdOn: new Date(2020, 11, 28),
          updatedOn: new Date(2022, 1, 1)
        }),
        new User({
          id: '4',
          userName: 'gracie.monroe@example.com',
          firstName: 'Gracie',
          lastName: 'Monroe',
          dateOfBirth: new Date(2000, 2, 8),
          createdOn: new Date(2021, 11, 13),
          updatedOn: new Date(2023, 1, 5)
        }),
        new User({
          id: '5',
          userName: 'silas.harrington@example.com',
          firstName: 'Silas',
          lastName: 'Harrington',
          dateOfBirth: new Date(1965, 11, 11),
          createdOn: new Date(2022, 1, 2),
          updatedOn: new Date(2023, 3, 1)
        }),
        new User({
          id: '6',
          userName: 'elodie.whitmore@example.com',
          firstName: 'Elodie',
          lastName: 'Whitmore',
          dateOfBirth: new Date(1996, 7, 22),
          createdOn: new Date(2020, 12, 21),
          updatedOn: new Date(2022, 3, 6)
        }),
        new User({
          id: '7',
          userName: 'conrad.sullivan@example.com',
          firstName: 'Conrad',
          lastName: 'Sullivan',
          dateOfBirth: new Date(1983, 0, 15),
          createdOn: new Date(2020, 10, 23),
          updatedOn: new Date(2023, 4, 2)
        }),
        new User({
          id: '8',
          userName: 'rosalind.espinoza@example.com',
          firstName: 'Rosalind',
          lastName: 'Espinoza',
          dateOfBirth: new Date(1973, 4, 19),
          createdOn: new Date(2020, 9, 8),
          updatedOn: new Date(2022, 2, 3)
        }),
        new User({
          id: '9',
          userName: 'nolan.baxter@example.com',
          firstName: 'Nolan',
          lastName: 'Baxter',
          dateOfBirth: new Date(1987, 6, 30),
          createdOn: new Date(2020, 12, 8),
          updatedOn: new Date(2022, 11, 13)
        }),
        new User({
          id: '10',
          userName: 'greta.underwood@example.com',
          firstName: 'Greta',
          lastName: 'Underwood',
          dateOfBirth: new Date(1994, 1, 21),
          createdOn: new Date(2020, 5, 25),
          updatedOn: new Date(2023, 3, 12)
        }),
        new User({
          id: '11',
          userName: 'clair.underwood@example.com',
          firstName: 'Clair',
          lastName: 'Underwood',
          dateOfBirth: new Date(1951, 1, 1),
          createdOn: new Date(2022, 3, 2),
          updatedOn: new Date(2022, 12, 17)
        })
      ]
    };

    return records;
  }
}
