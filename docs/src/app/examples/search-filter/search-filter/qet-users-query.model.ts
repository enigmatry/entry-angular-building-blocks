// TODO: import { SearchFilterInput } from '@enigmatry/entry-components/search-filter';
import { SearchFilterInput } from 'projects/entry-components/search-filter/public-api';
import { SearchFilterPagedQuery } from '@enigmatry/entry-table';

export class GetUsersQuery extends SearchFilterPagedQuery {
  name = new SearchFilterInput({
    key: 'name',
    label: 'Name',
    placeholder: 'User name or lastname',
    order: 2,
    maxLength: 25
  });

  email = new SearchFilterInput({
    key: 'email',
    label: 'E-mail',
    placeholder: 'user@example.com',
    type: 'email',
    order: 1
  });

  constructor() {
    super();
    this.filters = [this.name, this.email];
  }
}
