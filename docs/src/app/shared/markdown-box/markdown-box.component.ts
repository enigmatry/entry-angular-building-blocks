import { Component, OnInit } from '@angular/core';
import * as md from 'markdown-it';

@Component({
  selector: 'app-markdown-box',
  templateUrl: './markdown-box.component.html',
  styleUrls: ['./markdown-box.component.scss']
})
export class MarkdownBoxComponent implements OnInit {
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
