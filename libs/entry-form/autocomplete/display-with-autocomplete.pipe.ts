import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from './select-configuration.interface';

@Pipe({
    name: 'displayWithAutocomplete',
    standalone: false
})
export class DisplayWithAutocompletePipe implements PipeTransform {
  transform = (options: SelectOption[]): (value: any) => string => (value: any) => options.find(o => o.value === value)?.label ?? '';
}
