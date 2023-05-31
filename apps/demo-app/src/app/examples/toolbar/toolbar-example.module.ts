import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarExampleComponent } from './toolbar-example.component';
import { EntryToolbarModule } from '@enigmatry/entry-components/toolbar';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ToolbarExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntryToolbarModule
  ],
  exports: [
    ToolbarExampleComponent
  ]
})
export class ToolbarExampleModule { }
