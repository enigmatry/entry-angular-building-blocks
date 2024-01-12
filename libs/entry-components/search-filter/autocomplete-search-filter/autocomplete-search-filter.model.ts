import { FormControl } from '@angular/forms';
import { ControlType } from '../control-type';
import { SearchFilterBase } from '../search-filter-base.model';
import { SelectOption } from '../select-option.model';
import { Observable } from 'rxjs';

export class AutocompleteSearchFilter<T> extends SearchFilterBase<T>{
  controlType = ControlType.autocomplete;
  searchFunction: (input: string) => Observable<SelectOption<T>[]>;
  minimumCharacters = 3;

  constructor(options: Partial<AutocompleteSearchFilter<T>> = {}) {
    super(options);
    this.searchFunction = options.searchFunction;
    this.placeholder = options.placeholder;
    this.label = options.label;
    this.minimumCharacters = options.minimumCharacters ?? 3;
  }

  // toFormControl(): FormControl<T> {
  //   return new FormControl<T>(this.value, {updateOn: 'change'});
  // }
}
