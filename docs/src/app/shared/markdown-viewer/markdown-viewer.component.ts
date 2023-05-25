import { Component, Input, OnInit } from '@angular/core';
import { IComponentDefinition } from '../models/component-definitions';
import * as md from 'markdown-it';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent implements OnInit {
  @Input() componentDefinition: IComponentDefinition;
  outHtml: string;

  constructor() {
    const markdown = md();

    const data = `---
        title: My First Blog
        date: "2021-02-01 9:00:00 +0900"
        type: news
        draft: false
        ---

        # Blog 
        I love Angular !!   
    `;

    // var content = fm(data);

    this.outHtml = markdown.render(data);
  }

  ngOnInit(): void {
  }

}
