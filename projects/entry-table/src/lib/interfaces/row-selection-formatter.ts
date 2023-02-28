export interface RowSelectionFormatter {
  disabled?: (rowData: any) => boolean;
  hideCheckbox?: (rowData: any) => boolean;
}
