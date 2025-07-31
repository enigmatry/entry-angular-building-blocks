# search-filter/public-api

## Classes

### AutocompleteSearchFilter\<T\>

Search filter autocomplete field configuration. Options for the autocomplete are provided
indirectly via the search function that takes a string and returns an observable array of
SelectOption<T>

#### Extends

- [`SearchFilterBase`](#searchfilterbase)\<[`SelectOption`](#selectoption)\<`T`\>\>

#### Type Parameters

##### T

`T`

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="controltype"></a> `controlType` | `ControlType` | `ControlType.autocomplete` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](#searchfilterbase).[`controlType`](#controltype-3) | - |  |
| <a id="debouncetime"></a> `debounceTime` | `number` | `undefined` | Delay in typing before triggering the search function in milliseconds(default is 300) | - | - |  |
| <a id="formcontrol"></a> `formControl` | `FormControl`\<`undefined` \| [`SelectOption`](#selectoption)\<`T`\>\> | `undefined` | A reference to the form control it represents | - | [`SearchFilterBase`](#searchfilterbase).[`formControl`](#formcontrol-3) |  |
| <a id="key"></a> `key` | `string` | `undefined` | Unique search-filter input key | - | [`SearchFilterBase`](#searchfilterbase).[`key`](#key-3) |  |
| <a id="label"></a> `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`label`](#label-3) |  |
| <a id="maxlength"></a> `maxLength` | `number` | `undefined` | Max text length to be entered in the input component (default is 256) | - | [`SearchFilterBase`](#searchfilterbase).[`maxLength`](#maxlength-3) |  |
| <a id="minimumcharacters"></a> `minimumCharacters` | `number` | `undefined` | Minimum number of characters that must enter to trigger the search function(default is 3) | - | - |  |
| <a id="placeholder"></a> `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`placeholder`](#placeholder-3) |  |
| <a id="search"></a> `search` | (`input`) => `Observable`\<[`SelectOption`](#selectoption)\<`T`\>[]\> | `undefined` | Callback function for autocomplete options | - | - |  |
| <a id="type"></a> `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](#searchfilterbase).[`type`](#type-3) |  |
| <a id="value"></a> `value` | `undefined` \| [`SelectOption`](#selectoption)\<`T`\> | `undefined` | Default value to be displayed/selected in the input control | - | [`SearchFilterBase`](#searchfilterbase).[`value`](#value-3) |  |

***

### DateSearchFilter\<D\>

Search filter date input filed configuration.

#### Extends

- [`SearchFilterBase`](#searchfilterbase)\<`D`\>

#### Type Parameters

##### D

`D`

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="controltype-1"></a> `controlType` | `ControlType` | `ControlType.date` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](#searchfilterbase).[`controlType`](#controltype-3) | - |  |
| <a id="formcontrol-1"></a> `formControl` | `FormControl`\<`undefined` \| `D`\> | `undefined` | A reference to the form control it represents | - | [`SearchFilterBase`](#searchfilterbase).[`formControl`](#formcontrol-3) |  |
| <a id="key-1"></a> `key` | `string` | `undefined` | Unique search-filter input key | - | [`SearchFilterBase`](#searchfilterbase).[`key`](#key-3) |  |
| <a id="label-1"></a> `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`label`](#label-3) |  |
| <a id="maxlength-1"></a> `maxLength` | `number` | `undefined` | Max text length to be entered in the input component (default is 256) | - | [`SearchFilterBase`](#searchfilterbase).[`maxLength`](#maxlength-3) |  |
| <a id="placeholder-1"></a> `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`placeholder`](#placeholder-3) |  |
| <a id="type-1"></a> `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](#searchfilterbase).[`type`](#type-3) |  |
| <a id="value-1"></a> `value` | `undefined` \| `D` | `undefined` | Default value to be displayed/selected in the input control | - | [`SearchFilterBase`](#searchfilterbase).[`value`](#value-3) |  |

***

### DateTimeSearchFilter\<D\>

Search filter date time input filed configuration.

#### Extends

- [`SearchFilterBase`](#searchfilterbase)\<`D`\>

#### Type Parameters

##### D

`D`

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="controltype-2"></a> `controlType` | `ControlType` | `ControlType.dateTime` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](#searchfilterbase).[`controlType`](#controltype-3) | - |  |
| <a id="formcontrol-2"></a> `formControl` | `FormControl`\<`undefined` \| `D`\> | `undefined` | A reference to the form control it represents | - | [`SearchFilterBase`](#searchfilterbase).[`formControl`](#formcontrol-3) |  |
| <a id="key-2"></a> `key` | `string` | `undefined` | Unique search-filter input key | - | [`SearchFilterBase`](#searchfilterbase).[`key`](#key-3) |  |
| <a id="label-2"></a> `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`label`](#label-3) |  |
| <a id="maxlength-2"></a> `maxLength` | `number` | `undefined` | Max text length to be entered in the input component (default is 256) | - | [`SearchFilterBase`](#searchfilterbase).[`maxLength`](#maxlength-3) |  |
| <a id="placeholder-2"></a> `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`placeholder`](#placeholder-3) |  |
| <a id="type-2"></a> `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](#searchfilterbase).[`type`](#type-3) |  |
| <a id="value-2"></a> `value` | `undefined` \| `D` | `undefined` | Default value to be displayed/selected in the input control | - | [`SearchFilterBase`](#searchfilterbase).[`value`](#value-3) |  |

***

### EntrySearchFilterComponent

Entry SearchFilter component.

#### Implements

- `OnInit`

#### Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="searchfilterchange"></a> `searchFilterChange` | `EventEmitter`\<[`SearchFilterParams`](#searchfilterparams)\> | `undefined` | Emits the change in SearchFilterParams so the containing component can apply them and retrieve the filtered results. |  |
| <a id="searchfilters"></a> `searchFilters` | [`SearchFilterBase`](#searchfilterbase)\<`any`\>[] | `[]` | Configuration of the search filters inputs that will be displayed in the search-filter component. |  |

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
| <a id="applybuttontext"></a> `applyButtonText` | `string` | Apply search filters button label (default 'Apply') |  |
| <a id="noneselectedoptiontext"></a> `noneSelectedOptionText` | `string` | Label for 'none selected' select filter option |  |

***

### SearchFilterBase\<T\>

Base Entry search filter input component.

#### Extended by

- [`TextSearchFilter`](#textsearchfilter)
- [`SelectSearchFilter`](#selectsearchfilter)
- [`AutocompleteSearchFilter`](#autocompletesearchfilter)
- [`DateTimeSearchFilter`](#datetimesearchfilter)
- [`DateSearchFilter`](#datesearchfilter)

#### Type Parameters

##### T

`T`

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="controltype-3"></a> `controlType` | `ControlType` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' |  |
| <a id="formcontrol-3"></a> `formControl` | `FormControl`\<`undefined` \| `T`\> | A reference to the form control it represents |  |
| <a id="key-3"></a> `key` | `string` | Unique search-filter input key |  |
| <a id="label-3"></a> `label` | `string` | Label text to be displayed for the search-filter input control |  |
| <a id="maxlength-3"></a> `maxLength` | `number` | Max text length to be entered in the input component (default is 256) |  |
| <a id="placeholder-3"></a> `placeholder` | `string` | Placeholder text for search-filter input control |  |
| <a id="type-3"></a> `type` | `string` | Type of input control e.g. 'text' or 'email' |  |
| <a id="value-3"></a> `value` | `undefined` \| `T` | Default value to be displayed/selected in the input control |  |

***

### SelectOption\<T\>

Model used to populate select or autocomplete options.

#### Type Parameters

##### T

`T`

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="key-4"></a> `key` | `public` | `T` | Key used as a value for selected option |  |
| <a id="label-4"></a> `label` | `public` | `string` | String value used as display label of select option |  |

***

### SelectSearchFilter\<T\>

Search filter select input field configuration. Select options can be provided as fixed list (`options`)
or observable (dynamic) list (`options$`).

#### Extends

- [`SearchFilterBase`](#searchfilterbase)\<`T`\>

#### Type Parameters

##### T

`T`

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="controltype-4"></a> `controlType` | `ControlType` | `ControlType.select` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](#searchfilterbase).[`controlType`](#controltype-3) | - |  |
| <a id="formcontrol-4"></a> `formControl` | `FormControl`\<`undefined` \| `T`\> | `undefined` | A reference to the form control it represents | - | [`SearchFilterBase`](#searchfilterbase).[`formControl`](#formcontrol-3) |  |
| <a id="key-5"></a> `key` | `string` | `undefined` | Unique search-filter input key | - | [`SearchFilterBase`](#searchfilterbase).[`key`](#key-3) |  |
| <a id="label-5"></a> `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`label`](#label-3) |  |
| <a id="maxlength-4"></a> `maxLength` | `number` | `undefined` | Max text length to be entered in the input component (default is 256) | - | [`SearchFilterBase`](#searchfilterbase).[`maxLength`](#maxlength-3) |  |
| <a id="multiselect"></a> `multiSelect` | `boolean` | `true` | Enables selection of multiple options (default is true). If it is set to false, 'none selected' option becomes available as a first option. | - | - |  |
| <a id="options"></a> `options` | [`SelectOption`](#selectoption)\<`T`\>[] | `[]` | Fixed list of select filter options (default is empty list) | - | - |  |
| <a id="options-1"></a> `options$` | `undefined` \| `Observable`\<[`SelectOption`](#selectoption)\<`T`\>[]\> | `undefined` | Observable (dynamic) list of select filter options | - | - |  |
| <a id="placeholder-4"></a> `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`placeholder`](#placeholder-3) |  |
| <a id="type-4"></a> `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](#searchfilterbase).[`type`](#type-3) |  |
| <a id="value-4"></a> `value` | `undefined` \| `T` | `undefined` | Default value to be displayed/selected in the input control | - | [`SearchFilterBase`](#searchfilterbase).[`value`](#value-3) |  |

***

### TextSearchFilter

Search filter text input filed configuration.

#### Extends

- [`SearchFilterBase`](#searchfilterbase)\<`string`\>

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="controltype-5"></a> `controlType` | `ControlType` | `ControlType.text` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](#searchfilterbase).[`controlType`](#controltype-3) | - |  |
| <a id="formcontrol-5"></a> `formControl` | `FormControl`\<`undefined` \| `string`\> | `undefined` | A reference to the form control it represents | - | [`SearchFilterBase`](#searchfilterbase).[`formControl`](#formcontrol-3) |  |
| <a id="key-6"></a> `key` | `string` | `undefined` | Unique search-filter input key | - | [`SearchFilterBase`](#searchfilterbase).[`key`](#key-3) |  |
| <a id="label-6"></a> `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`label`](#label-3) |  |
| <a id="maxlength-5"></a> `maxLength` | `number` | `undefined` | Max text length to be entered in the input component (default is 256) | - | [`SearchFilterBase`](#searchfilterbase).[`maxLength`](#maxlength-3) |  |
| <a id="placeholder-5"></a> `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`placeholder`](#placeholder-3) |  |
| <a id="type-5"></a> `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](#searchfilterbase).[`type`](#type-3) |  |
| <a id="value-5"></a> `value` | `undefined` \| `string` | `undefined` | Default value to be displayed/selected in the input control | - | [`SearchFilterBase`](#searchfilterbase).[`value`](#value-3) |  |

## Interfaces

### SearchFilterParams

SearchFilterParams are the same type as @angular/router type Params,
containing a collection of query URL parameters for easy integration.

## Functions

### provideEntrySearchFilterConfig()

> **provideEntrySearchFilterConfig**(`config`): `Provider`

Can be used to provide entry search filter configuration.

#### Parameters

##### config

`Partial`\<[`EntrySearchFilterConfig`](#entrysearchfilterconfig)\>

#### Returns

`Provider`
