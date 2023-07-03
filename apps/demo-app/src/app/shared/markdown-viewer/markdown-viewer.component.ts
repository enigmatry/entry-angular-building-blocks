import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { FileLoadService } from '../services/file-load.service';
import * as md from 'markdown-it';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent implements OnInit {
  @Input() fileUrl: string | undefined;
  markdownContent: string | undefined;

  constructor(
    private _fileLoad: FileLoadService,
    private _domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.fileUrl) {
      this.loadFileContent();
    }
  }

  private loadFileContent() {
    this._fileLoad
      .loadDocumentationFile(this.fileUrl)
      .pipe(
        map(content => this.convertToHtml(content))
      ).subscribe({
        next: content => this.markdownContent = content,
        error: _ => this.markdownContent = `### No API documentation found :'(`
      });
  }

  private convertToHtml(markdown: string): string {
    const markdownIt = md('default');
    const html = markdownIt.render(markdown ?? '');
    return this._domSanitizer.sanitize(SecurityContext.HTML, html);
  }
}
