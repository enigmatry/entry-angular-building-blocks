import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderExampleComponent } from './header/header-example.component';
import { EntryHeaderModule } from 'projects/entry-components/header/entry-header.module';
import { SharedModule } from '../../shared/shared.module';



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
