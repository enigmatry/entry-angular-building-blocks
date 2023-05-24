import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DialogDocsComponent } from './dialog-docs.component';
import { DialogDocsRoutingModule } from './dialog-docs-routing.module';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { EntryDialogModule } from 'projects/entry-components/entry-dialog/entry-dialog.module';

@NgModule({
  declarations: [
    DialogDocsComponent,
    AlertComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DialogDocsRoutingModule,
    EntryDialogModule
  ]
})
export class DialogModule { }
