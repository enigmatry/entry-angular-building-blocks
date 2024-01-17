import { SearchFilterBase } from '../search-filter-base.model';
import { ControlType } from '../control-type';

/**
 * Search filter text input filed configuration.
 */
export class TextSearchFilter extends SearchFilterBase<string> {
  override controlType = ControlType.text;
}
