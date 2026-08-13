import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, input, NgZone, OnInit,
  Renderer2, SecurityContext, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import { map } from 'rxjs';
import { FileLoadService } from '../services/file-load.service';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrl: './markdown-viewer.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownViewerComponent implements OnInit {
  readonly fileUrl = input<string | undefined>(undefined);
  readonly markdownContent = input<string | undefined>(undefined);

  readonly markdownContentHtml = signal<SafeHtml>('');

  private readonly fileLoad: FileLoadService = inject(FileLoadService);
  private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);
  private readonly elementRef: ElementRef = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const fileUrl = this.fileUrl();
    if (fileUrl) {
      this.loadFileContent(fileUrl);
    }
    const markdownContent = this.markdownContent();
    if (markdownContent) {
      this.markdownContentHtml.set(this.convertMarkdownToHtml(markdownContent));
    }
    this.handleAnchorClicks();
  }

  private loadFileContent(fileUrl: string) {
    this.fileLoad
      .loadDocumentationFile(fileUrl)
      .pipe(
        map(response => this.convertMarkdownToHtml(response)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: response => this.markdownContentHtml.set(response),
        error: _ => this.markdownContentHtml.set(`### No API documentation found :'(`)
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
    const sanitizedHtml = this.domSanitizer.sanitize(SecurityContext.HTML, html);
    const htmlWithHeadingIds = this.addIdsToHeadings(sanitizedHtml);

    return this.domSanitizer.bypassSecurityTrustHtml(htmlWithHeadingIds);
  }

  private handleAnchorClicks() {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.listen(this.elementRef.nativeElement, 'click', (event: MouseEvent) => {
        const anchor: HTMLAnchorElement | null = (event.target as HTMLElement).closest('a[href]');

        if (anchor && this.isHeadingLink(anchor)) {
          event.preventDefault();
          const url = new URL(anchor.href);
          const hash = decodeURI(url.hash);
          this.scrollToAnchor(this.elementRef.nativeElement, hash);
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

  isHeadingLink = (anchor: HTMLAnchorElement): boolean => {
    const href = anchor.getAttribute('href');
    return !!href && href.includes('#');
  };

  getHeadingId = (str: string | null): string => {
    if (str) {
      return str
        .replace(/(_|-|\s)+/gu, '')
        .replace(/[&+$,/:;=?@"#{}|^¨~[\]`\\*)(%.!'<>]/gu, '')
        .toLowerCase();
    }
    return '';
  };

  private readonly addIdsToHeadings = (html: string | null): string => {
    if (html) {
      const document = new DOMParser().parseFromString(html, 'text/html');
      document
        .querySelectorAll('h1, h2, h3, h4, h5, h6')
        .forEach((heading: Element) => {
          const id = this.getHeadingId(heading.textContent);
          heading.setAttribute('id', id);
        });
      return document.querySelector('body')?.innerHTML ?? '';
    }
    return html ?? '';
  };

  highlightCode = (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(str, { language: lang }).value;
    }
    return str;
  };
}
