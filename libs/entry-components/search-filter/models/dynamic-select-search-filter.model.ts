import { Observable } from 'rxjs';
import { SearchFilterBase } from './search-filter-base.model';
import { FilterInputControlType } from './filter-input-control-type.model';
import { SelectSearchFilterOption } from './select-search-filter-option.model';

/**
 * Search filter dynamic select input filed configuration.
 * It supports observable select options of SelectSearchFilterOption type.
 */
export class DynamicSelectSearchFilter extends SearchFilterBase<any> {
    override controlType = FilterInputControlType.dynamicSelect;
    /** Observable list of possible value options */
    options$: Observable<SelectSearchFilterOption[]>;
    /** Enables selection of multiple options (default is true) */
    multiSelect = true;

    constructor(options: Partial<DynamicSelectSearchFilter> = {}) {
        super(options);
        this.options$ = options.options$;
        this.multiSelect = options.multiSelect;
      }
}
