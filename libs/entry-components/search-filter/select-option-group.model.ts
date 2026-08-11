import { SelectOption } from './select-option.model';

/** A bucket of select/autocomplete options rendered together under an optional group header. */
export interface SelectOptionGroup<T> {
  groupName?: string;
  options: SelectOption<T>[];
}
