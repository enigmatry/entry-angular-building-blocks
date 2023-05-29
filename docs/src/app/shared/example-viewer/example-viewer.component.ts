import { Component, Input, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscriber, forkJoin } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { ICodeFileDefinition } from './code-file-definition.interface';
import { FileExtension } from '../models/file-extension.type';
import { FileLoadService } from '../services/file-load.service';

interface IExampleDocuments {
  typescript: string;
  html: string;
  styles: string;
  additionalTabs: string[];
}

interface IExtraFile {
  content: string;
  definition: ICodeFileDefinition;
}

@Component({
  selector: 'app-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss']
})
export class ExampleViewerComponent implements OnDestroy {
  @Input() path: string;
  @Input() title = 'Example';
  @Input() extraFileDefinitions: ICodeFileDefinition[] = [];

  viewCode = false;
  typescriptFile!: string;
  htmlFile!: string;
  stylesFile!: string;
  extraFiles: IExtraFile[] = [];

  private _destroy$ = new Subject<void>();

  constructor(private _fileLoad: FileLoadService) { }

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
      typescript: this.loadFile(this.path, 'ts'),
      html: this.loadFile(this.path, 'html'),
      styles: this.loadFile(this.path, 'scss')
    })
      .pipe(
        catchError((error: Response) => this.handleError(error)),
        takeUntil(this._destroy$)
      )
      .subscribe((documents: IExampleDocuments) => {
        this.typescriptFile = documents.typescript;
        this.htmlFile = documents.html;
        this.stylesFile = documents.styles;
        this.viewCode = true;
      });
    // Load extra files if any
    forkJoin(this.mapFileCalls(this.extraFileDefinitions))
      .pipe(
        catchError((error: Response) => this.handleError(error)),
        takeUntil(this._destroy$)
      )
      .subscribe((files: IExtraFile[]) => this.extraFiles = files);
  };

  private handleError = (error: Response) =>
    new Observable<any>((subscriber: Subscriber<any>) => {
      try {
        subscriber.error(error);
      } catch (err) {
        subscriber.error(error);
      }
    });

  private mapFileCalls = (definitions: ICodeFileDefinition[]): Observable<IExtraFile>[] =>
    definitions
      .map(fileDefinition =>
        this.loadFile(fileDefinition.path, fileDefinition.type)
          .pipe(map(fileContent => ({
            content: fileContent,
            definition: fileDefinition
          } as IExtraFile)))
      );

  private loadFile = (path: string, type: FileExtension): Observable<string> =>
    this._fileLoad.loadCodeFile(path, type);
}
