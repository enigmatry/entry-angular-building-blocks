import { FileExtension } from '../models/file-extension.type';

export interface ICodeFileDefinition {
  name: string;
  path: string;
  type: FileExtension;
}
