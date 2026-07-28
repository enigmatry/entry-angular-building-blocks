import { Pipe, PipeTransform } from '@angular/core';
import { findOptionByValue } from './select-configuration.interface';
import { SelectOption } from './select-option.model';

@Pipe({
    name: 'displayWithAutocomplete',
    standalone: false
})
export class DisplayWithAutocompletePipe implements PipeTransform {
  transform = (options: SelectOption[]): (value: any) => string => (value: any) => findOptionByValue(options, value)?.label ?? '';
}
