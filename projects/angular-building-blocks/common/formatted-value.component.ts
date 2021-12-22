import { ChangeDetectionStrategy, Component, DEFAULT_CURRENCY_CODE, Inject, Input, ViewEncapsulation } from '@angular/core';

import { DEFAULT_DATE_FORMAT, DEFAULT_TIMEZONE } from './common.interface';

@Component({
  selector: 'enigmatry-formatted-value',
  templateUrl: './formatted-value.component.html',
  styleUrls: ['./formatted-value.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnigmatryFormattedValueComponent {
  @Input() value: string | undefined;
  @Input() type: string;
  @Input() typeParameter: any | undefined;

  constructor(
    @Inject(DEFAULT_DATE_FORMAT) public defaultDateFormat: string,
    @Inject(DEFAULT_TIMEZONE) public defaultTimezone: string,
    @Inject(DEFAULT_CURRENCY_CODE) public defaultCurrencyCode: string) {
  }
}
