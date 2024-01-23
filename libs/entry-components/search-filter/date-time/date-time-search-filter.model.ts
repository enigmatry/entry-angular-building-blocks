import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';

export class DateTimeSearchFilter<D> extends SearchFilterBase<D>{
    override controlType = ControlType.dateTime;
}
