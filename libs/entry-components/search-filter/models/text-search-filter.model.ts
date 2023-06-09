import { FilterInputControlType } from '../filter-input-control-type.model';
import { SearchFilterBase } from './search-filter-base.model';

/**
 * Search filter text input filed configuration.
 */
export class TextSearchFilter extends SearchFilterBase<string> {
  override controlType = FilterInputControlType.text;
}
