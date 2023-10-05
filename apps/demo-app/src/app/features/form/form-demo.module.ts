import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-demo-routing.module';
import { FormDemoComponent } from './form-demo.component';
import { SharedModule } from '../../shared/shared.module';
import { FormExampleModule } from '../../examples/form/form-example.module';

@NgModule({
    declarations: [
        FormDemoComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormExampleModule,
        FormRoutingModule
    ]
})
export class FormDemoModule { }
