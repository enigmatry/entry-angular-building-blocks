import { Injectable } from '@angular/core';
import { Observable, Subscriber, from, lastValueFrom } from 'rxjs';
import { JSONDecoder } from './json-stream-decoder';

@Injectable({
    providedIn: 'root'
})
export class StreamService {
    constructor(
        private readonly jsonDecoder: JSONDecoder) { }

    post<T>(url: string, data: T): Observable<T[]> {
        return new Observable<T[]>(observer => {
            const controller = new AbortController();

            const request = this.constructRequest<T>(data, url, controller);
            const response = from(fetch(request))

            lastValueFrom(response)
                .then(async response => {
                    await this.readChunk<T>(response, observer);
                })
                .catch(err => observer.error(err));

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

    private constructRequest<T>(data: T, url: string, controller: AbortController) {
        const options = this.getOptions<T>(data);

        const request = new Request(url, { ...options, signal: controller.signal });
        return request;
    }

    private getOptions<T>(data: T) {
        return {
            method: 'POST',
            credentials: 'include' as RequestCredentials,
            observe: 'response',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        };
    }
}
