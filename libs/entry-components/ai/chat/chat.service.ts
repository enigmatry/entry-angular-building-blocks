import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { ChatMessage } from './chat.model';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    readonly push = (messages: Signal<ChatMessage[]>, url: Signal<string>) => httpResource<string>(() => {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (messages().at(-1)?.isRequest) {
            return {
                url: url(),
                method: 'POST',
                body: messages(),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }

        return undefined;
    });
}
