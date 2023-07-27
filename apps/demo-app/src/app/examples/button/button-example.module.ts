import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { SharedModule } from '../../shared/shared.module';
import { ENTRY_BUTTON_CONFIG, EntryButtonConfig, EntryButtonModule } from '@enigmatry/entry-components/button';

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
  providers: [{
    provide: ENTRY_BUTTON_CONFIG,
    useValue: new EntryButtonConfig({
      submitButton: { type: 'raised', color: 'primary' },
      cancelButton: { type: 'basic', }
    })
  }]
})
export class ButtonExampleModule { }
