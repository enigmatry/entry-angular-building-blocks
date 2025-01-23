import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
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
  @Input() typeParameter: any | undefined;

  constructor(
    @Inject(DEFAULT_PERCENTAGE_MULTIPLIER) public defaultPercentageMultiplier: number) {
  }
}
