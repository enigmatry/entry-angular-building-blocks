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
    return options.filter(option => option.label.toLowerCase().includes(labelStartsWith));
  };
}
