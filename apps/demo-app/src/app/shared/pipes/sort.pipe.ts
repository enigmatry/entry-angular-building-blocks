import { Pipe, PipeTransform } from '@angular/core';
import { IComponentDefinition } from '../../features/component-definitions';

@Pipe({
    name: 'sort',
    standalone: false
})
export class SortPipe implements PipeTransform {
  transform = (values: IComponentDefinition[], direction: 'asc' | 'desc' = 'asc'): IComponentDefinition[] =>
    direction === 'asc'
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      ? values.sort((one, two) => one.label < two.label ? -1 : 1)
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      : values.sort((one, two) => one.label > two.label ? -1 : 1);
}
