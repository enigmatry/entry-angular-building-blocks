import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationRoutingModule } from './validation-routing.module';
import { ValidationComponent } from './validation.component';
import { SharedModule } from '../../shared/shared.module';
import { ValidationExampleModule } from '../../examples/validation/validation-example.module';


@NgModule({
  declarations: [
    ValidationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ValidationRoutingModule,
    ValidationExampleModule
  ]
})
export class ValidationModule { }
