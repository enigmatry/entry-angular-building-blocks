import { Component, Input, OnInit } from '@angular/core';
import { IComponentDefinition } from '../models/component-definitions';
import { FileLoadService } from '../services/file-load.service';
import * as md from 'markdown-it';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent implements OnInit {
  @Input() componentDefinition: IComponentDefinition;
  markdownContent: string | undefined;
  outHtml: string;

  private _markdown = md('default');

  constructor(private _fileLoad: FileLoadService) {}

  ngOnInit(): void {
    if (this.componentDefinition.documentationPath) {
      this._fileLoad
        .loadDocumentationFile(this.componentDefinition.documentationPath)
        .subscribe(response => this.markdownContent = this._markdown.render(response));
    }
  }
}
