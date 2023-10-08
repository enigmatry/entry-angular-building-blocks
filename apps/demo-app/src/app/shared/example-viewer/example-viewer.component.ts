import { Component, Input, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscriber, forkJoin, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { FileExtension } from '../models/file-extension.type';
import { FileLoadService } from '../services/file-load.service';

interface IExtraFile {
  name: string;
  path: string;
  type: FileExtension;
  content: string;
}

@Component({
  selector: 'app-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss']
})
export class ExampleViewerComponent implements OnDestroy {
  @Input() path: string;
  @Input() title = 'Example';
  @Input() showTs = true;
  @Input() showHtml = true;
  @Input() showScss = false;
  @Input() showDocs = false;
  @Input() extraFiles: string[] = [];

  viewCode = false;
  typescriptFile: string;
  htmlFile: string;
  stylesFile: string;
  docsFile: string;
  extraFilesToDisplay: IExtraFile[] = [];

  private _destroy$ = new Subject<void>();

  constructor(
    private _fileLoad: FileLoadService) { }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  toggleCodeView(): void {
    if (this.viewCode) {
      this.viewCode = false;
    } else {
      this.loadExampleDocuments();
    }
  }

  private loadExampleDocuments = () => {
    forkJoin({
      typescript: this.showTs ? this.loadFile(this.path, 'ts') : of(null),
      html: this.showHtml ? this.loadFile(this.path, 'html') : of(null),
      styles: this.showScss ? this.loadFile(this.path, 'scss') : of(null),
      docs: this.showDocs ? this.loadFile(this.path, 'md') : of(null)
    })
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(documents => {
        this.typescriptFile = documents.typescript;
        this.htmlFile = documents.html;
        this.stylesFile = documents.styles;
        this.docsFile = documents.docs;
        this.viewCode = true;
      });
    // Load extra files if any
    forkJoin(this.getExtraFiles(this.extraFiles))
      .pipe(takeUntil(this._destroy$))
      .subscribe((files: IExtraFile[]) => this.extraFilesToDisplay = files);
  };

  private getExtraFiles = (paths: string[]): Observable<IExtraFile>[] =>
    paths
      .map(path => {
        const pathWithoutExtension = path.substring(0, path.lastIndexOf('.'));
        const extension = path.substring(path.lastIndexOf('.') + 1) as FileExtension;
        const name = path.split('/').pop();

        return this.loadFile(pathWithoutExtension, extension)
          .pipe(map(fileContent => ({
            name,
            path,
            type: extension,
            content: fileContent
          })));
      });

  private loadFile = (path: string, type: FileExtension): Observable<string> =>
    this._fileLoad.loadCodeFile(path, type)
      .pipe(catchError(_ => of('')));
}
