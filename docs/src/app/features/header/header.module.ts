import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HeaderDocsComponent } from './header-docs.component';
import { HeaderDocsRoutingModule } from './header-docts-routing.module';

@NgModule({
  declarations: [
    HeaderDocsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderDocsRoutingModule
  ]
})
export class HeaderModule { }
