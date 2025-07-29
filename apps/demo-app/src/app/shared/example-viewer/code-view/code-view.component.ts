import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, SecurityContext } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';
import { FileExtension } from '../../models/file-extension.type';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CodeViewComponent implements OnInit {
  @Input() codeContent: string;
  @Input() codeType: FileExtension;

  highlightedCode: SafeHtml;
  private readonly _clipboard: Clipboard = inject(Clipboard);
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _domSanitizer: DomSanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.highlightCode();
  }

  copy = () => {
    this._snackBar.open(`Code copied to the clipboard!`);
    this._clipboard.copy(this.codeContent);
  };

  private highlightCode() {
    const highlightedCode = hljs.highlight(this.codeContent, { language: this.codeType });
    const sanitizedHtml = this._domSanitizer.sanitize(SecurityContext.HTML, highlightedCode.value);

    this.highlightedCode = this._domSanitizer.bypassSecurityTrustHtml(sanitizedHtml || '');
  }
}
