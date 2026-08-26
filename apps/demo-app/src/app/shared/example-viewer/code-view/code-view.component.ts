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

  // A computed memoises a thrown error and re-throws it forever, so an unknown language degrades instead of throwing.
  protected readonly highlightedCode = computed(() => {
    const code = this.codeContent();
    const highlighted = this.tryHighlight(code, this.codeType());
    const sanitizedHtml = this.domSanitizer.sanitize(SecurityContext.HTML, highlighted);

    return this.domSanitizer.bypassSecurityTrustHtml(sanitizedHtml ?? '');
  });

  private readonly tryHighlight = (code: string, language: FileExtension): string => {
    try {
      return hljs.highlight(code, { language }).value;
    } catch {
      return code;
    }
  };

  protected readonly copy = (): void => {
    this.snackBar.open(`Code copied to the clipboard!`);
    this.clipboard.copy(this.codeContent());
  };
}
