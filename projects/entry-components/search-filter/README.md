# Entry Search Filter

Entry component for providing standard filtering capabilities that can be consumed by entry-table component, but also any other list data represetation component like Angular material table component.

## Imports

```ts
import { EntrySearchFilterModule } from '@enigmatry/entry-components/search-filter';
```

## Basic usage

`entry-search-filter` is used to provide simple configuration and usage of data filtering:

```html
<entry-search-filter
    [searchFilters]="query.filters"
    (searchFilterChange)="searchFilterChange($event)">
</entry-search-filter>
```

## Configuration

`ENTRY_SEARCH_FILTER_CONFIG`: `InjectionToken<EntrySearchFilterConfig>` - Optional configuration used to override defaults.

```ts
import {
  EntrySearchFilterModule,
  ENTRY_SEARCH_FILTER_CONFIG,
  EntrySearchFilterConfig
} from '@enigmatry/entry-components/search-filter';
// ...

@NgModule({
  imports: [
    EntrySearchFilterModule
  ],
  providers: [
    {
      provide: ENTRY_SEARCH_FILTER_CONFIG,
      useFactory: () => new EntrySearchFilterConfig({
        applyButtonText: 'Filter'
      })
    }
  ]
})
export class AppModule { }
```
