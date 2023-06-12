import { ControlType } from '../control-type.model';
import { SearchFilterBase } from '../search-filter-base.model';
import { SelectSearchFilterOption } from './select-search-filter-option.model';

/**
 * Search filter select input filed configuration.
 * It supports static select values.
 */
export class SelectSearchFilter extends SearchFilterBase<any> {
    override controlType = ControlType.select;
    /** Filter static list of possible value options */
    options: SelectSearchFilterOption[];
    /** Enables selection of multiple options (default is true) */
    multiSelect = true;

    constructor(options: Partial<SelectSearchFilter> = {}) {
        super(options);
        this.options = [new SelectSearchFilterOption(undefined, '')].concat(options.options);
        this.multiSelect = options.multiSelect;
      }
}
