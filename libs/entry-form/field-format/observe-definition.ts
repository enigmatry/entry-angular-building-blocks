import { Signal, computed, effect, untracked } from '@angular/core';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';

const maximumDepth = 4;

const isPlain = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && (Array.isArray(value) || Object.getPrototypeOf(value) === Object.prototype);

/**
 * Whether two values hold the same content: the same primitives, or plain objects and arrays with the same own
 * properties. Class instances, and anything nested deeper than a definition's options go, are compared by identity.
 */
export const hasSameContent = (first: unknown, second: unknown, depth = 0): boolean => {
  if (Object.is(first, second)) {
    return true;
  }
  if (!isPlain(first) || !isPlain(second) || depth > maximumDepth) {
    return false;
  }
  const keys = Object.keys(first);
  return Array.isArray(first) === Array.isArray(second)
    && keys.length === Object.keys(second).length
    && keys.every(key => Object.hasOwn(second, key) && hasSameContent(first[key], second[key], depth + 1));
};

/**
 * Calls `onChange` once at the start and whenever the content of `definition` changes. A new object with the same
 * content, as a getter or a function call in a template returns on every change detection, is not a change.
 * Called in an injection context.
 */
export const observeDefinition = (definition: Signal<EntryFieldFormatDefinition>, onChange: () => void): void => {
  const content = computed(definition, { equal: (first, second) => hasSameContent(first, second) });
  effect(() => {
    content();
    untracked(onChange);
  });
};
