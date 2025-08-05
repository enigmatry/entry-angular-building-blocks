import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';

/**
 * Search filter date time input filed configuration.
 */
export class DateTimeSearchFilter<D> extends SearchFilterBase<D> {
    override controlType = ControlType.dateTime;
}
