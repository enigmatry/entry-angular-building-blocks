import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from '../../../interfaces';

@Pipe({
  name: 'displayWithAutocomplete'
})
export class DisplayWithAutocompletePipe implements PipeTransform {

  transform(options: SelectOption[]): (value: any) => string {
    return (value: any) => options.find(o => o.value === value)?.label ?? '';
  }
}
