import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchFilterBase } from './search-filter-base';

@Component({
  selector: 'entry-search-filter-input',
  templateUrl: './search-filter-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntrySearchFilterInputComponent {

  @Input() searchFilter!: SearchFilterBase<string>;
  @Input() form!: FormGroup;
}
