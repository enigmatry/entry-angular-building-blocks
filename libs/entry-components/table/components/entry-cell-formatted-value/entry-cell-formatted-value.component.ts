import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ColumnTypeParameter } from '../../interfaces';
import { DEFAULT_PERCENTAGE_MULTIPLIER } from '../../interfaces/entry-table-config';

@Component({
    selector: 'entry-cell-formatted-value',
    templateUrl: './entry-cell-formatted-value.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryCellFormattedValueComponent {
  readonly value = input<string | undefined>();
  readonly type = input<string | undefined>();
  readonly typeParameter = input<ColumnTypeParameter & { multiplier?: number } | undefined>();

  public readonly defaultPercentageMultiplier: number = inject(DEFAULT_PERCENTAGE_MULTIPLIER);
}
