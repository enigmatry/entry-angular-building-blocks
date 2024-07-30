import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatExampleComponent } from './chat-example/chat-example.component';
import { EntryChatModule } from '@enigmatry/entry-components/chat';

@NgModule({
  declarations: [
    ChatExampleComponent
  ],
  imports: [
    CommonModule,
    EntryChatModule
  ],
  exports: [
    ChatExampleComponent
  ]
})
export class ChatExampleModule { }
