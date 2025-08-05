import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TextSearchFilter } from './text-search-filter.model';

@Component({
    selector: 'entry-text-search-filter',
    templateUrl: './text-search-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TextSearchFilterComponent {
  @Input() searchFilter: TextSearchFilter;
  /** Form group to which the search-filter input component will be added. */
  @Input() form: UntypedFormGroup;
}
