import { SearchFilterInput } from './search-filter-input.model';

/**
 * Search filter select input filed configuration.
 * It supports static select values (enums) and dynamic ones (Observables).
 */
export class SearchFilterSelectInput extends SearchFilterInput<string> {
    override controlType = 'select-input';
}
