import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { SharedModule } from '../../shared/shared.module';
import { EntryButtonModule, provideEntryButtonConfig } from '@enigmatry/entry-components/button';

@NgModule({
  declarations: [
    ButtonExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntryButtonModule
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

