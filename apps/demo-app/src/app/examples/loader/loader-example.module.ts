import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LoaderExampleComponent } from './loader-example/loader-example.component';
import { EntryLoaderModule } from '@enigmatry/entry-components/loader';

@NgModule({
  declarations: [
    LoaderExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntryLoaderModule
  ],
  exports: [
    LoaderExampleComponent
  ]
})
export class LoaderExampleModule { }
