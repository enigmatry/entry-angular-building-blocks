import { ChangeDetectionStrategy, Component, ElementRef, ErrorHandler, computed, debounced, inject, input, linkedSignal,
  model, output, resource, signal, viewChild } from '@angular/core';
import { FORM_FIELD, FormValueControl } from '@angular/forms/signals';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SelectOption } from '../select-option.model';
import { AutocompleteSearchFilter } from './autocomplete-search-filter.model';
import { PickedOption, delay, lookupLabel, searchOptions } from './autocomplete-search-filter.functions';

@Component({
  selector: 'entry-autocomplete-search-filter',
  templateUrl: './autocomplete-search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AutocompleteSearchFilterComponent<T> implements FormValueControl<T | null> {
  private readonly errorHandler = inject(ErrorHandler);
  /** The `[formField]` on this host, whose field state the inner input shows as its error state. */
  protected readonly formField = inject(FORM_FIELD, { self: true });

  readonly searchFilter = input.required<AutocompleteSearchFilter<T>>();
  /** The selected option's key, not the option. */
  readonly value = model<T | null>(null);
  readonly required = input(false);
  readonly touch = output<void>();

  private readonly searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

  /** The key the filter holds, or `undefined` when it holds nothing. */
  private readonly valueKey = computed(() => {
    const key = this.value();
    return key === null || key === undefined ? undefined : key;
  });

  /** What the user typed, `undefined` while the box shows a committed label. A value from outside ends the edit. */
  private readonly typedText = linkedSignal<T | undefined, string | undefined>({
    source: () => this.valueKey(),
    computation: () => undefined
  });

  /** The option picked here, kept with its key so a value change cannot leave its label behind. */
  private readonly picked = signal<PickedOption<T> | undefined>(undefined);

  /** The picked option, while the filter still carries the callbacks it was picked under. */
  private readonly currentPick = computed(() => {
    const picked = this.picked();
    if (picked === undefined) {
      return undefined;
    }
    const { resolveLabel, search } = this.searchFilter();
    const pickedUnderTheseCallbacks = picked.resolveLabel === resolveLabel && picked.search === search;
    return pickedUnderTheseCallbacks ? picked.option : undefined;
  });

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
      const { minimumCharacters, search } = this.searchFilter();
      return text.length >= minimumCharacters ? { text, search } : undefined;
    },
    loader: ({ params, abortSignal }) => searchOptions(params.search, params.text, abortSignal, this.report),
    defaultValue: [] as readonly SelectOption<T>[]
  });

  /**
   * The label of a key the user did not pick here - one the filter declared, or restored from a URL.
   * Undefined params keep a resource idle, so a key the picked option already covers costs no lookup.
   */
  private readonly resolvedLabel = resource({
    params: () => {
      const key = this.valueKey();
      if (key === undefined || this.currentPick()?.key === key) {
        return undefined;
      }
      // The callbacks ride in the params so that replacing either one supersedes a lookup in flight;
      // read inside the loader they would not be tracked, and a stale label would survive a rebind.
      const { resolveLabel, search } = this.searchFilter();
      return { key, resolveLabel, search };
    },
    loader: ({ params, abortSignal }) => lookupLabel(params, abortSignal, this.report),
    defaultValue: undefined as string | undefined
  });

  protected readonly optionsValue = computed(() => this.options.value());

  /** The picked option's label, while it still belongs to the key the field holds. */
  private readonly pickedLabel = computed(() => {
    const picked = this.currentPick();
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

  /** Called by the form when it focuses this field, e.g. the first invalid one on submit. */
  readonly focus = (options?: FocusOptions): void => this.searchInput().nativeElement.focus(options);

  /**
   * Called by the form on reset - Clear, or the host's `reset(values)`: a typed but unpicked query must go too.
   * The picked option stays, since it is shown only while the field holds its key, so restoring that key keeps its label.
   */
  readonly reset = (): void => {
    this.typedText.set(undefined);
    this.options.set([]);
  };

  protected readonly onTyped = (text: string): void => {
    if (this.valueKey() !== undefined && text !== (this.committedLabel() ?? '')) {
      this.value.set(null);
    }
    // After the clear, never before: `set` absorbs the pending source change, so the other order drops the text.
    this.typedText.set(text);
  };

  protected readonly onSelected = (event: MatAutocompleteSelectedEvent): void => {
    const option = event.option.value as SelectOption<T>;
    const { resolveLabel, search } = this.searchFilter();
    this.picked.set({ option, resolveLabel, search });
    this.value.set(option.key);
    this.typedText.set(undefined);
  };

  // A rejected loader makes `Resource.value()` throw while the view renders: `defaultValue` covers
  // only the idle and post-error reloading states, never the error itself.
  private readonly report = (error: unknown, abortSignal: AbortSignal): void => {
    if (!abortSignal.aborted) {
      this.errorHandler.handleError(error);
    }
  };
}
