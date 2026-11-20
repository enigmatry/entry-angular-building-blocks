import { SelectOption } from './select-option.model';

export const findOptionByValue = <TOption extends SelectOption>(options: readonly TOption[], value: TOption['value']): TOption | undefined =>
  options.find(option => option.value === value);

export const findOptionByLabel = <TOption extends SelectOption>(options: readonly TOption[], label: string): TOption | undefined => {
  const lowerLabel = label.toLowerCase();
  return options.find(option => option.label.toLowerCase() === lowerLabel);
};

export interface SelectConfiguration<T = unknown, TKey extends string = string> {
  valueProperty?: TKey;
  labelProperty?: TKey;
  groupProperty?: TKey;
  emptyOption?: SelectOption<T>;
  sortProperty?: TKey;
  // As a property, a typed SelectConfiguration would no longer bind to generated inputs typed bare SelectConfiguration.
  disable?(option: SelectOption<T>): boolean;
}

const sortOptionsBy = <T extends object>(options: T[], sortProperty?: keyof T & string, locale?: string): T[] =>
  sortProperty ?
    options.sort((a, b) =>
      String(a[sortProperty] ?? '')
        .localeCompare(String(b[sortProperty] ?? ''), locale || 'en-US', { sensitivity: 'base' })) :
        options;

// Groups keep their first-appearance order, as Formly's own grouping does; only options within a group are sorted.
const groupAndSortOptions =
  <T extends object>(options: T[], groupProperty: keyof T & string, sortProperty?: keyof T & string, locale?: string): T[] => {
    const groupOrder: string[] = [];
    const groups = new Map<string, T[]>();
    options.forEach(option => {
      const key = String(option[groupProperty] ?? '');
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

/** A sorted copy: options whose `valueProperty` is `null` first, then by `sortProperty`, grouped by `groupProperty`. */
export const sortOptions =
  <T extends object>(options: readonly T[], valueProperty?: keyof T & string, sortProperty?: keyof T & string, locale?: string,
   groupProperty?: keyof T & string): T[] => {
    const optionsCopy = [...options];
    const emptyOptions = valueProperty ? optionsCopy.filter(opt => opt[valueProperty] === null) : [];
    const restOptions = valueProperty ? optionsCopy.filter(opt => opt[valueProperty] !== null) : optionsCopy;
    return sortOptionsBy(emptyOptions, sortProperty, locale)
      .concat(groupProperty ?
        groupAndSortOptions(restOptions, groupProperty, sortProperty, locale) :
        sortOptionsBy(restOptions, sortProperty, locale));
  };
