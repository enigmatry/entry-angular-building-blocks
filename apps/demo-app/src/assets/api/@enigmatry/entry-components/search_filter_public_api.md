# Module: search-filter/public-api

## Classes

### AutocompleteSearchFilter

Search filter autocomplete field configuration. Options for the autocomplete are provided
indirectly via the search function that takes a string and returns an observable array of
SelectOption`<T>` 

#### Extends

- [`SearchFilterBase`](search_filter_public_api.md#searchfilterbase)\< [`SelectOption`](search_filter_public_api.md#selectoption)\< `T` \> \>

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `debounceTime` | `number` | Delay in typing before triggering the search function in milliseconds(default is 300) |
| `formControl` | `FormControl`\< [`SelectOption`](search_filter_public_api.md#selectoption)\< `T` \> \> | A reference to the form control it represents |
| `key` | `string` | Unique search-filter input key |
| `label` | `string` | Label text to be displayed for the search-filter input control |
| `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |
| `minimumCharacters` | `number` | Minimum number of characters that must enter to trigger the search function(default is 3) |
| `placeholder` | `string` | Placeholder text for search-filter input control |
| `search` | (`input`) => `Observable`\< [`SelectOption`](search_filter_public_api.md#selectoption)\< `T` \>[] \> | Callback function for autocomplete options |
| `type` | `string` | Type of input control e.g. 'text' or 'email' |
| `value` | [`SelectOption`](search_filter_public_api.md#selectoption)\< `T` \> | Default value to be displayed/selected in the input control |

***

### DateSearchFilter

Search filter date input filed configuration.

#### Extends

- [`SearchFilterBase`](search_filter_public_api.md#searchfilterbase)\< `D` \>

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `formControl` | `FormControl`\< `D` \> | A reference to the form control it represents |
| `key` | `string` | Unique search-filter input key |
| `label` | `string` | Label text to be displayed for the search-filter input control |
| `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |
| `placeholder` | `string` | Placeholder text for search-filter input control |
| `type` | `string` | Type of input control e.g. 'text' or 'email' |
| `value` | `D` | Default value to be displayed/selected in the input control |

***

### DateTimeSearchFilter

Search filter date time input filed configuration.

#### Extends

- [`SearchFilterBase`](search_filter_public_api.md#searchfilterbase)\< `D` \>

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `formControl` | `FormControl`\< `D` \> | A reference to the form control it represents |
| `key` | `string` | Unique search-filter input key |
| `label` | `string` | Label text to be displayed for the search-filter input control |
| `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |
| `placeholder` | `string` | Placeholder text for search-filter input control |
| `type` | `string` | Type of input control e.g. 'text' or 'email' |
| `value` | `D` | Default value to be displayed/selected in the input control |

***

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

Used to provide entry search filter configuration on module level.

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
- [`DateTimeSearchFilter`](search_filter_public_api.md#datetimesearchfilter)
- [`DateSearchFilter`](search_filter_public_api.md#datesearchfilter)
- [`AutocompleteSearchFilter`](search_filter_public_api.md#autocompletesearchfilter)
- [`DateSearchFilter`](search_filter_public_api.md#datesearchfilter)
- [`DateTimeSearchFilter`](search_filter_public_api.md#datetimesearchfilter)
- [`SelectSearchFilter`](search_filter_public_api.md#selectsearchfilter)
- [`TextSearchFilter`](search_filter_public_api.md#textsearchfilter)

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `controlType` | `ControlType` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' |
| `formControl` | `FormControl`\< `T` \> | A reference to the form control it represents |
| `key` | `string` | Unique search-filter input key |
| `label` | `string` | Label text to be displayed for the search-filter input control |
| `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |
| `placeholder` | `string` | Placeholder text for search-filter input control |
| `type` | `string` | Type of input control e.g. 'text' or 'email' |
| `value` | `T` | Default value to be displayed/selected in the input control |

***

### SelectOption

Model used to populate select or autocomplete options.

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
| `options` | [`SelectOption`](search_filter_public_api.md#selectoption)\< `T` \>[] | Fixed list of select filter options (default is empty list) |
| `options$` | `Observable`\< [`SelectOption`](search_filter_public_api.md#selectoption)\< `T` \>[] \> | Observable (dynamic) list of select filter options |
| `placeholder` | `string` | Placeholder text for search-filter input control |
| `type` | `string` | Type of input control e.g. 'text' or 'email' |
| `value` | `T` | Default value to be displayed/selected in the input control |

***

### TextSearchFilter

Search filter text input filed configuration.

#### Extends

- [`SearchFilterBase`](search_filter_public_api.md#searchfilterbase)\< `string` \>

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `formControl` | `FormControl`\< `string` \> | A reference to the form control it represents |
| `key` | `string` | Unique search-filter input key |
| `label` | `string` | Label text to be displayed for the search-filter input control |
| `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |
| `placeholder` | `string` | Placeholder text for search-filter input control |
| `type` | `string` | Type of input control e.g. 'text' or 'email' |
| `value` | `string` | Default value to be displayed/selected in the input control |

## Type Aliases

### SearchFilterParams

> **SearchFilterParams**: `object`

SearchFilterParams are the same type as @angular/router type Params,
containing a collection of query URL parameters for easy integration.

#### Index signature

 \[`key`: `string`\]: `any`

## Functions

### provideEntrySearchFilterConfig

> **provideEntrySearchFilterConfig**(`config`): `Provider`

Can be used to provide entry search filter configuration.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `config` | `Partial`\< [`EntrySearchFilterConfig`](search_filter_public_api.md#entrysearchfilterconfig) \> |

#### Returns

`Provider`
