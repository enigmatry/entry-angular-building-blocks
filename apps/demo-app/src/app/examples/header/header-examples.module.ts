import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderExampleComponent } from './header/header-example.component';
import { SharedModule } from '../../shared/shared.module';
import { EntryHeaderModule } from '@enigmatry/entry-components/header';

@NgModule({
  declarations: [
    HeaderExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntryHeaderModule
  ],
  exports: [
    HeaderExampleComponent
  ]
})
export class HeaderExamplesModule { }
