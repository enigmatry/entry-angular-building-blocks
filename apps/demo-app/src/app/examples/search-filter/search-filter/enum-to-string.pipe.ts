import { Pipe, PipeTransform } from '@angular/core';
import { Occupation } from './users.service';

@Pipe({
  name: 'enumToString'
})
export class EnumToStringPipe implements PipeTransform {

  transform = (value: Occupation): string =>
    value === Occupation.unknown
      ? '-'
      : Occupation[value].replace(/^[a-z]/, x => x.toUpperCase());
}
