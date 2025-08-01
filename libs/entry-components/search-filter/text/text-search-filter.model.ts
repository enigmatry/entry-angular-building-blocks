import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';

/**
 * Search filter text input filed configuration.
 */
export class TextSearchFilter extends SearchFilterBase<string> {
  override controlType = ControlType.text;
}
