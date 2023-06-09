import { Observable } from 'rxjs';
import { SearchFilterBase } from './search-filter-base.model';
import { FilterInputControlType } from './filter-input-control-type.model';
import { SelectSearchFilterOption } from './select-search-filter-option.model';

/**
 * Search filter select input filed configuration.
 * It supports static select values (enums) and dynamic ones (Observables).
 */
export class SelectSearchFilter extends SearchFilterBase<any> {
    override controlType = FilterInputControlType.select;
    /** Filter static (enums) or dynamic (Observable) list of possible value options */
    options: SelectSearchFilterOption[] | Observable<SelectSearchFilterOption[]>;
    /** Enables selection of multiple options (default is true) */
    public multiSelect = true;

    constructor(options: Partial<SelectSearchFilter> = {}) {
        super(options);
        if (options.options instanceof Array) {
          this.options = [new SelectSearchFilterOption(undefined, '')].concat(options.options);
        } else {
          // TODO
        }
        this.multiSelect = options.multiSelect;
      }
}
