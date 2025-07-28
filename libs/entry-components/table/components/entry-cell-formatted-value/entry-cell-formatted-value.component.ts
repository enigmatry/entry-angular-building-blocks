import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ColumnTypeParameter } from '../../interfaces';
import { DEFAULT_PERCENTAGE_MULTIPLIER } from '../../interfaces/entry-table-config';

@Component({
    selector: 'entry-cell-formatted-value',
    templateUrl: './entry-cell-formatted-value.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EntryCellFormattedValueComponent {
  @Input() value: string | undefined;
  @Input() type: string;
  @Input() typeParameter: ColumnTypeParameter & { multiplier?: number } | undefined;

  public readonly defaultPercentageMultiplier: number = inject(DEFAULT_PERCENTAGE_MULTIPLIER);
}
