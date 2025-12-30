export interface RowSelectionFormatter {
  disabled?: (rowData: unknown) => boolean;
  hideCheckbox?: (rowData: unknown) => boolean;
}
