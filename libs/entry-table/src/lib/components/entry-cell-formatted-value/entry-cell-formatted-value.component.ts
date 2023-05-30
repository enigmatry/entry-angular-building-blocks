import { ChangeDetectionStrategy, Component, DEFAULT_CURRENCY_CODE, Inject, Input } from '@angular/core';
import { DEFAULT_DATE_FORMAT, DEFAULT_PERCENTAGE_MULTIPLIER, DEFAULT_TIMEZONE } from '../../interfaces/entry-table-config';

@Component({
  selector: 'entry-cell-formatted-value',
  templateUrl: './entry-cell-formatted-value.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryCellFormattedValueComponent {

  @Input() value: string | undefined;
  @Input() type: string;
  @Input() typeParameter: any | undefined;

  constructor(
    @Inject(DEFAULT_DATE_FORMAT) public defaultDateFormat: string,
    @Inject(DEFAULT_TIMEZONE) public defaultTimezone: string,
    @Inject(DEFAULT_CURRENCY_CODE) public defaultCurrencyCode: string,
    @Inject(DEFAULT_PERCENTAGE_MULTIPLIER) public defaultPercentageMultiplier: number) {
  }
}
