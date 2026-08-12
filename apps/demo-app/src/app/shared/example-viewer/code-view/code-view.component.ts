import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, SecurityContext } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';
import { FileExtension } from '../../models/file-extension.type';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrl: './code-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CodeViewComponent implements OnInit {
  @Input() codeContent: string;
  @Input() codeType: FileExtension;

  highlightedCode: SafeHtml;
  private readonly clipboard: Clipboard = inject(Clipboard);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.highlightCode();
  }

  copy = () => {
    this.snackBar.open(`Code copied to the clipboard!`);
    this.clipboard.copy(this.codeContent);
  };

  private highlightCode() {
    const highlightedCode = hljs.highlight(this.codeContent, { language: this.codeType });
    const sanitizedHtml = this.domSanitizer.sanitize(SecurityContext.HTML, highlightedCode.value);

    this.highlightedCode = this.domSanitizer.bypassSecurityTrustHtml(sanitizedHtml || '');
  }
}
