import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryDialogModule } from 'projects/entry-components/dialog/entry-dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AlertExampleComponent } from './alert/alert-example.component';
import { ConfirmExampleComponent } from './confirm/confirm-example.component';
import { CustomDialogExampleComponent } from './custom/custom-dialog-example.component';
import { CustomDialogComponent } from './custom/custom-dialog.component';

@NgModule({
  declarations: [
    AlertExampleComponent,
    ConfirmExampleComponent,
    CustomDialogExampleComponent,
    CustomDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EntryDialogModule
  ],
  exports: [
    AlertExampleComponent,
    ConfirmExampleComponent,
    CustomDialogExampleComponent,
  ]
})
export class DialogExamplesModule { }
