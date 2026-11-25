export type EntryFieldInputKind = 'text' | 'number' | 'native';

const textTypes = new Set(['text', 'search', 'tel', 'url', 'email', 'textarea']);
const numberTypes = new Set(['number', 'range']);

export const inputKindOf = (element: HTMLInputElement | HTMLTextAreaElement): EntryFieldInputKind => {
  if (numberTypes.has(element.type)) {
    return 'number';
  }
  return textTypes.has(element.type) ? 'text' : 'native';
};
