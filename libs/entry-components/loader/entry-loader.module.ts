import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EntryLoaderComponent } from './entry-loader/entry-loader.component';

@NgModule({
  declarations: [
    EntryLoaderComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    EntryLoaderComponent
  ]
})
export class EntryLoaderModule { }
