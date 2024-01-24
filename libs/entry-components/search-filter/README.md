# Entry Search Filter

Entry component for providing standard filtering capabilities that can be consumed by entry-table component, but also any other list data representation component like Angular material table component. It supports the following filtering inputs:

* Text filter
* Select filter (fixed or dynamic options)
* Autocomplete filter
* Date filter
* DateTime filter

## Integration

Import component package:

```ts
import { EntrySearchFilterModule } from '@enigmatry/entry-components/search-filter';
```

## Basic usage

Provide filters in component and use `<entry-search-filter>` to display them in view

```ts
import {
  AutocompleteSearchFilter,
  SelectOption,
  SelectSearchFilter,
  TextSearchFilter,
  DateTimeSearchFilter
} from '@enigmatry/entry-components/search-filter';

@Component({...})
export class ExampleComponent {

filters = [
      new TextSearchFilter({
        key: 'name',
        label: 'Name',
        placeholder: 'Name',
        maxLength: 25
      }),
      new SelectSearchFilter({
        key: 'username',
        label: 'Username',
        placeholder: 'Select username',
        multiSelect: false,
        options$: this._usersService
          .getUsernames()
          .pipe(map(usernames => usernames.map(un => new SelectOption(un, un))))
      }),
      new AutocompleteSearchFilter({
        key: 'country',
        label: 'Country',
        placeholder: 'Select country',
        minimumCharacters: 0,
        search: (input: string) => of(Object.values(Country)
          .filter(value => value.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
          .map((country => new SelectOption(country, country))))
      }),
      new DateTimeSearchFilter({
        key: 'createdAt',
        label: 'Created at',
        placeholder: 'Created at'
      })
];
}
```

```html
<entry-search-filter
    [searchFilters]="filters"
    (searchFilterChange)="searchFilterChange($event)">
</entry-search-filter>
```

## Configuration

- provide entry search filter config (optional):
  - `applyButtonText`: Apply button text
  - `noneSelectedOptionText`: None option text in select dropdown

- provide `ENTRY_MAT_DATE_TIME` for `DateTimeSearchFilter` (required when this filter is used):
  - matDateFormats of type `MatDateFormats`
  - `compareDate` function

```ts
import { EntrySearchFilterModule, provideEntrySearchFilterConfig } from '@enigmatry/entry-components/search-filter';
// ...

@NgModule({
  imports: [
    EntrySearchFilterModule
  ],
  providers: [
    provideEntrySearchFilterConfig({
      applyButtonText: 'Filter',
      noneSelectedOptionText: '-'
    }),
    // provide date adapter used by mat-datepicker
    // usually provided in shared or material module
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    // provide matDateFormats along with compareDate function
    {
      provide: ENTRY_MAT_DATE_TIME,
      useValue: {
        matDateFormats: {
          parse: {
            // formats used for parsing:
            dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm'],
          },
          display: {
            // display value in input always as 'dd-MM-yyyy HH:mm'
            dateInput: 'dd-MM-yyyy HH:mm',
            // standard mat-datepicker calendar options
            monthYearLabel: 'LLL uuuu',
            dateA11yLabel: 'PP',
            monthYearA11yLabel: 'LLLL uuuu',
          },
        },
        compareDate(first: Date, second: Date): number {
          return first.getTime() - second.getTime();
        }
      }
    }
  ]
})
export class SharedModule { }
```
