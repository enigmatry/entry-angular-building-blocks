import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/demo-app/src/environments/environment';
import { Observable } from 'rxjs';
import { FileExtension } from '../models/file-extension.type';

@Injectable({
    providedIn: 'root'
})
export class FileLoadService {
    constructor(private _httpClient: HttpClient) { }

    loadDocumentationFile = (path: string): Observable<string> => {
        const url = this.isAssetsUrl(path) ? path
            : `${environment.documentationUri}${path}?v=${this.getVersion()}`;
        return this._httpClient.get(url, { responseType: 'text' });
    };

    loadCodeFile = (path: string, type: FileExtension): Observable<string> =>
        this._httpClient.get(
            `assets/examples/${path}.${type}?v=${this.getVersion()}`,
            { responseType: 'text' }
        );

    private getVersion = (): number =>
        new Date().getMilliseconds() + new Date().getSeconds();

    private isAssetsUrl = (path: string): boolean =>
        path.startsWith('assets') ||
        path.startsWith('/assets');
}
