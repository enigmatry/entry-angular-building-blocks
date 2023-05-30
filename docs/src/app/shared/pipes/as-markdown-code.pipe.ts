import { Pipe, PipeTransform } from '@angular/core';
import { FileExtension } from '../models/file-extension.type';

@Pipe({
  name: 'asMarkdownCode'
})
export class AsMarkdownCodePipe implements PipeTransform {

  transform = (value: string | null | undefined, extension: FileExtension | undefined): string =>
    value ? `\`\`\`${extension ?? ''}\n${value}\n\`\`\`` : '';
}
