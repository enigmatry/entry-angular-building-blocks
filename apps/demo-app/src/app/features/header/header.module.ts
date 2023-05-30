import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderExamplesModule } from '../../examples/header/header-examples.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderRoutingModule,
    HeaderExamplesModule
  ]
})
export class HeaderModule { }
