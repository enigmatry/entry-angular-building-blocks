import { SearchFilterBase } from './search-filter-base';

export class SearchFilterInput extends SearchFilterBase<string> {
  override controlType = 'text-box';
}
