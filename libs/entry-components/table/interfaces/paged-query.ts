import { Params } from '@angular/router';
import { OnPage, OnSort, PageEvent, SortDirection, SortEvent } from './pagination';

export const defaultPageSize = 20;
export const defaultPageNumber = 1;

export class PagedQuery implements OnPage, OnSort {
  pageNumber = defaultPageNumber;
  pageSize = defaultPageSize;
  sortBy?: string;
  sortDirection?: SortDirection;

  sortChange(sort: SortEvent): void {
    if (sort.active) {
      this.sortBy = sort.active;
      this.sortDirection = this.getValueIfNotEmpty(sort.direction);
      this.pageNumber = defaultPageNumber;
    }
  }

  pageChange(page: PageEvent): void {
    this.pageNumber = page.pageIndex + 1;
    this.pageSize = page.pageSize;
  }

  applyRouteChanges(queryParams: Params): void {
    this.pageNumber = queryParams['pageNumber'] ? Number(queryParams['pageNumber']) : defaultPageNumber;
    this.pageSize = queryParams['pageSize'] ? Number(queryParams['pageSize']) : this.pageSize;
    this.sortBy = this.getValueIfNotEmpty(queryParams['sortBy'] ?? this.sortBy);
    this.sortDirection = this.getValueIfNotEmpty(queryParams['sortDirection'] ?? this.sortDirection);
  }

  getRouteQueryParams(): Params {
    return {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection
    };
  }

  getValueIfNotEmpty = <T>(value: T): T | undefined => value ? value : undefined;
}
