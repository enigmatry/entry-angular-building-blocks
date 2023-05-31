import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarExampleComponent } from './toolbar-example.component';
import { EntryToolbarModule } from '@enigmatry/entry-components/toolbar';

@NgModule({
  declarations: [
    ToolbarExampleComponent
  ],
  imports: [
    CommonModule,
    EntryToolbarModule
  ],
  exports: [
    ToolbarExampleComponent
  ]
})
export class ToolbarExampleModule { }
