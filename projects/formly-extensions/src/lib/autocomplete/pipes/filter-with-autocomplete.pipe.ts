import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from '../select-option';

@Pipe({
  name: 'filterWithAutocomplete'
})
export class FilterWithAutocompletePipe implements PipeTransform {

  transform(options: SelectOption[], filterWith: string | undefined): SelectOption[] {
    if (!filterWith) {
      return options;
    }
    const labelStartsWith = filterWith.toLowerCase();
    return options.filter(option => option.label.toLowerCase().startsWith(labelStartsWith));
  }
}
