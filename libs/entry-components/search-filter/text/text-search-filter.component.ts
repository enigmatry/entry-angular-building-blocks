import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { TextSearchFilter } from './text-search-filter.model';

@Component({
    selector: 'entry-text-search-filter',
    templateUrl: './text-search-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TextSearchFilterComponent {
  readonly searchFilter = input.required<TextSearchFilter>();
  /** Form group to which the search-filter input component will be added. */
  readonly form = input.required<FormRecord>();
}
