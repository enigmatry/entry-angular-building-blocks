export interface SelectOption<T = unknown> {
  value?: T;
  label: string;
  disabled?: boolean;
  groupName?: string;
}
