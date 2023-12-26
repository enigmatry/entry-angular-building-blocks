import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EntryProgressBarComponent } from './entry-progress-bar/entry-progress-bar.component';
import { EntrySpinnerComponent } from './entry-spinner/entry-spinner.component';
import { EntryProgressSpinnerComponent } from './entry-progress-spinner/entry-progress-spinner.component';

@NgModule({
  declarations: [
    EntryProgressBarComponent,
    EntryProgressSpinnerComponent,
    EntrySpinnerComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    EntryProgressBarComponent,
    EntryProgressSpinnerComponent,
    EntrySpinnerComponent
  ]
})
export class EntrySpinnerModule { }
