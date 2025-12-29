import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ColumnDefinition } from '../../interfaces';
import { EntryCellFormattedValueComponent } from '../entry-cell-formatted-value/entry-cell-formatted-value.component';

@Component({
    imports: [EntryCellFormattedValueComponent],
    selector: 'entry-cell',
    templateUrl: './entry-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryCellComponent<T> {
  readonly rowData = input.required<T>();
  readonly columnDefinition = input.required<ColumnDefinition>();
  readonly value = computed(() => this.getCellValue(this.rowData(), this.columnDefinition()));
  readonly printableValue = computed(() => this.value() as string ?? '');

  protected readonly getCellValue = (rowData: T, columnDefinition: ColumnDefinition) => {
    const keys = columnDefinition.field ? columnDefinition.field.split('.') : [];
    return keys.reduce((data, key) => data && (data as Record<string, T>)[key], rowData);
  };
}
