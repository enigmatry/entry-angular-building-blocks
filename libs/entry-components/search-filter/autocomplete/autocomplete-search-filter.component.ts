import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControlName, UntypedFormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { filter, throttleTime, tap } from 'rxjs/operators';
import { SelectOption } from '../select-option.model';
import { AutocompleteSearchFilter } from './autocomplete-search-filter.model';

@Component({
  selector: 'entry-autocomplete-search-filter',
  templateUrl: './autocomplete-search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteSearchFilterComponent<T> implements OnInit, AfterViewInit {
  @Input() searchFilter: AutocompleteSearchFilter<T>;
  @Input() form: UntypedFormGroup;

  @ViewChild(FormControlName, { static: true }) searchField: FormControlName;

  options$: Observable<SelectOption<T>[]> = of([]);
  options: SelectOption<T>[] = [];

  ngOnInit(): void {
    if (this.searchFilter.minimumCharacters === 0) {
      this.options$ = this.searchFilter.searchFunction('');
    }
  }

  ngAfterViewInit(): void {
    this.searchField
      .valueChanges
      .pipe(filter(value => value?.length >= this.searchFilter.minimumCharacters))
      .pipe(throttleTime(this.searchFilter.toggleTime))
      .subscribe(value => this.options$ = this.searchFilter.searchFunction(value).pipe(tap(result => this.options = result)));
  }

  displayFn = (selectedKey: T): string => this.options.filter(x => x.key === selectedKey)[0]?.label;
}
