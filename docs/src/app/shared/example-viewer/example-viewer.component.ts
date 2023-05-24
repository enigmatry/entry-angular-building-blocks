import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscriber, forkJoin } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

interface IExampleDocuments {
  typescript: string;
  html: string;
  styles: string;
}

@Component({
  selector: 'app-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss']
})
export class ExampleViewerComponent implements OnDestroy {
  @Input() path: string;
  @Input() title = 'Example';

  viewCode = false;
  typescriptFile!: string;
  htmlFile!: string;
  stylesFile!: string;

  private _destroy$ = new Subject<void>();

  constructor(private _http: HttpClient) { }

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

  private loadExampleDocuments = () =>
    forkJoin({
      typescript: this.loadCode('ts'),
      html: this.loadCode('html'),
      styles: this.loadCode('scss')
    })
    .pipe(
      catchError((error: Response) => new Observable<any>((subscriber: Subscriber<any>) => {
        try {
          subscriber.error(error);
        } catch (err) {
          subscriber.error(error);
        }
      })),
      takeUntil(this._destroy$)
    )
    .subscribe((demo: IExampleDocuments) => {
      this.typescriptFile = demo.typescript;
      this.htmlFile = demo.html;
      this.stylesFile = demo.styles;
      this.viewCode = true;
    });

  private loadCode = (type: 'scss' | 'ts' | 'html'): Observable<string> =>
    this._http.get(`assets/examples/${this.path}.${type}`, { responseType: 'text' });
}
