export interface SelectOption {
  value?: any;
  label: string;
  disabled?: boolean;
}

export interface SelectConfiguration {
  valueProperty?: string;
  labelProperty?: string;
  emptyOption?: SelectOption;
  sortProperty?: string;
  disable?: (option: SelectOption) => boolean;
}

const sortOptionsBy = (options: SelectOption[] | any[], sortProperty?: string, locale?: string): SelectOption[] | any[] =>
  sortProperty ?
    options.sort((a, b) =>
      (a[sortProperty]?.toString() ?? '').localeCompare(b[sortProperty]?.toString() ?? '', locale || 'en-US', { sensitivity: 'base' })) :
        options;

export const sortOptions =
  (options: SelectOption[] | any[], valueProperty?: string, sortProperty?: string, locale?: string): SelectOption[] | any[] => {
    const optionsCopy = [...options];
    return valueProperty ?
      sortOptionsBy(optionsCopy.filter(opt => opt[valueProperty] === null), sortProperty, locale)
        .concat(sortOptionsBy(optionsCopy.filter(opt => opt[valueProperty] !== null), sortProperty, locale)) :
      sortOptionsBy(optionsCopy, sortProperty, locale);
  };
