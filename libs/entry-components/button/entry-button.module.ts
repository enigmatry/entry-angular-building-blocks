import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EntryButtonDirective } from './entry-button.directive';

@NgModule({
  declarations: [
    EntryButtonDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    EntryButtonDirective
  ]
})
export class EntryButtonModule { }
