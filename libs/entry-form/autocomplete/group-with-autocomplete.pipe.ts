import { Pipe, PipeTransform } from '@angular/core';
import { SelectOptionGroup } from './select-option-group.model';
import { SelectOption } from './select-option.model';

// Groups a flat option list into buckets by each option's group name, preserving first-appearance order
// of both groups and options within a group. Ungrouped options are returned as a single group with no
// groupName, so templates can always iterate groups without discriminating between shapes.
@Pipe({
    name: 'groupWithAutocomplete',
    standalone: false
})
export class GroupWithAutocompletePipe implements PipeTransform {
  transform = (options: SelectOption[] | null | undefined): SelectOptionGroup[] => {
    if (!options?.length) {
      return [];
    }

    if (!options.some(option => option.groupName)) {
      return [{ options }];
    }

    const groupOrder: string[] = [];
    const groups = new Map<string, SelectOption[]>();
    options.forEach(option => {
      const key = option.groupName ?? '';
      const existing = groups.get(key);
      if (existing) {
        existing.push(option);
      } else {
        groupOrder.push(key);
        groups.set(key, [option]);
      }
    });

    return groupOrder.map(key => ({ groupName: key || undefined, options: groups.get(key) ?? [] }));
  };
}
