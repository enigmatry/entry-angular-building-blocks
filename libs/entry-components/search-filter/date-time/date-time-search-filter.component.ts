import { Component, Input } from '@angular/core';
import { DateTimeSearchFilter } from './date-time-search-filter.model';
import { UntypedFormGroup } from '@angular/forms';
import { MyDateAdapter } from './my-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { EXTENDED_DATE_FORMATS } from './my-date-formats';

@Component({
  selector: 'entry-date-time-search-filter',
  templateUrl: './date-time-search-filter.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useFactory: EXTENDED_DATE_FORMATS },
    { provide: DateAdapter, useClass: MyDateAdapter }
  ]
})
export class DateTimeSearchFilterComponent {
  @Input() searchFilter: DateTimeSearchFilter;
  @Input() form: UntypedFormGroup;
}
