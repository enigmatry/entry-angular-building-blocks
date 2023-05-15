import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SearchFilterBase } from './models/search-filter-base';
import { SearchFilterParams } from './models/search-filter-params';

@Component({
  selector: 'entry-search-filter',
  templateUrl: './entry-search-filter.component.html',
  styleUrls: ['./entry-search-filter.component.scss']
})
export class EntrySearchFilterComponent implements OnInit {

  @Input() searchFilters: SearchFilterBase<string>[] = [];
  @Output() searchFilterChange = new EventEmitter<SearchFilterParams>();

  searchFilterForm!: FormGroup;

  constructor() { }

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
      group[searchFilter.key] = new FormControl(searchFilter.value || '');
    });
    return new FormGroup(group);
  }
}
