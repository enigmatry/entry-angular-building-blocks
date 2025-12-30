import { TemplateRef } from '@angular/core';

export interface CellTemplate {
  [key: string]: TemplateRef<unknown>;
}
