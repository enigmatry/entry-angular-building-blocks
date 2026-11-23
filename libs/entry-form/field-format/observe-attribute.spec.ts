import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { observeAttribute } from './observe-attribute';

const observed = (): { element: HTMLInputElement; onChange: () => void } => {
  const element = document.createElement('input');
  const onChange = vi.fn();
  TestBed.runInInjectionContext(() => observeAttribute(element, 'readonly', onChange));
  return { element, onChange };
};

const changeAttribute = async(element: HTMLInputElement): Promise<void> => {
  element.setAttribute('readonly', '');
  await Promise.resolve();
};

describe('observeAttribute', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls back when the attribute changes', async() => {
    const { element, onChange } = observed();

    await changeAttribute(element);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call back for another attribute', async() => {
    const { element, onChange } = observed();

    element.setAttribute('placeholder', 'Amount');
    await Promise.resolve();

    expect(onChange).not.toHaveBeenCalled();
  });

  it('stops observing when its injection context is destroyed', async() => {
    const { element, onChange } = observed();

    TestBed.resetTestingModule();
    await changeAttribute(element);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('observes nothing where MutationObserver does not exist, as on a server', async() => {
    vi.stubGlobal('MutationObserver', undefined);
    const { element, onChange } = observed();

    await changeAttribute(element);

    expect(onChange).not.toHaveBeenCalled();
  });
});
