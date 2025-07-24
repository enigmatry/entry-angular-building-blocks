import { Pipe, PipeTransform } from '@angular/core';
import { Occupation } from './users';

@Pipe({
    name: 'enumToString',
    standalone: false
})
export class EnumToStringPipe implements PipeTransform {
  transform = (value: Occupation): string =>
    value === Occupation.unknown
      ? '-'
      : Occupation[value].replace(/^[a-z]/, x => x.toUpperCase());
}
