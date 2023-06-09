import { FilterInputControlType } from './filter-input-control-type.model';
import { SearchFilterInput } from './search-filter-input.model';

/**
 * Search filter text input filed configuration.
 */
export class SearchFilterTextInput extends SearchFilterInput<string> {
  override controlType = FilterInputControlType.text;
}