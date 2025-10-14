import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, linkedSignal, model, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ChatMessage } from './chat.model';
import { ChatService } from './chat.service';

@Component({
    selector: 'entry-chat-bot',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatDialogModule, MatIconModule, FormsModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class EntryChatComponent {
    readonly scrollContainer = viewChild<ElementRef>('scrollContainer');
    readonly messages = linkedSignal<ChatMessage[]>(() => []);
    readonly messageEndpoint = input.required<string>();
    readonly welcomeMessage = input<string>();
    readonly placeholder = input<string>();
    readonly privacyNote = input<string>();
    readonly newMessage = model<string>('');
    readonly headerClass = input<string>('');
    isCollapsed = true;
    readonly events = input<{ onSuccess?: () => void; onError?: (error: Error) => void; onDone?: () => void }>();
    private readonly router = inject(Router);
    private readonly chat = inject(ChatService).push(this.messages, this.messageEndpoint());

    constructor() {
        effect(() => {
            if (this.chat.hasValue()) {
                this.messages().push(new ChatMessage(this.chat.value(), false));
                this.events()?.onSuccess?.();
            } else if (this.chat.error()) {
                this.events()?.onError?.(this.chat.error() as Error);
            }
            this.events()?.onDone?.();
            this.scrollContainer()?.nativeElement.scrollIntoView({ block: 'start' });
        });
    }

    readonly openChat = (): void => {
        this.isCollapsed = false;
    };

    readonly closeChat = (): void => {
        this.isCollapsed = true;
    };

    readonly sendMessage = () => {
        this.messages().push(new ChatMessage(this.newMessage(), true));
        this.newMessage.set('');
    };

    readonly followLink = async($event: Event) => {
        const event = $event as MouseEvent;

        // If we don't have an anchor tag, or links to a new tab we don't need to do anything.
        if (!(event.target instanceof HTMLAnchorElement) || event.target.target === '_blank') {
            return;
        }
        // Prevent page from reloading
        event.preventDefault();
        // Navigate to the path in the link
        await this.router.navigate([event.target.pathname]);
    };
}
