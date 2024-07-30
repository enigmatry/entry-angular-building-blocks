import { Injectable } from '@angular/core';
import { StreamService } from './stream.service';
import { Message } from '../model/message';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private readonly streamService: StreamService) { }

    getStreamData(messageHistory: Message[]): Observable<Message[]> {
        // return this.streamService.post(endpoints.getStreamData, new GetMessageRequest({ messages: messageHistory }));
        return of() ;
    }
}