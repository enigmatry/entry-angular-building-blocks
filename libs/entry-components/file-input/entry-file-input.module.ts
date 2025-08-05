import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EntryButtonModule } from '@enigmatry/entry-components/button';
import { EntryFileInputComponent } from './entry-file-input.component';

@NgModule({
  declarations: [
    EntryFileInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    EntryButtonModule
  ],
  exports: [
    EntryFileInputComponent
  ]
})
export class EntryFileInputModule { }
