import { TemplateRef } from '@angular/core';
import { ColumnSortProp } from './column-sort-prop';
import { ColumnType } from './column-type';
import { ColumnTypeParameter } from './column-type-parameter';

export interface ColumnDefinition {
  field: string;
  header?: string;
  hide?: boolean;
  pinned?: 'left' | 'right';
  width?: string;
  sortable?: boolean | string;
  sortProp?: ColumnSortProp;
  type?: ColumnType;
  typeParameter?: ColumnTypeParameter;
  cellTemplate?: TemplateRef<unknown> | null;
  class?: string;
  customProperties?: { [key: string]: unknown };
}
