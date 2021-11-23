export interface SelectOption {
  value?: any;
  label: string;
  disabled?: boolean;
}

export interface SelectConfiguration {
  valueProperty?: string;
  labelProperty?: string;
  emptyOption?: SelectOption;
  disable?: (option: SelectOption) => boolean;
}
