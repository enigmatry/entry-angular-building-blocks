import { Observable } from 'rxjs';
import { SearchFilterInput } from './search-filter-input.model';
import { SearchFilterSelectOption } from './search-filter-select-option.model';
import { FilterInputControlType } from './filter-input-control-type.model';

/**
 * Search filter select input filed configuration.
 * It supports static select values (enums) and dynamic ones (Observables).
 */
export class SearchFilterSelectInput extends SearchFilterInput<SearchFilterSelectOption[] | Observable<string[]>> {
    override controlType = FilterInputControlType.select;
}
