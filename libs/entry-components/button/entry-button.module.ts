import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryButtonDirective } from './entry-button.directive';
import { MatButtonModule } from '@angular/material/button';

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
