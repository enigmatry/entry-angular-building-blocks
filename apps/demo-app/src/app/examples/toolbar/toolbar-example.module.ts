import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarExampleComponent } from './toolbar-example.component';
import { EntryToolbarModule } from '@enigmatry/entry-components/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ToolbarExampleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EntryToolbarModule
  ],
  exports: [
    ToolbarExampleComponent
  ]
})
export class ToolbarExampleModule { }
