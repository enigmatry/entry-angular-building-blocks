import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EntryButtonDirective } from './entry-button.directive';

@NgModule({
  declarations: [
    EntryButtonDirective
  ],
  imports: [
    CommonModule,
    MatButton
  ],
  exports: [
    EntryButtonDirective
  ]
})
export class EntryButtonModule { }
