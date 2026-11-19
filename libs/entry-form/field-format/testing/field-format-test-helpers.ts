import { Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

export type FieldElement = HTMLInputElement | HTMLTextAreaElement;

export interface RenderedHost<T, E extends FieldElement = HTMLInputElement> {
  fixture: ComponentFixture<T>;
  input: E;
}

/** Runs change detection and waits until the fixture, its effects and attribute observers have settled. */
export const settle = async <T>(fixture: ComponentFixture<T>): Promise<void> => {
  fixture.detectChanges();
  await fixture.whenStable();
};

/** Renders `host` and returns its first field; pass `selector` (and the element type) for a host without an `<input>`. */
export const renderHost = async <T, E extends FieldElement = HTMLInputElement>(
  host: Type<T>,
  providers: Provider[] = [],
  selector = 'input'
): Promise<RenderedHost<T, E>> => {
  TestBed.configureTestingModule({ providers });
  const fixture = TestBed.createComponent(host);
  await settle(fixture);
  const input = (fixture.nativeElement as HTMLElement).querySelector<E>(selector);
  if (!input) {
    throw new Error(`The test host has no ${selector} element.`);
  }
  return { fixture, input };
};

export const dispatch = (input: FieldElement, event: 'focus' | 'blur' | 'input' | 'compositionstart' | 'compositionend'): void => {
  input.dispatchEvent(new Event(event));
};

export const typeText = (input: FieldElement, text: string): void => {
  input.value = text;
  input.dispatchEvent(new Event('input'));
};

/** The input event an IME sends for composed text; Safari (`insertFromComposition`) and Firefox send one after the composition ended. */
export const dispatchImeInput = (input: FieldElement, inputType = 'insertFromComposition'): void => {
  input.dispatchEvent(new InputEvent('input', { inputType }));
};
