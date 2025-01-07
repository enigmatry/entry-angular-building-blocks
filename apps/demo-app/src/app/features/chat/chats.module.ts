import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AssistantMessageComponent } from './assistant-message/assistant-message.component';
import { ChatComponent } from './chat/chat.component';
import { UserMessageComponent } from './user-message/user-message.component';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AssistantMessageComponent,
    UserMessageComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    SharedModule,
  ]
})
export class ChatsModule { }
