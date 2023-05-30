import { Component, Input, OnInit } from '@angular/core';
import { IComponentDefinition } from '../models/component-definitions';
import { FileLoadService } from '../services/file-load.service';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent implements OnInit {
  @Input() componentDefinition: IComponentDefinition;
  markdownContent: string | undefined = undefined;

  constructor(private _fileLoad: FileLoadService) {}

  ngOnInit(): void {
    if (this.componentDefinition.readmePath) {
      this._fileLoad
        .loadDocumentationFile(this.componentDefinition.readmePath)
        .subscribe({
          next: response => this.markdownContent = response,
          error: _ => this.markdownContent = `### No API documentation found :'(`
        });
    }
  }
}
