import { ChangeDetectionStrategy, Component, ErrorHandler, computed, debounced, inject, input, resource,
  signal } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SelectOption } from '../select-option.model';
import { AutocompleteSearchFilter } from './autocomplete-search-filter.model';

// `debounced` asks for a promise that resolves when the wait is over, and without RxJS a timer is
// the only way to express one.
// eslint-disable-next-line promise/avoid-new
const delay = (milliseconds: number): Promise<void> => new Promise(resolve => {
  setTimeout(resolve, milliseconds);
});

@Component({
  selector: 'entry-autocomplete-search-filter',
  templateUrl: './autocomplete-search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AutocompleteSearchFilterComponent<T> {
  readonly searchFilter = input.required<AutocompleteSearchFilter<T>>();
  /** The field this filter edits. It holds the selected option's key, not the option. */
  readonly field = input.required<Field<unknown>>();

  private readonly errorHandler = inject(ErrorHandler);

  /** What the user typed. Separate from the field, which holds the chosen key. */
  private readonly searchText = signal('');

  /** The label of the option the user picked, kept so it survives the option list changing. */
  private readonly selectedLabel = signal('');

  /**
   * Deliberately on `debounced`, which is experimental in 22.x, rather than on RxJS: this is the
   * API the debounce is meant to end up on, so taking it now avoids migrating the same code twice.
   * `resource` carries no debounce option of its own in 22.1. The wait is a function because the
   * delay comes from a required input, which cannot be read while fields are still initialising.
   */
  private readonly debouncedText = debounced(
    () => this.searchText(),
    () => delay(this.searchFilter().debounceTime)
  );

  /** Cancellation comes from the loader's `abortSignal`, so a superseded lookup is dropped. */
  private readonly options = resource({
    params: () => {
      const text = this.debouncedText.value();
      return text.length >= this.searchFilter().minimumCharacters ? text : undefined;
    },
    loader: ({ params, abortSignal }) => this.searchOptions(params, abortSignal),
    defaultValue: [] as readonly SelectOption<T>[]
  });

  protected readonly optionsValue = computed(() => this.options.value());

  /** What the input shows: the label of the picked option, or nothing once the value is cleared. */
  protected readonly displayText = computed(() => {
    const key = this.field()().value();
    return key === null || key === undefined ? '' : this.selectedLabel();
  });

  protected readonly onTyped = (text: string): void => {
    this.searchText.set(text);
    if (text === '') {
      // `null`, never `undefined`: writing undefined into a live field destroys its node.
      this.field()().value.set(null);
      this.selectedLabel.set('');
    }
  };

  protected readonly onSelected = (event: MatAutocompleteSelectedEvent): void => {
    const option = event.option.value as SelectOption<T>;
    this.field()().value.set(option.key);
    this.selectedLabel.set(option.label);
    this.searchText.set('');
  };

  private readonly searchOptions = async(
    text: string,
    abortSignal: AbortSignal
  ): Promise<readonly SelectOption<T>[]> => {
    try {
      return await this.searchFilter().search(text, abortSignal);
    } catch(error) {
      this.report(error, abortSignal);
      return [];
    }
  };

  // A rejected loader makes `Resource.value()` throw while the view renders: `defaultValue` covers
  // only the idle and post-error reloading states, never the error itself.
  private readonly report = (error: unknown, abortSignal: AbortSignal): void => {
    if (!abortSignal.aborted) {
      this.errorHandler.handleError(error);
    }
  };
}
