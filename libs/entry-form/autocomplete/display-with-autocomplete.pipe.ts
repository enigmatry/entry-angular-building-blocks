import { Pipe, PipeTransform } from '@angular/core';
import { findOptionByValue, SelectOption } from './select-configuration.interface';

@Pipe({
    name: 'displayWithAutocomplete',
    standalone: false
})
export class DisplayWithAutocompletePipe implements PipeTransform {
  transform = (options: SelectOption[]): (value: any) => string => (value: any) => findOptionByValue(options, value)?.label ?? '';
}
