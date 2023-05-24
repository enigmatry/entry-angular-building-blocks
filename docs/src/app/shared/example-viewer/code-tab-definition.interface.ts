import { FileExtension } from '../models/file-extension.type';

export interface ICodeTabDefinition {
  name: string;
  path: string;
  type: FileExtension;
}
