import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPluginExampleComponent } from './event-plugin-example/event-plugin-example.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { AutoDisableButtonExampleComponent } from './directives/auto-disable-button-example/auto-disable-button-example.component';

@NgModule({
  declarations: [
    EventPluginExampleComponent,
    AutoDisableButtonExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    EventPluginExampleComponent,
    AutoDisableButtonExampleComponent
  ]
})
export class CommonExampleModule { }
