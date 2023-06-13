import { Observable } from 'rxjs';
import { ControlType } from '../control-type.model';
import { SearchFilterBase } from '../search-filter-base.model';
import { SelectSearchFilterOption } from './select-search-filter-option.model';

/**
 * Search filter select input field configuration. Select options can be provided as fixed list 
 * or observable dynamic list that can be filled in from API.
 */
export class SelectSearchFilter extends SearchFilterBase<any> {
    override controlType = ControlType.select;
    /** Fixed list of select filter options (default is empty list) */
    options: SelectSearchFilterOption[] = [];
    /** Observable list of possible value options */
    options$: Observable<SelectSearchFilterOption[]> | undefined;
    /** Enables selection of multiple options (default is true) */
    multiSelect = true;

    constructor(options: Partial<SelectSearchFilter> = {}) {
        super(options);
        this.options = options.options;
        this.options$ = options.options$;
        this.multiSelect = options.multiSelect;
      }
}
