import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarRoutingModule } from './toolbar-routing.module';
import { ToolbarComponent } from './toolbar.component';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarExampleModule } from '../../examples/toolbar/toolbar-example.module';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToolbarRoutingModule,
    ToolbarExampleModule
  ]
})
export class ToolbarModule { }
