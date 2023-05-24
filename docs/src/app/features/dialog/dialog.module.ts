import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DialogDocsComponent } from './dialog-docs.component';
import { DialogDocsRoutingModule } from './dialog-docts-routing.module';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    DialogDocsComponent,
    AlertComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DialogDocsRoutingModule
  ]
})
export class DialogModule { }
