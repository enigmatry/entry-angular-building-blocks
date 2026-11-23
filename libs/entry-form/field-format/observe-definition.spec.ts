import { Signal, WritableSignal, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Mock, describe, expect, it, vi } from 'vitest';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';
import { observeDefinition } from './observe-definition';
import { euroDefinition } from './testing/field-format-test-data';

interface Observed {
  definition: WritableSignal<EntryFieldFormatDefinition>;
  settings: Signal<EntryFieldFormatDefinition>;
  onChange: Mock<() => void>;
}

const observed = (): Observed => {
  const definition = signal<EntryFieldFormatDefinition>({ ...euroDefinition });
  const onChange = vi.fn<() => void>();
  const settings = TestBed.runInInjectionContext(() => observeDefinition(definition, onChange));
  TestBed.tick();
  return { definition, settings, onChange };
};

const bind = ({ definition }: Observed, next: EntryFieldFormatDefinition): void => {
  definition.set(next);
  TestBed.tick();
};

describe('observeDefinition', () => {
  it('returns the settings of the first definition and calls back for it', () => {
    const { settings, onChange } = observed();

    expect(settings()).toMatchObject(euroDefinition);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it.each<[string, EntryFieldFormatDefinition]>([
    ['name', { ...euroDefinition, name: 'number' }],
    ['format', { ...euroDefinition, format: 'dd-MM-yyyy' }],
    ['time zone', { ...euroDefinition, timezone: '+0200' }],
    ['locale', { ...euroDefinition, locale: 'nl' }],
    ['currency code', { ...euroDefinition, currencyCode: 'USD' }],
    ['display', { ...euroDefinition, display: 'code' }],
    ['digits', { ...euroDefinition, digitsInfo: '1.0-0' }],
    ['multiplier', { ...euroDefinition, multiplier: 100 }]
  ])('returns the new settings and calls back when a definition with another %s is bound', (_setting, next) => {
    const host = observed();

    bind(host, next);

    expect(host.settings()).toMatchObject(next);
    expect(host.onChange).toHaveBeenCalledTimes(2);
  });

  it.each<[string, EntryFieldFormatDefinition]>([
    ['has the same settings', { ...euroDefinition }],
    ['differs in a property that is not a setting', { ...euroDefinition, mask: '000' }]
  ])('keeps the settings and does not call back when another object is bound that %s', (_kind, next) => {
    const host = observed();
    const settings = host.settings();

    bind(host, next);

    expect(host.settings()).toBe(settings);
    expect(host.onChange).toHaveBeenCalledTimes(1);
  });

  it('keeps the settings and does not call back when the bound object is changed in place', () => {
    const { definition, settings, onChange } = observed();

    definition().locale = 'nl';
    TestBed.tick();

    expect(settings().locale).toBe(euroDefinition.locale);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('keeps the settings and does not call back when a signal changes that a getter of the bound object reads', () => {
    const locale = signal('de');
    const host = observed();
    const next: EntryFieldFormatDefinition = {
      name: 'number',
      get locale() {
        return locale();
      }
    };
    bind(host, next);

    locale.set('nl');
    TestBed.tick();

    expect(host.settings().locale).toBe('de');
    expect(host.onChange).toHaveBeenCalledTimes(2);
  });

  it('returns the settings of a copy of an object that was changed after it was bound, and calls back', () => {
    const host = observed();
    const bound = host.definition();

    bound.locale = 'nl';
    bind(host, { ...bound });

    expect(host.settings().locale).toBe('nl');
    expect(host.onChange).toHaveBeenCalledTimes(2);
  });

  it('keeps the settings when the changed object is followed by an object with the settings that were bound first', () => {
    const host = observed();

    host.definition().locale = 'nl';
    bind(host, { ...euroDefinition });

    expect(host.settings().locale).toBe(euroDefinition.locale);
    expect(host.onChange).toHaveBeenCalledTimes(1);
  });
});
