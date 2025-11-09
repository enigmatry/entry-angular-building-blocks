/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule, formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject,
    input, linkedSignal, LOCALE_ID, model, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ChatMessage } from './chat.model';
import { ChatService } from './chat.service';

@Component({
    selector: 'entry-chat-bot',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule,
        FormsModule, ReactiveFormsModule],
    templateUrl: './chat.component.html'
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
    readonly loading = signal(false);
    isCollapsed = true;
    readonly events = input<{ onSuccess?: () => void; onError?: (error: Error) => void; onDone?: () => void }>();
    private readonly locale = inject(LOCALE_ID);
    private readonly router = inject(Router);
    private readonly chat = inject(ChatService).push(this.messages, this.messageEndpoint);
    protected readonly newMessageControl = new FormControl('');
    protected readonly form = new FormGroup({
        newMessage: this.newMessageControl
    });

    constructor() {
        effect(() => {
            if (this.chat.hasValue()) {
                this.loading.set(true);
                this.messages().push(new ChatMessage(this.chat.value(), false, formatDate(new Date(), 'medium', this.locale)!));
                this.events()?.onSuccess?.();
            } else if (this.chat.error()) {
                this.events()?.onError?.(this.chat.error() as Error);
            }
            this.events()?.onDone?.();
            this.loading.set(false);
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
        this.messages().push(new ChatMessage(this.newMessage(), true, formatDate(new Date(), 'medium', this.locale)!));
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
