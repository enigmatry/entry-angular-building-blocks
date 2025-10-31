import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntryPermissionDirective } from './permission.directive';
import { EntryPermissionPipe } from './permission.pipe';

@NgModule({
  declarations: [
    EntryPermissionDirective,
    EntryPermissionPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EntryPermissionDirective,
    EntryPermissionPipe
  ]
})
export class EntryPermissionModule { }
