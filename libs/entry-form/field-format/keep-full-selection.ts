type TextField = HTMLInputElement | HTMLTextAreaElement;

const isFullySelected = (field: TextField): boolean =>
  field.value.length > 0 && field.selectionStart === 0 && field.selectionEnd === field.value.length;

// A browser selects the text of a field the user tabs into, and assigning another value drops that selection.
export const keepFullSelection = (field: TextField, change: () => void): void => {
  const selected = isFullySelected(field);
  change();
  if (selected && !isFullySelected(field)) {
    field.select();
  }
};
