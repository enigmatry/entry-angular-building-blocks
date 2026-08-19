import { ChangeDetectionStrategy, Component, ErrorHandler, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { catchError, debounceTime, filter, of, switchMap, tap } from 'rxjs';
import { SelectOption } from '../select-option.model';
import { AutocompleteSearchFilter } from './autocomplete-search-filter.model';

@Component({
  selector: 'entry-autocomplete-search-filter',
  templateUrl: './autocomplete-search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AutocompleteSearchFilterComponent<T> {
  readonly searchFilter = input.required<AutocompleteSearchFilter<T>>();

  readonly searchField = new FormControl('');

  /**
   * Options returned by the most recent search. `equal: () => false` because a consumer's `search()`
   * may resolve to a cached array, and nothing else dirties this OnPush view after the debounce.
   */
  readonly options = signal<SelectOption<T>[]>([], { equal: () => false });

  private readonly errorHandler = inject(ErrorHandler);

  // RxJS rather than signals: `debounceTime` and switch-cancellation have no signal equivalent.
  // The result lands in a signal, which is what marks the view.
  constructor() {
    toObservable(this.searchFilter)
      .pipe(
        switchMap(searchFilter => this.searchField.valueChanges.pipe(
          tap(value => this.clearFilterIfLabelMismatch(value)),
          filter(value => !!value && value.length >= searchFilter.minimumCharacters),
          debounceTime(searchFilter.debounceTime),
          // catchError sits on the inner search so a failing lookup cannot tear down valueChanges.
          switchMap(searchValue => searchFilter.search(searchValue as string)
            .pipe(catchError((error: unknown) => {
              this.errorHandler.handleError(error);
              return of<SelectOption<T>[]>([]);
            })))
        )),
        takeUntilDestroyed()
      )
      .subscribe(options => this.options.set(options));
  }

  readonly displayFn = (_selectedValue: SelectOption<T>): string => this.searchFilter().formControl.value?.label ?? '';

  readonly onSelected = (event: MatAutocompleteSelectedEvent): void => {
    this.searchFilter().formControl.patchValue(event.option.value);
    this.searchField.patchValue(event.option.value.label, { emitEvent: false });
  };

  private readonly clearFilterIfLabelMismatch = (value: string | null): void => {
    const label = this.searchFilter().formControl.value?.label;
    if (label && label !== value) {
      this.searchFilter().formControl.patchValue(undefined);
      this.searchField.patchValue(null, { emitEvent: false });
    }
  };
}
