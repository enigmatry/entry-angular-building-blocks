import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DialogComponent } from './dialog.component';
import { DialogRoutingModule } from './dialog-routing.module';
import { DialogExamplesModule } from '../../examples/dialog/dialog-examples.module';

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DialogRoutingModule,
    DialogExamplesModule
  ]
})
export class DialogModule { }
