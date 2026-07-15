import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from './select-option.model';

export interface SelectOptionGroup {
  label: string;
  options: SelectOption<any>[];
}

// Groups a flat option list into buckets by each option's group name, preserving first-appearance order
// of both groups and options within a group. Returns the input unchanged when no option sets a group.
// Kept untyped (any) rather than a pipe-level generic: Angular's template type checker does not reliably
// infer a transform<T> generic through a chained `| async | groupSelectOptions` expression.
@Pipe({
    name: 'groupSelectOptions',
    standalone: false
})
export class GroupSelectOptionsPipe implements PipeTransform {
  transform = (options: SelectOption<any>[] | null | undefined): Array<SelectOption<any> | SelectOptionGroup> => {
    if (!options?.length || !options.some(option => option.group)) {
      return options ?? [];
    }

    const groupOrder: string[] = [];
    const groups = new Map<string, SelectOption<any>[]>();
    options.forEach(option => {
      const key = option.group ?? '';
      const existing = groups.get(key);
      if (existing) {
        existing.push(option);
      } else {
        groupOrder.push(key);
        groups.set(key, [option]);
      }
    });

    return groupOrder.map(key => ({ label: key, options: groups.get(key) ?? [] }));
  };
}
