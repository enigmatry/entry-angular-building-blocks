import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPluginExampleComponent } from './event-plugin-example/event-plugin-example.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    EventPluginExampleComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    EventPluginExampleComponent
  ]
})
export class CommonExampleModule { }
