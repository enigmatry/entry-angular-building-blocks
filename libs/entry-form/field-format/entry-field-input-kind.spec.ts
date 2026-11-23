import { describe, expect, it } from 'vitest';
import { EntryFieldInputKind, inputKindOf } from './entry-field-input-kind';

describe('inputKindOf', () => {
  it.each<[string, EntryFieldInputKind]>([
    ['text', 'text'],
    ['search', 'text'],
    ['tel', 'text'],
    ['url', 'text'],
    ['email', 'text'],
    ['number', 'number'],
    ['range', 'number'],
    ['date', 'native'],
    ['datetime-local', 'native'],
    ['time', 'native'],
    ['color', 'native'],
    ['password', 'native']
  ])('reads an input of type %s as %s', (type, kind) => {
    const input = document.createElement('input');
    input.type = type;

    expect(inputKindOf(input)).toBe(kind);
  });

  it('reads a textarea as text', () => {
    expect(inputKindOf(document.createElement('textarea'))).toBe('text');
  });
});
