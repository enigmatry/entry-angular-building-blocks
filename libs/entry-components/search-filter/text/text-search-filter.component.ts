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

  /** Rewrites what the user typed through the filter's `formatValue`, the input mask it configures. */
  protected readonly applyMask = (element: HTMLInputElement): void => {
    const formatValue = this.searchFilter().formatValue;
    if (!formatValue) {
      return;
    }
    const masked = String(formatValue(element.value) ?? '');
    // Both writes, because `[formField]`'s own input listener may run before or after this one.
    if (masked !== element.value) {
      element.value = masked;
    }
    this.field()().value.set(masked);
  };
}
