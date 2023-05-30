import { ContextMenuItem } from './context-menu-item';


export interface RowContextMenuFormatter {
  items: (rowData: any) => ContextMenuItem[];
}
