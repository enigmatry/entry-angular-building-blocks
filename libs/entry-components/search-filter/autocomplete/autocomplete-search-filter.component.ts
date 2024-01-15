import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormControlName, UntypedFormGroup } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { filter, tap, takeUntil, debounceTime } from 'rxjs/operators';
import { SelectOption } from '../select-option.model';
import { AutocompleteSearchFilter } from './autocomplete-search-filter.model';

@Component({
  selector: 'entry-autocomplete-search-filter',
  templateUrl: './autocomplete-search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteSearchFilterComponent<T> implements AfterViewInit, OnDestroy {
  @Input() searchFilter: AutocompleteSearchFilter<T>;
  @Input() form: UntypedFormGroup;

  @ViewChild(FormControlName) searchField: FormControlName;

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

  displayFn = (selectedKey: T): string => this.options.find(x => x.key === selectedKey)?.label;
}
