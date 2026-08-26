import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { FileExtension } from '../models/file-extension.type';

@Injectable({
    providedIn: 'root'
})
export class FileLoadService {
    private readonly httpClient: HttpClient = inject(HttpClient);

    documentationFileUrl = (path: string | undefined): string | undefined => {
        if (!path) {
            return undefined;
        }
        return this.isAssetsUrl(path) ? path
            : `${environment.documentationUri}${path}?v=${this.getVersion()}`;
    };

    loadCodeFile = (path: string, type: FileExtension): Observable<string> =>
        this.httpClient.get(
            `assets/examples/${path}.${type}?v=${this.getVersion()}`,
            { responseType: 'text' }
        );

    private getVersion = (): number =>
        new Date().getMilliseconds() + new Date().getSeconds();

    private isAssetsUrl = (path: string): boolean =>
        path.startsWith('assets') ||
        path.startsWith('/assets');
}
