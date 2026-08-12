import { Component, inject, Input, OnDestroy, signal } from '@angular/core';
import { Observable, Subject, forkJoin, of } from 'rxjs';
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
  styleUrls: ['./example-viewer.component.scss'],
  standalone: false
})
export class ExampleViewerComponent implements OnDestroy {
  @Input() component: string;
  @Input() title = 'Example';
  @Input() showTs = true;
  @Input() showHtml = true;
  @Input() showScss = false;
  @Input() showDocs = false;
  @Input() extraFiles: string[] = [];

  readonly viewCode = signal(false);
  readonly typescriptFile = signal<string | null>(null);
  readonly htmlFile = signal<string | null>(null);
  readonly stylesFile = signal<string | null>(null);
  readonly docsFile = signal<string | null>(null);
  readonly extraFilesToDisplay = signal<IExtraFile[]>([]);

  private _destroy$ = new Subject<void>();
  private readonly _fileLoad: FileLoadService = inject(FileLoadService);

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  toggleCodeView(): void {
    if (this.viewCode()) {
      this.viewCode.set(false);
    } else {
      this.loadExampleDocuments();
    }
  }

  private loadExampleDocuments = () => {
    forkJoin({
      typescript: this.showTs ? this.loadFile(this.component, 'ts') : of(null),
      html: this.showHtml ? this.loadFile(this.component, 'html') : of(null),
      styles: this.showScss ? this.loadFile(this.component, 'scss') : of(null),
      docs: this.showDocs ? this.loadFile(this.component, 'md') : of(null)
    })
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(documents => {
        this.typescriptFile.set(documents.typescript);
        this.htmlFile.set(documents.html);
        this.stylesFile.set(documents.styles);
        this.docsFile.set(documents.docs);
        this.viewCode.set(true);
      });
    // Load extra files if any
    forkJoin(this.getExtraFiles(this.extraFiles))
      .pipe(takeUntil(this._destroy$))
      .subscribe((files: IExtraFile[]) => this.extraFilesToDisplay.set(files));
  };

  private getExtraFiles = (paths: string[]): Observable<IExtraFile>[] =>
    paths
      .map(path => {
        const pathWithoutExtension = path.substring(0, path.lastIndexOf('.'));
        const extension = path.substring(path.lastIndexOf('.') + 1) as FileExtension;
        const name = path.split('/').pop() ?? '';

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
