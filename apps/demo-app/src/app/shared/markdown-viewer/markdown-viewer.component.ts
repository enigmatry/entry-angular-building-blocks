import { Component, Input, OnInit } from '@angular/core';
import { FileLoadService } from '../services/file-load.service';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent implements OnInit {
  @Input() filePath: string | undefined;
  markdownContent: string | undefined;

  constructor(private _fileLoad: FileLoadService) {}

  ngOnInit(): void {
    if (this.filePath) {
      this._fileLoad
        .loadDocumentationFile(this.filePath)
        .subscribe({
          next: response => this.markdownContent = response,
          error: _ => this.markdownContent = `### No API documentation found :'(`
        });
    }
  }
}
