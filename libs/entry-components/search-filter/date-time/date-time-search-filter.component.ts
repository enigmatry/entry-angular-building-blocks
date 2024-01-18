import { Component, Input } from '@angular/core';
import { DateTimeSearchFilter } from './date-time-search-filter.model';
import { UntypedFormGroup } from '@angular/forms';
import { MyDateAdapter } from './my-date-adapter';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'entry-date-time-search-filter',
  templateUrl: './date-time-search-filter.component.html',
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter }
  ]
})
export class DateTimeSearchFilterComponent {
  @Input() searchFilter: DateTimeSearchFilter;
  @Input() form: UntypedFormGroup;
}
