import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { EntryChatComponent } from './entry-chat/entry-chat.component';
import { EntryChatMessageComponent } from './entry-chat-message/entry-chat-message.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    EntryChatComponent,
    EntryChatMessageComponent
  ],
  exports: [
    EntryChatComponent
  ]
})
export class EntryChatModule { }
