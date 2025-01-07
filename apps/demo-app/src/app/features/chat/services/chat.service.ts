import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';

export const endpoints = {
    chat: `https://localhost:7206/chat`,
};

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private httpClient: HttpClient) { }

    getData(messageHistory: Message[]): Observable<Message[]> {
        return this.httpClient.post<Message>(endpoints.chat, messageHistory)
            .pipe(map((response: Message) => [response]));

        // return this.streamService.post(endpoints.getStreamData, new GetMessageRequest({ messages: messageHistory }));
    }
}