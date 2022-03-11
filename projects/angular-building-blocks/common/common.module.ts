import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DEFAULT_DATE_FORMAT, DEFAULT_PERCENTAGE_MULTIPLIER, DEFAULT_TIMEZONE } from './common.interface';
import { EnigmatryFormattedValueComponent } from './formatted-value.component';
import { EnigmatryPipesModule } from '@enigmatry/angular-building-blocks/pipes';

@NgModule({
  declarations: [
    EnigmatryFormattedValueComponent
  ],
  imports: [
    CommonModule,
    EnigmatryPipesModule
  ],
  exports: [
    EnigmatryFormattedValueComponent
  ],
  providers: [
    { provide: DEFAULT_DATE_FORMAT, useValue: 'mediumDate' },
    { provide: DEFAULT_TIMEZONE, useValue: 'undefined' },
    { provide: DEFAULT_PERCENTAGE_MULTIPLIER, useValue: 1 }
  ]
})
export class EnigmatryCommonModule { }