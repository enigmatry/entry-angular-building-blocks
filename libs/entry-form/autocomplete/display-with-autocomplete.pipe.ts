import { Pipe, PipeTransform } from '@angular/core';
import { findOptionByValue } from './select-configuration.interface';
import { SelectOption } from './select-option.model';

@Pipe({
    name: 'displayWithAutocomplete',
    standalone: false
})
export class DisplayWithAutocompletePipe implements PipeTransform {
  readonly transform = <TOption extends SelectOption>(options: TOption[]): (value: TOption['value']) => string =>
    value => findOptionByValue(options, value)?.label ?? '';
}
