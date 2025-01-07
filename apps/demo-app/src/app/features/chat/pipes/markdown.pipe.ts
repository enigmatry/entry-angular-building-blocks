import { inject, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  private _domSanitizer = inject(DomSanitizer);

  transform(value: string | undefined): SafeHtml {
    if (!value) {
      return '';
    }
    return this.convertMarkdownToHtml(value);
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

    return this._domSanitizer.bypassSecurityTrustHtml(sanitizedHtml);
  }

  private highlightCode(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(str, { language: lang, }).value;
    }
    return str;
  }
}