import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getAssistant, getUser } from '../model/author-role-extensions';
import { Message } from '../model/message';
import { AuthorRole } from '../model/author-role';
import { Source } from '../model/source';
import { BehaviorSubject, distinctUntilChanged, finalize, map, tap } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'entry-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  @ViewChild('endOfChat') scrollToBottomEl: ElementRef;

  private messagesSubject$ = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject$.asObservable();
  public userRole = getUser();
  public loading: boolean = false;

  constructor(
    private readonly chatsClient: ChatService
  ) { }

  ngOnInit(): void {
    this.addGreetingMessage();
  }

  public send(question: Message) {
    const currentMessages = this.messagesSubject$.getValue();
    this.messagesSubject$.next([...currentMessages, new Message({ content: question.content, role: question.role })]);

    this.chatsClient.getStreamData(this.messagesSubject$.getValue())
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
    const currentMessages = this.messagesSubject$.getValue();
    this.messagesSubject$.next([...currentMessages, new Message({
      // content: $localize`:@@chat.greeting-message:Hi there, I'm Enigmatry AI Chat Bot. Ask me a question about the PDF file you have uploaded! :)`,
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