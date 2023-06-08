import { SearchFilterBase } from './search-filter-base';

/**
 * Search filter text input filed configuration.
 */
export class SearchFilterTextInput extends SearchFilterBase<string> {
  override controlType = 'text-input';
}
