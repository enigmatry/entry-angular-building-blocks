import { Component, Input, OnInit } from '@angular/core';
import { IComponentDefinition } from '../models/component-definitions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'docs/src/environments/environment';
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

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    if (this.componentDefinition.documentationPath) {
      this._httpClient.get(
        `${environment.documentationUri}${this.componentDefinition.documentationPath}`,
        { responseType: 'text' }
      )
      .subscribe(response => this.markdownContent = this._markdown.render(response));
    }
  }
}
