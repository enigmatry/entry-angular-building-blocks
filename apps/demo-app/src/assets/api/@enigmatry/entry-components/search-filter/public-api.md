# search-filter/public-api

## Classes

### AutocompleteSearchFilter\<T\>

Search filter autocomplete field configuration. Options for the autocomplete are provided
indirectly via the search function that takes a string and returns an observable array of
SelectOption<T>

#### Extends

- [`SearchFilterBase`](public-api.md#searchfilterbaset)\<[`SelectOption`](public-api.md#selectoptiont)\<`T`\>\>

#### Type Parameters

• **T**

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| `controlType` | `ControlType` | `ControlType.autocomplete` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](public-api.md#searchfilterbaset).`controlType` | - |  |
| `debounceTime` | `number` | `undefined` | Delay in typing before triggering the search function in milliseconds(default is 300) | - | - |  |
| `formControl` | `FormControl`\<[`SelectOption`](public-api.md#selectoptiont)\<`T`\>\> | `undefined` | A reference to the form control it represents | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`formControl` |  |
| `key` | `string` | `undefined` | Unique search-filter input key | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`key` |  |
| `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`label` |  |
| `maxLength` | `number` | `undefined` | Max text length to be entered in the input component (default is 256) | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`maxLength` |  |
| `minimumCharacters` | `number` | `undefined` | Minimum number of characters that must enter to trigger the search function(default is 3) | - | - |  |
| `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`placeholder` |  |
| `search` | (`input`: `string`) => `Observable`\<[`SelectOption`](public-api.md#selectoptiont)\<`T`\>[]\> | `undefined` | Callback function for autocomplete options | - | - |  |
| `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`type` |  |
| `value` | [`SelectOption`](public-api.md#selectoptiont)\<`T`\> | `undefined` | Default value to be displayed/selected in the input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`value` |  |

***

### DateSearchFilter\<D\>

Search filter date input filed configuration.

#### Extends

- [`SearchFilterBase`](public-api.md#searchfilterbaset)\<`D`\>

#### Type Parameters

• **D**

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| `controlType` | `ControlType` | `ControlType.date` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](public-api.md#searchfilterbaset).`controlType` | - |  |
| `formControl` | `FormControl`\<`D`\> | `undefined` | A reference to the form control it represents | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`formControl` |  |
| `key` | `string` | `undefined` | Unique search-filter input key | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`key` |  |
| `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`label` |  |
| `maxLength` | `number` | `undefined` | Max text length to be entered in the input component (default is 256) | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`maxLength` |  |
| `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`placeholder` |  |
| `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`type` |  |
| `value` | `D` | `undefined` | Default value to be displayed/selected in the input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`value` |  |

***

### DateTimeSearchFilter\<D\>

Search filter date time input filed configuration.

#### Extends

- [`SearchFilterBase`](public-api.md#searchfilterbaset)\<`D`\>

#### Type Parameters

• **D**

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| `controlType` | `ControlType` | `ControlType.dateTime` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](public-api.md#searchfilterbaset).`controlType` | - |  |
| `formControl` | `FormControl`\<`D`\> | `undefined` | A reference to the form control it represents | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`formControl` |  |
| `key` | `string` | `undefined` | Unique search-filter input key | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`key` |  |
| `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`label` |  |
| `maxLength` | `number` | `undefined` | Max text length to be entered in the input component (default is 256) | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`maxLength` |  |
| `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`placeholder` |  |
| `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`type` |  |
| `value` | `D` | `undefined` | Default value to be displayed/selected in the input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`value` |  |

***

### EntrySearchFilterComponent

Entry SearchFilter component.

#### Implements

- `OnInit`

#### Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `searchFilterChange` | `EventEmitter`\<[`SearchFilterParams`](public-api.md#searchfilterparams)\> | `undefined` | Emits the change in SearchFilterParams so the containing component can apply them and retrieve the filtered results. |  |
| `searchFilters` | [`SearchFilterBase`](public-api.md#searchfilterbaset)\<`any`\>[] | `[]` | Configuration of the search filters inputs that will be displayed in the search-filter component. |  |

#### Methods

##### ngOnInit()

> **ngOnInit**(): `void`

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

###### Returns

`void`

###### Implementation of

`OnInit.ngOnInit`

***

### EntrySearchFilterConfig

Used to provide entry search filter configuration on module level.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `applyButtonText` | `string` | Apply search filters button label (default 'Apply') |  |
| `noneSelectedOptionText` | `string` | Label for 'none selected' select filter option |  |

***

### SearchFilterBase\<T\>

Base Entry search filter input component.

#### Extended by

- [`TextSearchFilter`](public-api.md#textsearchfilter)
- [`SelectSearchFilter`](public-api.md#selectsearchfiltert)
- [`AutocompleteSearchFilter`](public-api.md#autocompletesearchfiltert)
- [`DateTimeSearchFilter`](public-api.md#datetimesearchfilterd)
- [`DateSearchFilter`](public-api.md#datesearchfilterd)

#### Type Parameters

• **T**

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `controlType` | `ControlType` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' |  |
| `formControl` | `FormControl`\<`T`\> | A reference to the form control it represents |  |
| `key` | `string` | Unique search-filter input key |  |
| `label` | `string` | Label text to be displayed for the search-filter input control |  |
| `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |  |
| `placeholder` | `string` | Placeholder text for search-filter input control |  |
| `type` | `string` | Type of input control e.g. 'text' or 'email' |  |
| `value` | `T` | Default value to be displayed/selected in the input control |  |

***

### SelectOption\<T\>

Model used to populate select or autocomplete options.

#### Type Parameters

• **T**

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `key` | `public` | `T` | Key used as a value for selected option |  |
| `label` | `public` | `string` | String value used as display label of select option |  |

***

### SelectSearchFilter\<T\>

Search filter select input field configuration. Select options can be provided as fixed list (`options`)
or observable (dynamic) list (`options$`).

#### Extends

- [`SearchFilterBase`](public-api.md#searchfilterbaset)\<`T`\>

#### Type Parameters

• **T**

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| `controlType` | `ControlType` | `ControlType.select` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](public-api.md#searchfilterbaset).`controlType` | - |  |
| `formControl` | `FormControl`\<`T`\> | `undefined` | A reference to the form control it represents | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`formControl` |  |
| `key` | `string` | `undefined` | Unique search-filter input key | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`key` |  |
| `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`label` |  |
| `maxLength` | `number` | `undefined` | Max text length to be entered in the input component (default is 256) | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`maxLength` |  |
| `multiSelect` | `boolean` | `true` | Enables selection of multiple options (default is true). If it is set to false, 'none selected' option becomes available as a first option. | - | - |  |
| `options` | [`SelectOption`](public-api.md#selectoptiont)\<`T`\>[] | `[]` | Fixed list of select filter options (default is empty list) | - | - |  |
| `options$` | `Observable`\<[`SelectOption`](public-api.md#selectoptiont)\<`T`\>[]\> | `undefined` | Observable (dynamic) list of select filter options | - | - |  |
| `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`placeholder` |  |
| `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`type` |  |
| `value` | `T` | `undefined` | Default value to be displayed/selected in the input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`value` |  |

***

### TextSearchFilter

Search filter text input filed configuration.

#### Extends

- [`SearchFilterBase`](public-api.md#searchfilterbaset)\<`string`\>

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| `controlType` | `ControlType` | `ControlType.text` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](public-api.md#searchfilterbaset).`controlType` | - |  |
| `formControl` | `FormControl`\<`string`\> | `undefined` | A reference to the form control it represents | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`formControl` |  |
| `key` | `string` | `undefined` | Unique search-filter input key | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`key` |  |
| `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`label` |  |
| `maxLength` | `number` | `undefined` | Max text length to be entered in the input component (default is 256) | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`maxLength` |  |
| `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`placeholder` |  |
| `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`type` |  |
| `value` | `string` | `undefined` | Default value to be displayed/selected in the input control | - | [`SearchFilterBase`](public-api.md#searchfilterbaset).`value` |  |

## Type Aliases

### SearchFilterParams

> **SearchFilterParams**: `object`

SearchFilterParams are the same type as @angular/router type Params,
containing a collection of query URL parameters for easy integration.

#### Index Signature

 \[`key`: `string`\]: `any`

## Functions

### provideEntrySearchFilterConfig()

> **provideEntrySearchFilterConfig**(`config`): `Provider`

Can be used to provide entry search filter configuration.

#### Parameters

• **config**: `Partial`\<[`EntrySearchFilterConfig`](public-api.md#entrysearchfilterconfig)\>

#### Returns

`Provider`
