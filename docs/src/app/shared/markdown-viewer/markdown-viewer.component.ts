import { Component, Input, OnInit } from '@angular/core';
import { IComponentDefinition } from '../models/component-definitions';
import * as md from 'markdown-it';
import { HttpClient } from '@angular/common/http';
import { environment } from 'docs/src/environments/environment';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent implements OnInit {
  @Input() componentDefinition: IComponentDefinition;
  markdownContent: string | undefined;
  outHtml: string;

  private _markdown = md();

  constructor(private _httpClient: HttpClient) {
    // const data = `---
    //     title: My First Blog
    //     date: "2021-02-01 9:00:00 +0900"
    //     type: news
    //     draft: false
    //     ---

    //     # Blog 

    //     I love Angular !!   

    //     _fffff_
    // `;

    // // var content = fm(data);

    // this.outHtml = this._markdown.render(data);
  }

  ngOnInit(): void {
    if (this.componentDefinition.documentationPath) {
      this._httpClient.get(
        `https://github.com/enigmatry/entry-angular-building-blocks/blob/master/README.md`,
        // `${environment.documentationUri}${this.componentDefinition.documentationPath}`,
        { responseType: 'text' }
      )
      .subscribe(response => this.markdownContent = this._markdown.render(response));
    }
  }
}
