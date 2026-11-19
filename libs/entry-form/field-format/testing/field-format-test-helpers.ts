import { Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

export interface RenderedHost<T> {
  fixture: ComponentFixture<T>;
  input: HTMLInputElement;
}

/** Runs change detection and waits until the fixture, its effects and attribute observers have settled. */
export const settle = async <T>(fixture: ComponentFixture<T>): Promise<void> => {
  fixture.detectChanges();
  await fixture.whenStable();
};

export const renderHost = async <T>(host: Type<T>, providers: Provider[] = []): Promise<RenderedHost<T>> => {
  TestBed.configureTestingModule({ providers });
  const fixture = TestBed.createComponent(host);
  await settle(fixture);
  return { fixture, input: (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement };
};

export const dispatch = (input: HTMLInputElement, event: 'focus' | 'blur' | 'input' | 'compositionstart' | 'compositionend'): void => {
  input.dispatchEvent(new Event(event));
};

export const typeText = (input: HTMLInputElement, text: string): void => {
  input.value = text;
  input.dispatchEvent(new Event('input'));
};
