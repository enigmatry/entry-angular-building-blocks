import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';
import { AssistantMessageComponent } from './assistant-message/assistant-message.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { UserMessageComponent } from './user-message/user-message.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { EntryFileInputModule, provideEntryButtonConfig } from '@enigmatry/entry-components';

@NgModule({
  declarations: [
    ChatComponent,
    AssistantMessageComponent,
    ChatHeaderComponent,
    UserMessageComponent,
    MarkdownPipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatExpansionModule,
    EntryFileInputModule
  ],
  exports: [
    ChatComponent
  ],
  providers: [
    provideEntryButtonConfig({
      submit: { type: 'basic', color: 'primary' },
    })
  ]
})
export class EntryChatModule { }
