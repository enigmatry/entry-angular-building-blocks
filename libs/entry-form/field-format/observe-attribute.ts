import { DestroyRef, inject } from '@angular/core';

/**
 * Calls `onChange` after `attribute` of `element` changes, however it was set (a static attribute, a `[readonly]`
 * property binding, another directive's host binding), until the injection context is destroyed. Does nothing where
 * `MutationObserver` is unavailable, as during server-side rendering. Called in an injection context.
 */
export const observeAttribute = (element: Element, attribute: string, onChange: () => void): void => {
  if (typeof MutationObserver === 'undefined') {
    return;
  }
  const observer = new MutationObserver(onChange);
  observer.observe(element, { attributes: true, attributeFilter: [attribute] });
  inject(DestroyRef).onDestroy(() => observer.disconnect());
};
