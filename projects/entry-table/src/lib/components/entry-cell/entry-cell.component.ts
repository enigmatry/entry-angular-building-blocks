import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColumnDef } from '../../interfaces';

@Component({
  selector: 'entry-cell',
  templateUrl: './entry-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryCellComponent<T> {

  @Input() rowData: T;
  @Input() colDef: ColumnDef;

  get value(): any {
    return this.getCellValue(this.rowData, this.colDef);
  }

  private getCellValue(rowData: T, colDef: ColumnDef) {
    const keys = colDef.field ? colDef.field.split('.') : [];
    return keys.reduce((data, key) => data && (data as any)[key], rowData);
  }

}
