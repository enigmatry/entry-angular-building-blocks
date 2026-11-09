import { NgModule } from '@angular/core';
import { AutoDisableButtonExampleComponent } from './directives/auto-disable-button-example/auto-disable-button-example.component';
import { EventPluginExampleComponent } from './event-plugin-example/event-plugin-example.component';

@NgModule({
  imports: [
    EventPluginExampleComponent,
    AutoDisableButtonExampleComponent
  ],
  exports: [
    EventPluginExampleComponent,
    AutoDisableButtonExampleComponent
  ]
})
export class CommonExampleModule { }
