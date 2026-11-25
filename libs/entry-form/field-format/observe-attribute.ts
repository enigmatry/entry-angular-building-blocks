import { DestroyRef, inject } from '@angular/core';

/** Must be called in an injection context. Does nothing where `MutationObserver` does not exist, as on a server. */
export const observeAttribute = (element: Element, attribute: string, onChange: () => void): void => {
  if (typeof MutationObserver === 'undefined') {
    return;
  }
  const observer = new MutationObserver(onChange);
  observer.observe(element, { attributes: true, attributeFilter: [attribute] });
  inject(DestroyRef).onDestroy(() => observer.disconnect());
};
