import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { getAssistant, getUser } from '../model/author-role-extensions';
import { Message } from '../model/message';
import { AuthorRole } from '../model/author-role';
import { Source } from '../model/source';
import { BehaviorSubject, distinctUntilChanged, finalize, map, tap } from 'rxjs';
import { StreamService } from '../services/stream.service';
import { MessageRequest } from '../model/message-request';

@Component({
  selector: 'entry-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  @Input() greetingMessage: string;

  @ViewChild('endOfChat') scrollToBottomEl: ElementRef;

  private messagesSubject$ = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject$.asObservable();
  public userRole = getUser();
  public loading: boolean = false;

  constructor(
    private readonly streamService: StreamService
  ) { }

  ngOnInit(): void {
    this.addGreetingMessage();
  }

  public send(question: Message) {
    const currentMessages = this.messagesSubject$.getValue();
    this.messagesSubject$.next([...currentMessages, new Message({ content: question.content, role: question.role })]);

    this.streamService.post<Message>(new MessageRequest({ messages: this.messagesSubject$.getValue() }))
      .pipe(
        distinctUntilChanged(),
        tap(() => this.loading = true),
        map(items => items.filter(item => item.content !== undefined && item.content !== null && item.content !== '')),
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
      combined.role = new AuthorRole(message.role);
      combined.sources = message.sources?.map(x => new Source({ page: x.page }));
      return combined;
    }, new Message({ content: '', role: getAssistant(), sources: [] }));

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
    return currentMessages.length && currentMessages[currentMessages.length - 1]?.role?.label === getAssistant()?.label;
  }

  private addGreetingMessage() {
    if (this.greetingMessage === undefined) {
      return;
    }

    const currentMessages = this.messagesSubject$.getValue();
    this.messagesSubject$.next([...currentMessages, new Message({
      content: this.greetingMessage,
      role: getAssistant()
    })]);
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