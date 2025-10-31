import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntrySpinnerModule } from '@enigmatry/entry-components/spinner';
import { SharedModule } from '../../shared/shared.module';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';

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
