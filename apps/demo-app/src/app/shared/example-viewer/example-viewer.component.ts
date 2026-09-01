import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, forkJoin, of, catchError, map } from 'rxjs';
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
  styleUrl: './example-viewer.component.scss',
  standalone: false
})
export class ExampleViewerComponent {
  readonly component = input.required<string>();
  readonly title = input('Example');
  readonly showTs = input(true);
  readonly showHtml = input(true);
  readonly showScss = input(false);
  readonly showDocs = input(false);
  readonly extraFiles = input<string[]>([]);

  readonly viewCode = signal(false);
  readonly typescriptFile = signal<string | null>(null);
  readonly htmlFile = signal<string | null>(null);
  readonly stylesFile = signal<string | null>(null);
  readonly docsFile = signal<string | null>(null);
  readonly extraFilesToDisplay = signal<IExtraFile[]>([]);

  private readonly fileLoad: FileLoadService = inject(FileLoadService);
  private readonly destroyRef = inject(DestroyRef);

  readonly toggleCodeView = (): void => {
    if (this.viewCode()) {
      this.viewCode.set(false);
    } else {
      this.loadExampleDocuments();
    }
  };

  private loadExampleDocuments = () => {
    const component = this.component();
    forkJoin({
      typescript: this.showTs() ? this.loadFile(component, 'ts') : of(null),
      html: this.showHtml() ? this.loadFile(component, 'html') : of(null),
      styles: this.showScss() ? this.loadFile(component, 'scss') : of(null),
      docs: this.showDocs() ? this.loadFile(component, 'md') : of(null)
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(documents => {
        this.typescriptFile.set(documents.typescript);
        this.htmlFile.set(documents.html);
        this.stylesFile.set(documents.styles);
        this.docsFile.set(documents.docs);
        this.viewCode.set(true);
      });
    // Load extra files if any
    forkJoin(this.getExtraFiles(this.extraFiles()))
      .pipe(takeUntilDestroyed(this.destroyRef))
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
    this.fileLoad.loadCodeFile(path, type)
      .pipe(catchError(_ => of('')));
}
