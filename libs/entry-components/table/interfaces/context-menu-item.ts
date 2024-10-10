export interface ContextMenuItem {
  id: string;
  name: string;
  icon?: string;
  disabled?: boolean;
  items?: ContextMenuItem[];
}
