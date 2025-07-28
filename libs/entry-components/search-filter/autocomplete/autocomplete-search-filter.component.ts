import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject, of } from 'rxjs';
import { filter, tap, takeUntil, debounceTime } from 'rxjs/operators';
import { SelectOption } from '../select-option.model';
import { AutocompleteSearchFilter } from './autocomplete-search-filter.model';

@Component({
  selector: 'entry-autocomplete-search-filter',
  templateUrl: './autocomplete-search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AutocompleteSearchFilterComponent<T> implements AfterViewInit, OnDestroy {
  @Input() searchFilter: AutocompleteSearchFilter<T>;

  searchField = new FormControl('');

  options$: Observable<SelectOption<T>[]> = of([]);

  destroy$ = new Subject<void>();
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.searchField
      .valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(value => this.clearFilterIfLabelMismatch(value)),
        filter(value => !!value && value.length >= this.searchFilter.minimumCharacters),
        debounceTime(this.searchFilter.debounceTime)
      )
      .subscribe(searchValue => {
        // call search and retrieve options
        this.options$ = this.searchFilter.search(searchValue);
        // mark for check because of the debounce
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayFn = (_selectedValue: SelectOption<T>): string => this.searchFilter.formControl.value?.label ?? '';

  onSelected = (event: MatAutocompleteSelectedEvent) => {
    this.searchFilter.formControl.patchValue(event.option.value);
    this.searchField.patchValue(event.option.value.label, { emitEvent: false });
  };

  private clearFilterIfLabelMismatch(value: string | null) {
    const label = this.searchFilter.formControl.value?.label;
    if (label && label !== value) {
      this.searchFilter.formControl.patchValue(undefined);
      this.searchField.patchValue(null, { emitEvent: false });
    }
  }
}
