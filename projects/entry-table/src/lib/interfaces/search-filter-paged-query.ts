import { Params } from '@angular/router';
import { SearchFilterBase } from '../components/entry-search-filter/models/search-filter-base';
import { SearchFilterParams } from '../components/entry-search-filter/models/search-filter-params';
import { PagedQuery } from './paged-query';

export class SearchFilterPagedQuery extends PagedQuery {
  constructor(public filters: SearchFilterBase<string>[] = []) {
    super();
  }

  searchFilterChange(searchParams: SearchFilterParams): void {
    this.filters.forEach(filter => filter.setValue(searchParams[filter.key]));
    this.pageNumber = 1;
  }

  applyRouteChanges(queryParams: Params): void {
    super.applyRouteChanges(queryParams);
    this.filters.forEach(filter => filter.setValue(queryParams[filter.key]));
  }

  override getRouteQueryParams(): Params {
    const pagedParams = super.getRouteQueryParams();
    const filterParams: Params = {};
    this.filters.forEach(filter => filterParams[filter.key] = filter.value);
    return {
      ...pagedParams,
      ...filterParams
    };
  }
}
