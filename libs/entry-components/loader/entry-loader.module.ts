import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EntryProgressBarComponent } from './entry-progress-bar/entry-progress-bar.component';
import { EntrySpinnerComponent } from './entry-spinner/entry-spinner.component';

@NgModule({
  declarations: [
    EntryProgressBarComponent,
    EntrySpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    EntryProgressBarComponent,
    EntrySpinnerComponent
  ]
})
export class EntryLoaderModule { }
