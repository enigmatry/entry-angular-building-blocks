# Module: search-filter/public-api

## Classes

### EntrySearchFilterComponent

Entry SearchFilter component.

#### Implements

- `OnInit`

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `searchFilterChange` | `EventEmitter`\< [`SearchFilterParams`](search_filter_public_api.md#searchfilterparams) \> | Emits the change in SearchFilterParams so the containing component can apply them and retrieve the filtered results. |
| `searchFilters` | [`SearchFilterBase`](search_filter_public_api.md#searchfilterbase)\< `any` \>[] | Configuration of the search filters inputs that will be displayed in the search-filter component. |

***

### EntrySearchFilterConfig

Used to provide default configurations on module level.

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `applyButtonText` | `string` | Apply search filters button label (default 'Apply') |
| `noneSelectedOptionText` | `string` | Label for 'none selected' select filter option |

***

### SearchFilterBase

Base Entry search filter input component.

#### Extended By

- [`TextSearchFilter`](search_filter_public_api.md#textsearchfilter)
- [`SelectSearchFilter`](search_filter_public_api.md#selectsearchfilter)
- [`AutocompleteSearchFilter`](search_filter_public_api.md#autocompletesearchfilter)

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `controlType` | `string` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' |
| `formControl` | `FormControl`\< `T` \> | A reference to the form control it represents |
| `key` | `string` | Unique search-filter input key |
| `label` | `string` | Label text to be displayed for the search-filter input control |
| `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |
| `placeholder` | `string` | Placeholder text for search-filter input control |
| `type` | `string` | Type of input control e.g. 'email' |
| `value` | `T` | Default value to be displayed/selected in the input control |

***

### SelectFilterOption

Model used to populate select filter options.

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `key` | `T` | Key used as a value for selected option |
| `label` | `string` | String value used as display label of select option |

***

### SelectSearchFilter

Search filter select input field configuration. Select options can be provided as fixed list (`options`)
or observable (dynamic) list (`options$`).

#### Extends

- [`SearchFilterBase`](search_filter_public_api.md#searchfilterbase)\< `T` \>

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `formControl` | `FormControl`\< `T` \> | A reference to the form control it represents |
| `key` | `string` | Unique search-filter input key |
| `label` | `string` | Label text to be displayed for the search-filter input control |
| `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |
| `multiSelect` | `boolean` | Enables selection of multiple options (default is true).<br />If it is set to false, 'none selected' option becomes available as a first option. |
| `options` | [`SelectFilterOption`](search_filter_public_api.md#selectfilteroption)\< `T` \>[] | Fixed list of select filter options (default is empty list) |
| `options$` | `Observable`\< [`SelectFilterOption`](search_filter_public_api.md#selectfilteroption)\< `T` \>[] \> | Observable (dynamic) list of select filter options |
| `placeholder` | `string` | Placeholder text for search-filter input control |
| `type` | `string` | Type of input control e.g. 'email' |
| `value` | `T` | Default value to be displayed/selected in the input control |

***

### TextSearchFilter

Search filter text input field configuration.

#### Extends

- [`SearchFilterBase`](search_filter_public_api.md#searchfilterbase)\< `T` \>

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `formControl` | `FormControl`\< `T` \> | A reference to the form control it represents |
| `key` | `string` | Unique search-filter input key |
| `label` | `string` | Label text to be displayed for the search-filter input control |
| `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |
| `placeholder` | `string` | Placeholder text for search-filter input control |
| `type` | `string` | Type of input control e.g. 'email' |
| `value` | `T` | Default value to be displayed/selected in the input control |

### AutocompleteSearchFilter

Search filter autocomplete field configuration

#### Extends

- [`SearchFilterBase`](search_filter_public_api.md#searchfilterbase)\< `T` \>

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `formControl` | `FormControl`\< `string` \> | A reference to the form control it represents |
| `key` | `string` | Unique search-filter input key |
| `label` | `string` | Label text to be displayed for the search-filter input control |
| `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |
| `placeholder` | `string` | Placeholder text for search-filter input control |
| `type` | `string` | Type of input control e.g. 'email' |
| `value` | `string` | Default value to be displayed/selected in the input control |
| `searchFunction` | `(input: string) => Observable<SelectOption<T>[]>` | Callback function used to fill the autocomplete options |
| `minimumCharacters` | `string` | Number of characters entered required to trigger the searchFunction(defaults to 3) |
| `toggleTime` | `number` | Number of milliseconds between calls to the searchFunction(defaults to 500ms) |

## Type Aliases

### SearchFilterParams

> **SearchFilterParams**: `object`

SearchFilterParams are the same type as @angular/router type Params,
containing a collection of query URL parameters for easy integration.

#### Index signature

 \[`key`: `string`\]: `any`
