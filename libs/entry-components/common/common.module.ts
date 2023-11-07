import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Directives */

import { ScrollToInvalidControlDirective } from './directives/scroll-to-invalid-control.directive';
import { AutoDisableSubmitButtonDirective } from './directives/auto-disable-submit-button.directive';

const DIRECTIVES = [
  ScrollToInvalidControlDirective,
  AutoDisableSubmitButtonDirective
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ...DIRECTIVES
  ],
  exports: [
    ...DIRECTIVES
  ]
})
export class EntryCommonModule {
}
