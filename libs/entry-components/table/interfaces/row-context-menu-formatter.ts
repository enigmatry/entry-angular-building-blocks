import { ContextMenuItem } from './context-menu-item';

export interface RowContextMenuFormatter<T = unknown> {
  items: (rowData: T) => ContextMenuItem[];
}
