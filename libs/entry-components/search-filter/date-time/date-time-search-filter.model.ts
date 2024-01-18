import { FormControl } from '@angular/forms';
import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';

export class DateTimeSearchFilter extends SearchFilterBase<Date>{
    override controlType = ControlType.dateTime;

    override toFormControl(): FormControl<Date> {
      return new FormControl<Date>(this.value, {updateOn: 'change'});
    }
}
