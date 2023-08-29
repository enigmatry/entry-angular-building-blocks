import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryFileInputComponent } from './entry-file-input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EntryFileInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    EntryFileInputComponent
  ]
})
export class EntryFileInputModule { }
