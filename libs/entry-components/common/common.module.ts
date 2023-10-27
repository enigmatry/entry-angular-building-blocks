import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Directives */

import { AutoDisableSubmitButtonDirective } from './directives/auto-disable-submit-button.directive';
import { ScrollToInvalidFormControlDirective } from './directives/scroll-to-invalid-form-control.directive';

const DIRECTIVES = [
  AutoDisableSubmitButtonDirective,
  ScrollToInvalidFormControlDirective
];

/** Event plugins */

import { DebounceEventPlugin } from './event-modifiers/debounce.plugin';
import { ThrottleEventPlugin } from './event-modifiers/throttle.plugin';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

const EVENT_PLUGINS = [
  DebounceEventPlugin,
  ThrottleEventPlugin
];

export const NG_EVENT_PLUGINS: Provider[] = EVENT_PLUGINS.map(useClass => ({
  provide: EVENT_MANAGER_PLUGINS,
  multi: true,
  useClass,
}));


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
  static forRoot(): ModuleWithProviders<EntryCommonModule> {
    return {
      ngModule: EntryCommonModule,
      providers: NG_EVENT_PLUGINS
    };
  }
}
