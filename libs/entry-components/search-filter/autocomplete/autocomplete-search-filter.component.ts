import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class AutocompleteSearchFilterComponent<T> implements AfterViewInit {
  readonly searchFilter = input.required<AutocompleteSearchFilter<T>>();

  searchField = new FormControl('');

  /** Options returned by the most recent search. Writing a signal marks the view for us. */
  readonly options = signal<SelectOption<T>[]>([]);

  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.searchField
      .valueChanges
      .pipe(
        tap(value => this.clearFilterIfLabelMismatch(value)),
        filter(value => !!value && value.length >= this.searchFilter().minimumCharacters),
        debounceTime(this.searchFilter().debounceTime),
        // catchError sits on the inner search so a failing lookup cannot tear down valueChanges
        switchMap(searchValue => this.searchFilter().search(searchValue as string)
          .pipe(catchError((error: unknown) => {
            // eslint-disable-next-line no-console
            console.error('entry-autocomplete-search-filter: search failed', error);
            return of<SelectOption<T>[]>([]);
          }))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(options => this.options.set(options));
  }

  displayFn = (_selectedValue: SelectOption<T>): string => this.searchFilter().formControl.value?.label ?? '';

  onSelected = (event: MatAutocompleteSelectedEvent) => {
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
