import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Directives */

import { AutoDisableButtonDirective } from './directives/auto-disable-button.directive';
import { ScrollToInvalidControlDirective } from './directives/scroll-to-invalid-control.directive';

const DIRECTIVES = [
  AutoDisableButtonDirective,
  ScrollToInvalidControlDirective,
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DIRECTIVES
  ],
  exports: [
    DIRECTIVES
  ]
})
export class EntryCommonModule {
}
