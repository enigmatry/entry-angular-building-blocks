import { Pipe, PipeTransform } from '@angular/core';
import { SelectOptionGroup } from './select-option-group.model';
import { SelectOption } from './select-option.model';

@Pipe({
    name: 'groupSelectOptions'
})
export class GroupSelectOptionsPipe implements PipeTransform {
  readonly transform = <T>(options: readonly SelectOption<T>[] | null | undefined): Array<SelectOptionGroup<T>> => {
    if (!options?.length) {
      return [];
    }

    if (!options.some(option => option.groupName)) {
      return [{ options: [...options] }];
    }

    const groupOrder: string[] = [];
    const groups = new Map<string, SelectOption<T>[]>();
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
