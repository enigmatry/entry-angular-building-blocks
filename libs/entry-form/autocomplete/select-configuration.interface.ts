import { SelectOption } from './select-option.model';

export const findOptionByValue = (options: SelectOption[], value: any): SelectOption | undefined =>
  options.find(option => option.value === value);

export const findOptionByLabel = (options: SelectOption[], label: string): SelectOption | undefined => {
  const lowerLabel = label.toLowerCase();
  return options.find(option => option.label.toLowerCase() === lowerLabel);
};

export interface SelectConfiguration {
  valueProperty?: string;
  labelProperty?: string;
  groupProperty?: string;
  emptyOption?: SelectOption;
  sortProperty?: string;
  disable?: (option: SelectOption) => boolean;
}

const sortOptionsBy = (options: SelectOption[] | any[], sortProperty?: string, locale?: string): SelectOption[] | any[] =>
  sortProperty ?
    options.sort((a, b) =>
      (a[sortProperty]?.toString() ?? '').localeCompare(b[sortProperty]?.toString() ?? '', locale || 'en-US', { sensitivity: 'base' })) :
        options;

// Groups options by their first appearance in `options` (matching Formly's own grouping order),
// then sorts each group's contents by sortProperty. Group order therefore follows the source data,
// not the group label.
const groupAndSortOptions =
  (options: SelectOption[] | any[], groupProperty: string, sortProperty?: string, locale?: string): SelectOption[] | any[] => {
    const groupOrder: string[] = [];
    const groups = new Map<string, SelectOption[] | any[]>();
    options.forEach(option => {
      const key = (option[groupProperty] ?? '').toString();
      const group = groups.get(key);
      if (group) {
        group.push(option);
      } else {
        groupOrder.push(key);
        groups.set(key, [option]);
      }
    });
    return groupOrder.flatMap(key => sortOptionsBy(groups.get(key) ?? [], sortProperty, locale));
  };

export const sortOptions =
  (options: SelectOption[] | any[], valueProperty?: string, sortProperty?: string, locale?: string,
   groupProperty?: string): SelectOption[] | any[] => {
    const optionsCopy = [...options];
    const emptyOptions = valueProperty ? optionsCopy.filter(opt => opt[valueProperty] === null) : [];
    const restOptions = valueProperty ? optionsCopy.filter(opt => opt[valueProperty] !== null) : optionsCopy;
    return sortOptionsBy(emptyOptions, sortProperty, locale)
      .concat(groupProperty ?
        groupAndSortOptions(restOptions, groupProperty, sortProperty, locale) :
        sortOptionsBy(restOptions, sortProperty, locale));
  };
