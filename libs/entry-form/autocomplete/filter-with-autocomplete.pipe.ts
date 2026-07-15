import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from './select-configuration.interface';

@Pipe({
    name: 'filterWithAutocomplete',
    standalone: false
})
export class FilterWithAutocompletePipe implements PipeTransform {
  transform = (options: SelectOption[], filterWith: string | undefined): SelectOption[] => {
    if (!filterWith) {
      return options;
    }
    const labelStartsWith = filterWith.toLowerCase();
    return options
      .map(option => option.group ?
        { ...option, group: option.group.filter(child => child.label.toLowerCase().includes(labelStartsWith)) } :
        option)
      .filter(option => option.group ? option.group.length > 0 : option.label.toLowerCase().includes(labelStartsWith));
  };
}
