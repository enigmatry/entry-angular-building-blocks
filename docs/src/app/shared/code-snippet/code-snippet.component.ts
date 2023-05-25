import { Component, ContentChild, Input, ViewChild } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent {
  @Input() hideCopy = false;

  @ViewChild('codeContent', { static: false }) codeContent;

  constructor(
    private _clipboard: Clipboard,
    private _snackBar: MatSnackBar) {}

  copy = () => {
    this._snackBar.open(`Link copied to clipboard!`);
    this._clipboard.copy(this.codeContent.nativeElement.innerHTML);
  };
}