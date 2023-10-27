import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoDisableSubmitButtonDirective } from './directives/auto-disable-submit-button.directive';
import { ScrollToInvalidFormControlDirective } from './directives/scroll-to-invalid-form-control.directive';

const DIRECTIVES = [
  AutoDisableSubmitButtonDirective,
  ScrollToInvalidFormControlDirective
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
export class EntryCommonModule { }
