import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonRoutingModule } from './button-routing.module';
import { ButtonComponent } from './button.component';
import { SharedModule } from '../../shared/shared.module';
import { ButtonExampleModule } from '../../examples/button/button-example.module';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonExampleModule,
    ButtonRoutingModule
  ]
})
export class ButtonModule { }
