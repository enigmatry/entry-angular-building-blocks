import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { SearchFilterBase } from '../models/search-filter-base';

@Component({
  selector: 'entry-search-filter-input',
  templateUrl: './search-filter-input.component.html'
})
export class EntrySearchFilterInputComponent {

  @Input() searchFilter!: SearchFilterBase<string>;
  @Input() form!: UntypedFormGroup;
}
