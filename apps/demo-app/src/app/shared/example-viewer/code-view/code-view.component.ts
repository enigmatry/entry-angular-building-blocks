import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, computed, inject, input, SecurityContext } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';
import { FileExtension } from '../../models/file-extension.type';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrl: './code-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CodeViewComponent {
  readonly codeContent = input.required<string>();
  readonly codeType = input.required<FileExtension>();

  private readonly clipboard: Clipboard = inject(Clipboard);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);

  // Purely derived from the inputs, so ngOnInit is no longer needed to prime it. The try/catch
  // matters here: a computed memoises a thrown error and re-throws it on every read, so an unknown
  // language would take down the whole template instead of this one code block.
  readonly highlightedCode = computed(() => {
    const code = this.codeContent();
    let highlighted: string;
    try {
      highlighted = hljs.highlight(code, { language: this.codeType() }).value;
    } catch(error) {
      // eslint-disable-next-line no-console
      console.error(`app-code-view: could not highlight '${this.codeType()}'`, error);
      highlighted = code;
    }
    const sanitizedHtml = this.domSanitizer.sanitize(SecurityContext.HTML, highlighted);

    return this.domSanitizer.bypassSecurityTrustHtml(sanitizedHtml ?? '');
  });

  copy = () => {
    this.snackBar.open(`Code copied to the clipboard!`);
    this.clipboard.copy(this.codeContent());
  };
}
