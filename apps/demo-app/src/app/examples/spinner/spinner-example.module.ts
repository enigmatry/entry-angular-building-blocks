import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { EntrySpinnerModule } from '@enigmatry/entry-components/spinner';

@NgModule({
  declarations: [
    SpinnerExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntrySpinnerModule
  ],
  exports: [
    SpinnerExampleComponent
  ]
})
export class SpinnerExampleModule { }
