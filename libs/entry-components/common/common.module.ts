import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Directives */

import { ScrollToInvalidControlDirective } from './directives/scroll-to-invalid-control.directive';

const DIRECTIVES = [
  ScrollToInvalidControlDirective
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
