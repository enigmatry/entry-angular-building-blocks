export interface RowClassFormatter {
  [className: string]: (rowData: unknown) => boolean;
}
