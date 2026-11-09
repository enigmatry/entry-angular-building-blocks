import { NgModule } from '@angular/core';
import { provideEntryButtonConfig } from '@enigmatry/entry-components/button';
import { ButtonExampleComponent } from './button-example/button-example.component';

@NgModule({
  imports: [
    ButtonExampleComponent
  ],
  exports: [
    ButtonExampleComponent
  ],
  providers: [
    provideEntryButtonConfig({
      submit: { type: 'raised', color: 'primary' },
      cancel: { type: 'basic', color: 'accent' }
    })
  ]
})
export class ButtonExampleModule { }
