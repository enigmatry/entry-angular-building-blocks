import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DialogDocsComponent } from './dialog-docs.component';
import { DialogDocsRoutingModule } from './dialog-docs-routing.module';
import { EntryDialogModule } from 'projects/entry-components/dialog/entry-dialog.module';
import { ExamplesModule } from '../../examples/examples.module';

@NgModule({
  declarations: [
    DialogDocsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DialogDocsRoutingModule,
    EntryDialogModule,
    ExamplesModule
  ]
})
export class DialogModule { }
