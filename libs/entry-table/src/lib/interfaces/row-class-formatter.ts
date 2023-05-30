export interface RowClassFormatter {
  [className: string]: (rowData: any) => boolean;
}
