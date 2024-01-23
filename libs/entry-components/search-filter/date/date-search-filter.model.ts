import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';

/**
 * Search filter date input filed configuration.
 */
export class DateSearchFilter<D> extends SearchFilterBase<D>{
    override controlType = ControlType.date;
}
