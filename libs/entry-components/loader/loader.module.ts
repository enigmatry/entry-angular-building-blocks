import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EntryLoaderComponent } from './entry-loader/loader.component';
import { EntryLoadingBarComponent } from './entry-loading-bar/loading-bar.component';

@NgModule({
  declarations: [
    EntryLoaderComponent,
    EntryLoadingBarComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    EntryLoaderComponent,
    EntryLoadingBarComponent
  ]
})
export class EntryLoaderModule { }
