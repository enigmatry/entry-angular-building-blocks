# Entry Search Filter

Entry component for providing standard filtering capabilities that can be consumed by entry-table component, but also any other list data representation component like Angular material table component. It supports the following filtering inputs:

* Text filter
* Select filter (supports fixed and dynamic (Observable) options)
* Autocomplete filter
* Date filter
* DateTime filter

## Integration

Import component package:

```ts
import { EntrySearchFilterModule } from '@enigmatry/entry-components/search-filter';
```

## Basic usage

Provide filters

```ts
import {
  AutocompleteSearchFilter,
  SelectOption,
  SelectSearchFilter,
  TextSearchFilter,
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

Optional configuration used to override defaults.

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
    })
  ]
})
export class SharedModule { }
```
