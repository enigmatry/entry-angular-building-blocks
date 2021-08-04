import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IMediaSrcProvider {
    getSrc(src: string, type: string): Observable<string>;
}

@Injectable()
export class MediaSrcProvider implements IMediaSrcProvider {

    public getSrc(src: string, type: string): Observable<string> {
        return of(src);
    }
}
