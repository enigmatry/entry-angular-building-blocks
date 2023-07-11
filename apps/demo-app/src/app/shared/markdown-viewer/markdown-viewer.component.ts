import { Component, ElementRef, Input, NgZone, OnInit, Renderer2, SecurityContext } from '@angular/core';
import { FileLoadService } from '../services/file-load.service';
import * as MarkdownIt from 'markdown-it';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent implements OnInit {
  @Input() fileUrl: string | undefined;
  markdownContent: SafeHtml | undefined = '';

  constructor(
    private _fileLoad: FileLoadService,
    private _domSanitizer: DomSanitizer,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _ngZone: NgZone) { }

  ngOnInit(): void {
    if (this.fileUrl) {
      this.loadFileContent();
    }
    this.handleAnchorClicks();
  }

  private loadFileContent() {
    this._fileLoad
      .loadDocumentationFile(this.fileUrl)
      .pipe(
        map(response => this.convertMarkdownToHtml(response))
      ).subscribe({
        next: response => this.markdownContent = response,
        error: _ => this.markdownContent = `### No API documentation found :'(`
      });
  }

  private convertMarkdownToHtml(markdown: string): SafeHtml {
    const converter = MarkdownIt('default', {
      html: true,
      breaks: true,
      typographer: true,
      highlight: this.highlightCode
    });

    const html = converter.render(markdown ?? '');
    const sanitizedHtml = this._domSanitizer.sanitize(SecurityContext.HTML, html);
    const htmlWithHeadingIds = this.addIdsToHeadings(sanitizedHtml);

    return this._domSanitizer.bypassSecurityTrustHtml(htmlWithHeadingIds);
  }

  private handleAnchorClicks() {
    this._ngZone.runOutsideAngular(() => {
      this._renderer.listen(this._elementRef.nativeElement, 'click', (event: MouseEvent) => {
        const anchor: HTMLAnchorElement = (event.target as HTMLElement).closest('a[href]');

        if (anchor && this.isHeadingLink(anchor)) {
          event.preventDefault();
          const url = new URL(anchor.href);
          const hash = decodeURI(url.hash);
          this.scrollToAnchor(this._elementRef.nativeElement, hash);
        }
      }
      );
    });
  }

  private scrollToAnchor(scope: HTMLElement, anchor: string): boolean {
    if (scope && anchor) {
      const headingId = this.getHeadingId(anchor);
      const headingToJumpTo = scope.querySelector(`[id="${headingId}"]`);

      if (headingToJumpTo) {
        headingToJumpTo.scrollIntoView({ behavior: 'auto' });
        return true;
      }
    }
    return false;
  }

  private isHeadingLink(anchor: HTMLAnchorElement): boolean {
    const href = anchor.getAttribute('href');
    return href && href.includes('#');
  }

  private getHeadingId(str: string): string {
    if (str) {
      return str
        .replace(/(_|-|\s)+/g, '')
        .replace(/[&+$,/:;=?@"#{}|^¨~[\]`\\*)(%.!'<>]/g, '')
        .toLowerCase();
    }
    return '';
  }

  private addIdsToHeadings(html: string): string {
    if (html) {
      const document = new DOMParser().parseFromString(html, 'text/html');
      document
        .querySelectorAll('h1, h2, h3, h4, h5, h6')
        .forEach((heading: Element) => {
          const id = this.getHeadingId(heading.textContent);
          heading.setAttribute('id', id);
        });
      return document.querySelector('body').innerHTML;
    }
    return html;
  }

  private highlightCode(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(str, { language: lang, }).value;
    }
    return str;
  }
}
