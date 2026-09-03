# Entry Search Filter

Entry component for providing standard filtering capabilities that can be consumed by entry-table component, but also any other list data representation component like Angular material table component. It supports the following filtering inputs:

* Text filter
* Select filter (a fixed list or a signal)
* Autocomplete filter
* Date filter
* DateTime filter

## Integration

Import component package:

```ts
import { EntrySearchFilterModule } from '@enigmatry/entry-components/search-filter';
```

## Basic usage

Declare the filters, then give the component an action that runs the search. The filters are
configuration only — they hold no form state, and the component never writes back onto them.

```ts
import {
  AutocompleteSearchFilter,
  DateTimeSearchFilter,
  SearchFilterParams,
  SearchFilterServerError,
  SelectOption,
  SelectSearchFilter,
  TextSearchFilter
} from '@enigmatry/entry-components/search-filter';

@Component({...})
export class ExampleComponent {
  /** An option list that arrives later is a signal, not an observable. */
  private readonly usernames = toSignal(
    this.usersService.getUsernames().pipe(map(names => names.map(name => new SelectOption(name, name)))),
    { initialValue: [] }
  );

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
      options: this.usernames
    }),
    new AutocompleteSearchFilter<Country>({
      key: 'country',
      label: 'Country',
      placeholder: 'Select country',
      search: (input, abortSignal) => this.countriesService.search(input, abortSignal)
    }),
    new DateTimeSearchFilter({
      key: 'createdAt',
      label: 'Created at',
      placeholder: 'Created at'
    })
  ];

  /** Return the server's messages to place them on their filters; return nothing on success. */
  readonly search = async(params: SearchFilterParams): Promise<readonly SearchFilterServerError[] | void> => {
    try {
      this.rows.set(await this.service.search(params));
      return undefined;
    } catch (problem) {
      return [{ key: 'createdAt', message: 'The date cannot be in the future.' }];
    }
  };
}
```

```html
<entry-search-filter [searchFilters]="filters" [searchAction]="search"></entry-search-filter>
```

Angular routes each returned message to its filter and clears it as soon as that filter is edited.
While a message stands its filter is invalid, so the next search is blocked until the user changes
that value.

`searchFilterChange` still fires on every accepted search, for a page that writes the filters into
the URL and fetches downstream of the navigation instead:

```html
<entry-search-filter [searchFilters]="filters" [searchAction]="search"
    (searchFilterChange)="onFilter($event)"></entry-search-filter>
```

## Validation

`required: true` on a filter, and `maxLength` on a text filter, are real rules. An invalid filter
blocks the search and focus moves to it. Messages come from the component's configuration rather
than per filter, since a filter set has no natural place to hang one.

## Clearing

The component renders a Clear button beside Apply. It empties every filter and forgets which were
touched. It clears rather than restoring declared values, so a filter that carries a default loses
it until the filters are handed over again.

## Setting a filter's value

There is no `setValue`. Hand over new filter instances carrying the values you want — the component
keeps what the user typed unless a filter's declared `value` changed:

```ts
this.filters = this.createFilters(this.route.snapshot.queryParams);
```

## Grouping select/autocomplete options

Both `SelectSearchFilter` and `AutocompleteSearchFilter` support grouping options under a header by passing an
optional `groupName` as the third `SelectOption` constructor argument. Options are rendered opt-in as-is (flat)
when `groupName` is omitted; when set, options sharing the same group name are rendered together under a `mat-optgroup`
header, in first-appearance order.

```ts
new SelectSearchFilter({
  key: 'occupation',
  label: 'Occupation',
  options: [
    new SelectOption(Occupation.electrician, 'Electrician', 'Skilled trades'),
    new SelectOption(Occupation.plumber, 'Plumber', 'Skilled trades'),
    new SelectOption(Occupation.doctor, 'Doctor', 'Professional')
  ]
})
```

## Configuration

- provide entry search filter config (optional):
  - `applyButtonText`: Apply button text
  - `clearButtonText`: Clear button text
  - `noneSelectedOptionText`: None option text in select dropdown
  - `requiredMessage`: message shown under a required filter left empty
  - `maxLengthMessage`: message shown when a filter's value is longer than its maximum

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
      clearButtonText: 'Reset',
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
