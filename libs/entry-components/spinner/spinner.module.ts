import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EntrySpinnerComponent } from './entry-spinner/spinner.component';

@NgModule({
  declarations: [
    EntrySpinnerComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    MatProgressSpinnerModule
  ],
  exports: [
    EntrySpinnerComponent
  ]
})
export class EntrySpinnerModule { }
