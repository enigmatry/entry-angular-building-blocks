import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JSONDecoder {
    private decoder = new TextDecoder('utf-8');

    public decodeChunk<T>(
        value: Uint8Array,
        decodedItemCallback: (item: T) => void,
        errorCallback: (error: unknown) => void
    ): void {
        const chunk = this.decoder.decode(value, { stream: true });
        const decodedChunk = this.fixJsonIssues(chunk);

        try {
            const parsedObject: T = JSON.parse(decodedChunk);
            decodedItemCallback(parsedObject);
        } catch (error) {
            errorCallback(chunk);
        }
    }

    private fixJsonIssues(originalChunk: string): string {
        let chunk = originalChunk;

        if (chunk.startsWith(',')) {
            chunk = chunk.substring(1);
        }
        if (!chunk.endsWith(']')) {
            chunk = chunk.concat(']');
        }
        if (!chunk.startsWith('[')) {
            chunk = `[${chunk}`;
        }
        return chunk;
    }
}
