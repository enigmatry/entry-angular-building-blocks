import { Signal, computed, effect, untracked } from '@angular/core';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';

const settingsOf = (definition: EntryFieldFormatDefinition): EntryFieldFormatDefinition => {
  const { name, format, timezone, locale, currencyCode, display, digitsInfo, multiplier } = definition;
  return { name, format, timezone, locale, currencyCode, display, digitsInfo, multiplier };
};

const hasSameSettings = (previous: EntryFieldFormatDefinition, next: EntryFieldFormatDefinition): boolean =>
  Object.keys(previous).every(setting => Object.is(previous[setting], next[setting]));

/** Must be called in an injection context. Returns the settings of the definition, copied when they last changed. */
export const observeDefinition = (definition: Signal<EntryFieldFormatDefinition>, onChange: () => void): Signal<EntryFieldFormatDefinition> => {
  // A copy, read untracked: a change inside the bound object, also through a signal it reads, must not be half seen.
  const settings = computed(() => {
    const bound = definition();
    return untracked(() => settingsOf(bound));
  }, { equal: hasSameSettings });
  effect(() => {
    settings();
    untracked(onChange);
  });
  return settings;
};
