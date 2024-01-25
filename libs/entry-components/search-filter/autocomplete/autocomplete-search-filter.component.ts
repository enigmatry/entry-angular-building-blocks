import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormControlName, FormGroup, UntypedFormGroup } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { filter, tap, takeUntil, debounceTime } from 'rxjs/operators';
import { SelectOption } from '../select-option.model';
import { AutocompleteSearchFilter } from './autocomplete-search-filter.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'entry-autocomplete-search-filter',
  templateUrl: './autocomplete-search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteSearchFilterComponent<T> implements AfterViewInit, OnDestroy {
  @Input() searchFilter: AutocompleteSearchFilter<T>;

  searchField = new FormControl('');

  options$: Observable<SelectOption<T>[]> = of([]);
  options: SelectOption<T>[] = [];

  destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.searchField
      .valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter(value => value?.length >= this.searchFilter.minimumCharacters),
        debounceTime(this.searchFilter.debounceTime)
      )
      .subscribe(searchValue => {
        // call search and retrieve options
        this.options$ = this.searchFilter.search(searchValue)
          .pipe(
            tap(options => this.options = options)
          );

        // mark for check because of the debounce
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayFn = (_selectedValue: SelectOption<T>): string => this.searchFilter.formControl.value?.label;

  onSelected = (event: MatAutocompleteSelectedEvent) => {
    this.searchFilter.formControl.patchValue(event.option.value);
    this.searchField.patchValue(event.option.value.label, { emitEvent: false });
  };
}
