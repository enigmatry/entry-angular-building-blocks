import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { FileExtension } from '../../models/file-extension.type';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.scss']
})
export class CodeViewComponent {
  @Input() codeContent: string;
  @Input() codeType: FileExtension;

  constructor(
    private _clipboard: Clipboard,
    private _snackBar: MatSnackBar) {}

  copy = () => {
    this._snackBar.open(`Code copied to the clipboard!`);
    this._clipboard.copy(this.codeContent);
  };
}
