import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderRoutingModule
  ]
})
export class HeaderModule { }
