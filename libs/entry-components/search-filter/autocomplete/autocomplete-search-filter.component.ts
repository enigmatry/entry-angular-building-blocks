import { ChangeDetectionStrategy, Component, ErrorHandler, computed, debounced, inject, input, linkedSignal,
  resource, signal } from '@angular/core';
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
  private readonly errorHandler = inject(ErrorHandler);

  readonly searchFilter = input.required<AutocompleteSearchFilter<T>>();
  /** The field this filter edits. It holds the selected option's key, not the option. */
  readonly field = input.required<Field<unknown>>();

  /** The key the filter holds, or `undefined` when it holds nothing. */
  private readonly valueKey = computed(() => {
    const key = this.field()().value() as T | null | undefined;
    return key === null || key === undefined ? undefined : key;
  });

  /** What the user typed, `undefined` while the box shows a committed label. A value from outside ends the edit. */
  private readonly typedText = linkedSignal<T | undefined, string | undefined>({
    source: () => this.valueKey(),
    computation: () => undefined
  });

  /** The option picked here, kept with its key so a value change cannot leave its label behind. */
  private readonly picked = signal<SelectOption<T> | undefined>(undefined);

  // The wait is a function: the delay comes from a required input, unreadable while fields initialise.
  // eslint-disable-next-line @angular-eslint/no-experimental -- `debounced` is the only debounce Angular ships; RxJS here would reintroduce the subscription this component was rewritten to drop.
  private readonly debouncedText = debounced(
    () => this.typedText() ?? '',
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

  /**
   * The label of a key the user did not pick here - one the filter declared, or restored from a URL.
   * Undefined params keep a resource idle, so a key the picked option already covers costs no lookup.
   */
  private readonly resolvedLabel = resource({
    params: () => {
      const key = this.valueKey();
      return key === undefined || this.picked()?.key === key ? undefined : key;
    },
    loader: ({ params, abortSignal }) => this.lookupLabel(params, abortSignal),
    defaultValue: undefined as string | undefined
  });

  protected readonly optionsValue = computed(() => this.options.value());

  /** The picked option's label, while it still belongs to the key the field holds. */
  private readonly pickedLabel = computed(() => {
    const picked = this.picked();
    return picked?.key === this.valueKey() ? picked?.label : undefined;
  });

  /** The label of the key the field holds, or `undefined` while a lookup for it is still running. */
  private readonly committedLabel = computed(() => {
    if (this.valueKey() === undefined) {
      return '';
    }
    return this.pickedLabel()
      ?? (this.resolvedLabel.status() === 'resolved' ? this.resolvedLabel.value() ?? '' : undefined);
  });

  /** What the input shows: the edit in progress, otherwise the label of the value the field holds. */
  protected readonly displayText = computed(() => this.typedText() ?? this.committedLabel() ?? '');

  protected readonly displayOption = (option: SelectOption<T> | null): string => option?.label ?? '';

  protected readonly onTyped = (text: string): void => {
    const label = this.committedLabel();
    if (label !== undefined && label !== '' && text !== label) {
      // `null`, never `undefined`: writing undefined into a live field destroys its node.
      this.field()().value.set(null);
      this.field()().markAsDirty();
    }
    // After the clear, never before: `set` absorbs the pending source change, so the other order drops the text.
    this.typedText.set(text);
  };

  protected readonly onSelected = (event: MatAutocompleteSelectedEvent): void => {
    const option = event.option.value as SelectOption<T>;
    this.picked.set(option);
    this.field()().value.set(option.key);
    this.field()().markAsDirty();
    this.typedText.set(undefined);
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

  private readonly lookupLabel = async(key: T, abortSignal: AbortSignal): Promise<string | undefined> => {
    const searchFilter = this.searchFilter();
    try {
      if (searchFilter.resolveLabel) {
        return await searchFilter.resolveLabel(key, abortSignal);
      }
      const matches = await searchFilter.search(String(key), abortSignal);
      return matches.find(option => option.key === key)?.label;
    } catch(error) {
      this.report(error, abortSignal);
      return undefined;
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
