import { httpResource } from '@angular/common/http';
import { afterNextRender, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, NgZone,
  Renderer2, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import { FileLoadService } from '../services/file-load.service';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrl: './markdown-viewer.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownViewerComponent {
  readonly fileUrl = input<string | undefined>(undefined);
  readonly markdownContent = input<string | undefined>(undefined);

  private readonly fileLoad: FileLoadService = inject(FileLoadService);
  private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);
  private readonly elementRef: ElementRef = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly ngZone: NgZone = inject(NgZone);

  /** An undefined url means no request, which is what keeps this idle for the `[markdownContent]` usage. */
  private readonly loadedFile = httpResource.text(() => this.fileLoad.documentationFileUrl(this.fileUrl()));

  /** Inline content wins over a loaded file, and a failed load falls back to a notice. */
  protected readonly markdownContentHtml = computed<SafeHtml>(() => {
    const inlineContent = this.markdownContent();
    if (inlineContent) {
      return this.convertMarkdownToHtml(inlineContent);
    }
    if (this.loadedFile.error()) {
      return this.convertMarkdownToHtml(`### No API documentation found :'(`);
    }
    return this.convertMarkdownToHtml(this.loadedFile.value() ?? '');
  });

  constructor() {
    afterNextRender(() => this.handleAnchorClicks());
  }

  private readonly convertMarkdownToHtml = (markdown: string): SafeHtml => {
    const converter = MarkdownIt('default', {
      html: true,
      breaks: true,
      typographer: true,
      highlight: this.highlightCode
    });

    const html = converter.render(markdown);
    const sanitizedHtml = this.domSanitizer.sanitize(SecurityContext.HTML, html);
    const htmlWithHeadingIds = this.addIdsToHeadings(sanitizedHtml);

    return this.domSanitizer.bypassSecurityTrustHtml(htmlWithHeadingIds);
  };

  private readonly handleAnchorClicks = (): void => {
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
  };

  private readonly scrollToAnchor = (scope: HTMLElement, anchor: string): boolean => {
    if (anchor) {
      const headingId = this.getHeadingId(anchor);
      const headingToJumpTo = scope.querySelector(`[id="${headingId}"]`);

      if (headingToJumpTo) {
        headingToJumpTo.scrollIntoView({ behavior: 'auto' });
        return true;
      }
    }
    return false;
  };

  private readonly isHeadingLink = (anchor: HTMLAnchorElement): boolean => {
    const href = anchor.getAttribute('href');
    return !!href && href.includes('#');
  };

  private readonly getHeadingId = (str: string | null): string => {
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

  private readonly highlightCode = (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(str, { language: lang }).value;
    }
    return str;
  };
}
