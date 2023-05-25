import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchFilterBase } from './search-filter-base';
import { SearchFilterParams } from './search-filter-params';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from './search-filter-config.model';

@Component({
  selector: 'entry-search-filter',
  templateUrl: './entry-search-filter.component.html',
  styleUrls: ['./entry-search-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntrySearchFilterComponent implements OnInit {

  @Input() searchFilters: SearchFilterBase<string>[] = [];
  @Output() searchFilterChange = new EventEmitter<SearchFilterParams>();

  searchFilterForm!: FormGroup;

  constructor(@Inject(ENTRY_SEARCH_FILTER_CONFIG) public config: EntrySearchFilterConfig) { }

  ngOnInit() {
    this.searchFilterForm = this.toFormGroup(this.searchFilters);
  }

  onSubmit() {
    const formValue = this.searchFilterForm.value;
    this.searchFilterChange.emit(formValue);
  }

  toFormGroup(searchFilters: SearchFilterBase<string>[]) {
    const group: any = {};

    searchFilters.forEach(searchFilter => {
      const formControl = new FormControl(searchFilter.value || '');
      group[searchFilter.key] = formControl;
      searchFilter.formControl = formControl;
    });
    return new FormGroup(group);
  }
}
