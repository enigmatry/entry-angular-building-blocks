import { FormRecord } from '@angular/forms';
import { SearchFilterBase } from './search-filter-base.model';

/** The filters a form was built from, paired with that form, so the two can never disagree. */
export interface BuiltSearchFilters {
  filters: SearchFilterBase<unknown>[];
  form: FormRecord;
}
