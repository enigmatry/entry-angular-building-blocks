import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SearchFilterInput } from './search-filter-input.model';

@Component({
  selector: 'entry-search-filter-input',
  templateUrl: './search-filter-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntrySearchFilterInputComponent {
  /** Configuration of the search filters inputs that will be displayed in the search-filter component. */
  @Input() searchFilter!: SearchFilterInput<string>;
  /** Form group to which the search-filter input component will be added. */
  @Input() form!: UntypedFormGroup;
}
