import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { TextSearchFilter } from './text-search-filter.model';

@Component({
    selector: 'entry-text-search-filter',
    templateUrl: './text-search-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TextSearchFilterComponent {
  readonly searchFilter = input.required<TextSearchFilter>();
  /** The field this filter edits, taken from the search filter form. */
  readonly field = input.required<Field<string>>();
}
