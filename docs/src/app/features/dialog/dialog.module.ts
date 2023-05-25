import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DialogComponent } from './dialog.component';
import { DialogRoutingModule } from './dialog-routing.module';
import { EntryDialogModule } from 'projects/entry-components/dialog/entry-dialog.module';
import { ExamplesModule } from '../../examples/examples.module';

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DialogRoutingModule,
    EntryDialogModule,
    ExamplesModule
  ]
})
export class DialogModule { }
