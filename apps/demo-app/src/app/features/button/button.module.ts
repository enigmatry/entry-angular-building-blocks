import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button.component';
import { SharedModule } from '../../shared/shared.module';
import { ButtonExampleModule } from '../../examples/button/button-example.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: ButtonComponent
}];

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonExampleModule,
    RouterModule.forChild(routes)
  ]
})
export class ButtonModule { }
