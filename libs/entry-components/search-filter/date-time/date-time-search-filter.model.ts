import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';

export class DateTimeSearchFilter extends SearchFilterBase<Date>{
    override controlType = ControlType.dateTime;
}
