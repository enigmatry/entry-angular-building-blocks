import { LOCALE_ID, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { entryFieldFormatterProviders } from '../entry-field-formatter';

export type FieldElement = HTMLInputElement | HTMLTextAreaElement;

export interface RenderedHost<T, E extends FieldElement = HTMLInputElement> {
  fixture: ComponentFixture<T>;
  input: E;
}

// A plain Event as a script dispatches it, the two input types browsers use for IME text, and the one for typed text.
export const unchangedInputs: [string, string | undefined][] = [
  ['a plain', undefined],
  ['an insertFromComposition', 'insertFromComposition'],
  ['an insertCompositionText', 'insertCompositionText'],
  ['an insertText', 'insertText']
];

export const unbuffered: Provider[] = [{ provide: COMPOSITION_BUFFER_MODE, useValue: false }];

export const formatterProviders = (locale = 'en-US'): Provider[] => [entryFieldFormatterProviders, { provide: LOCALE_ID, useValue: locale }];

export const settle = async <T>(fixture: ComponentFixture<T>): Promise<void> => {
  fixture.detectChanges();
  await fixture.whenStable();
};

const hostElement = <T>(fixture: ComponentFixture<T>): HTMLElement => {
  const element: unknown = fixture.nativeElement;
  if (!(element instanceof HTMLElement)) {
    throw new Error('The test host is not rendered as an element.');
  }
  return element;
};

export const submitForm = <T>(fixture: ComponentFixture<T>): void => {
  hostElement(fixture)
    .querySelector('form')
    ?.dispatchEvent(new Event('submit'));
};

export const fieldsOf = <T>(fixture: ComponentFixture<T>): HTMLInputElement[] => Array.from(hostElement(fixture).querySelectorAll('input'));

export const renderHost = async <T, E extends FieldElement = HTMLInputElement>(
  host: Type<T>,
  providers: Provider[] = [],
  selector = 'input'
): Promise<RenderedHost<T, E>> => {
  TestBed.configureTestingModule({ providers });
  const fixture = TestBed.createComponent(host);
  await settle(fixture);
  const input = hostElement(fixture).querySelector<E>(selector);
  if (!input) {
    throw new Error(`The test host has no ${selector} element.`);
  }
  return { fixture, input };
};

// A dispatched focus or blur event does not move the real focus; input.focus() and input.blur() do.
export const dispatch = (input: FieldElement, event: 'focus' | 'blur' | 'input' | 'compositionstart' | 'compositionend'): void => {
  input.dispatchEvent(new Event(event));
};

export const typeText = (input: FieldElement, text: string): void => {
  input.value = text;
  input.dispatchEvent(new Event('input'));
};

export const dispatchInput = (input: FieldElement, inputType?: string): void => {
  input.dispatchEvent(inputType ? new InputEvent('input', { inputType }) : new Event('input'));
};

const withoutEvent = (ownerDocument: Document, event: 'focus' | 'blur', act: () => void): void => {
  const stop = (dispatched: Event): void => dispatched.stopPropagation();
  ownerDocument.addEventListener(event, stop, { capture: true });
  try {
    act();
  } finally {
    ownerDocument.removeEventListener(event, stop, { capture: true });
  }
};

export const withoutBlurEvent = (input: FieldElement, act: () => void): void => {
  withoutEvent(input.ownerDocument, 'blur', act);
};

// As when a field was focused before its page hydrated: it has the focus, but no focus event reached the directive.
export const focusSilently = (input: FieldElement): void => {
  withoutEvent(input.ownerDocument, 'focus', () => input.focus());
};

// As when a browser drops the focus of a field that was disabled: the focus moves away without a blur event.
export const loseFocusSilently = (input: FieldElement): void => {
  const other = input.ownerDocument.createElement('button');
  input.ownerDocument.body.append(other);
  withoutEvent(input.ownerDocument, 'blur', () => other.focus());
  other.remove();
};
