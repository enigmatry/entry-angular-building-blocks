import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ButtonExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ButtonExampleComponent
  ]
})
export class ButtonExampleModule { }
