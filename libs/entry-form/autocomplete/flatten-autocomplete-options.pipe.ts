import { Pipe, PipeTransform } from '@angular/core';
import { FormlySelectOption } from '@ngx-formly/core/select';
import { SelectOption } from './select-option.model';

// Formly's own formlySelectOptions pipe nests grouped options one level deep, as
// { label, group: FormlySelectOption[] } wrapper nodes (its fixed, external contract).
// This flattens that into a flat SelectOption[], tagging each leaf with its wrapper's
// label as groupName, so the rest of this module never has to deal with nesting.
@Pipe({
    name: 'flattenAutocompleteOptions',
    standalone: false
})
export class FlattenAutocompleteOptionsPipe implements PipeTransform {
  transform = (options: FormlySelectOption[] | null | undefined): SelectOption[] =>
    (options ?? []).flatMap(option => option.group ?
      option.group.map(child => ({ value: child.value, label: child.label, disabled: child.disabled, groupName: option.label })) :
      [{ value: option.value, label: option.label, disabled: option.disabled }]);
}
