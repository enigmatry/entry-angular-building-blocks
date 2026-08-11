import { SelectOption } from './select-option.model';

/** A bucket of autocomplete options rendered together under an optional group header. */
export interface SelectOptionGroup {
  groupName?: string;
  options: SelectOption[];
}
