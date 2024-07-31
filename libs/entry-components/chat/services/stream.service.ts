import { Injectable } from '@angular/core';
import { JSONDecoder } from './json-decoder.service';
import { Observable, Subscriber } from 'rxjs';
import { EntryChatService } from './chat.service';

@Injectable({
    providedIn: 'root'
})
export class StreamService {
    constructor(
        private readonly entryChatService: EntryChatService,
        private readonly jsonDecoder: JSONDecoder) { }

    post<T>(data: unknown): Observable<T[]> {
        return new Observable<T[]>(observer => {
            const controller = new AbortController();

            this.entryChatService.getAccessToken().subscribe(token => {
                const request = this.constructRequest(data, this.entryChatService.getURL(), token, controller);

                fetch(request)
                    .then(response => {
                        this.readChunk<T>(response, observer)
                    })
                    .catch(error => observer.error(error));
            })

            return () => controller.abort();
        });
    }

    private async readChunk<T>(response: Response, observer: Subscriber<T[]>) {
        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Failed to read response');
        }

        const processChunk = async (): Promise<void> => {
            const { done, value } = await reader.read();
            if (done) {
                observer.complete();
                reader.releaseLock();
                return;
            }
            if (value) {
                this.jsonDecoder.decodeChunk<T[]>(value, item => observer.next(item), () => value);
            }
            await processChunk();
        };

        await processChunk();
    }

    private constructRequest(data: unknown, url: string, accessToken: string, controller: AbortController) {
        const options = {
            method: 'POST',
            credentials: 'include' as RequestCredentials,
            observe: 'response',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        };

        const request = new Request(url, { ...options, signal: controller.signal });

        return request;
    }
}
