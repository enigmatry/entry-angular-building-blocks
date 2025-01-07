import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('endOfChat') scrollToBottomEl: ElementRef;

  private messagesSubject$ = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject$.asObservable();
  public userRole = 'user';
  public loading: boolean = false;

  constructor(
    private readonly chatsClient: ChatService) { }

  ngOnInit(): void {
    this.addGreetingMessage();
  }

  public send(question: Message) {
    this.scrollToBottom();
    const currentMessages = this.messagesSubject$.getValue();
    this.messagesSubject$.next([...currentMessages, { content: question.content, role: question.role }]);

    this.loading = true;
    this.chatsClient.getData(this.messagesSubject$.getValue())
      .pipe(
        map(items => items.filter(item => item.content)),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (newMessages: Message[]) => {
          this.addMessage(newMessages);
          this.scrollToBottom();
        }
      });
  }

  private addMessage(newMessages: Message[]) {
    const currentMessages = this.messagesSubject$.getValue();
    const combinedMessage = newMessages.reduce((combined, message) => {
      combined.content += `${message.content}`;
      combined.role = message.role;
      combined.sources = message.sources;
      return combined;
    }, { content: '', role: 'assistant', sources: [] });

    if (this.isPreviousMessageFromAssistant()) {
      const previousMessage = currentMessages[currentMessages.length - 1];
      previousMessage.content += `${combinedMessage.content}`;
      previousMessage.sources = combinedMessage.sources;
      this.messagesSubject$.next([...currentMessages]);
    } else {
      this.messagesSubject$.next([...currentMessages, ...[combinedMessage]]);
    }
  }

  private isPreviousMessageFromAssistant() {
    const currentMessages = this.messagesSubject$.getValue();
    return currentMessages.length && currentMessages[currentMessages.length - 1]?.role === 'assistant';
  }

  private addGreetingMessage() {
    const currentMessages = this.messagesSubject$.getValue();
    this.messagesSubject$.next([...currentMessages, {
      content: `Hi there, I'm Entry AI assistant. Ask me a question about entry documentation :)`,
      role: 'assistant'
    }]);
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.scrollToBottomEl) {
        this.scrollToBottomEl.nativeElement.scrollIntoView({ behavior: 'instant' });
      }
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 100);
  }
}