import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DialogDocsComponent } from './dialog-docs.component';
import { DialogDocsRoutingModule } from './dialog-docts-routing.module';

@NgModule({
  declarations: [
    DialogDocsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DialogDocsRoutingModule
  ]
})
export class DialogModule { }
