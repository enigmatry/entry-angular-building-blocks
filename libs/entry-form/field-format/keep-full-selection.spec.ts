import { afterEach, describe, expect, it, vi } from 'vitest';
import { keepFullSelection } from './keep-full-selection';

const formattedText = '1,234.50';
const editedText = '1234.5';

const fieldWith = (value: string, type = 'text'): HTMLInputElement => {
  const field = document.createElement('input');
  field.type = type;
  field.value = value;
  return field;
};

const showEditedText = (field: HTMLInputElement) => (): void => {
  field.value = editedText;
};

describe('keepFullSelection', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('selects the new text when the whole text was selected before the change', () => {
    const field = fieldWith(formattedText);
    field.select();

    keepFullSelection(field, showEditedText(field));

    expect([field.value, field.selectionStart, field.selectionEnd]).toStrictEqual([editedText, 0, editedText.length]);
  });

  it.each<[string, number, number]>([
    ['a caret at the end', formattedText.length, formattedText.length],
    ['a caret at the start', 0, 0],
    ['a part of the text selected', 1, 4]
  ])('leaves the caret where the change puts it when the field had %s', (_kind, start, end) => {
    const field = fieldWith(formattedText);
    field.setSelectionRange(start, end);

    keepFullSelection(field, showEditedText(field));

    expect([field.selectionStart, field.selectionEnd]).toStrictEqual([editedText.length, editedText.length]);
  });

  it('does not select again when the change leaves the whole text selected', () => {
    const field = fieldWith(formattedText);
    field.select();
    const select = vi.spyOn(field, 'select');

    keepFullSelection(field, () => undefined);

    expect(select).not.toHaveBeenCalled();
  });

  it.each<[string, HTMLInputElement]>([
    ['is empty', fieldWith('')],
    ['has no text selection to read, as an email input', fieldWith('a@b.c', 'email')]
  ])('does not select the text of a field that %s', (_kind, field) => {
    const select = vi.spyOn(field, 'select');

    keepFullSelection(field, showEditedText(field));

    expect(select).not.toHaveBeenCalled();
  });
});
