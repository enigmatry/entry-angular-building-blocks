import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderExampleComponent } from './loader-example/loader-example.component';
import { EntryLoaderModule } from '@enigmatry/entry-components/loader';
import { SharedModule } from '../../shared/shared.module';

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
