import { Pipe, PipeTransform } from '@angular/core';
import * as md from 'markdown-it';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  private _markdown = md('default'); // commonmark, default, zero

  transform = (value: string): string => this._markdown.render(value);
}
