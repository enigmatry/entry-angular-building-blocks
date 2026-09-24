# search-filter/public-api

## Classes

### AutocompleteSearchFilter

Search filter autocomplete field configuration.

#### Remarks

The filter's value is the selected option's `key`, not the whole option, so the emitted
params stay router-shaped. The displayed label comes from whichever option carries that key -
see `resolveLabel` for the case where the key was restored from a URL and no lookup has run.

#### Extends

- [`SearchFilterBase`](#searchfilterbase)\<`T`\>

#### Type Parameters

##### T

`T`

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="controltype"></a> `controlType` | `ControlType` | `ControlType.autocomplete` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](#searchfilterbase).[`controlType`](#controltype-3) | - |  |
| <a id="debouncetime"></a> `debounceTime` | `number` | `undefined` | Delay in typing before triggering the search function, in milliseconds (default is 300). | - | - |  |
| <a id="formatvalue"></a> `formatValue` | ((`value`) => `unknown`) \| `undefined` | `undefined` | Optional function to format the value before displaying it in the input control. **Remarks** Takes `unknown`, not `T`: `T` in a function-parameter position on a property makes the class contravariant under `strictFunctionTypes`, so a filter of a concrete value type would stop being assignable to one of `unknown` and the filter arrays could not be typed. Narrow inside. | - | [`SearchFilterBase`](#searchfilterbase).[`formatValue`](#formatvalue-3) |  |
| <a id="key"></a> `key` | `string` | `undefined` | Unique search-filter input key. Also the key this filter's value takes in the emitted params. | - | [`SearchFilterBase`](#searchfilterbase).[`key`](#key-3) |  |
| <a id="label"></a> `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`label`](#label-3) |  |
| <a id="maxlength"></a> `maxLength` | `number` | `undefined` | Max text length accepted by a text filter (default is 256). | - | [`SearchFilterBase`](#searchfilterbase).[`maxLength`](#maxlength-3) |  |
| <a id="minimumcharacters"></a> `minimumCharacters` | `number` | `undefined` | Minimum number of characters that must be entered to trigger the search (default is 3). | - | - |  |
| <a id="placeholder"></a> `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`placeholder`](#placeholder-3) |  |
| <a id="required"></a> `required` | `boolean` | `undefined` | Whether a value must be given before the search can run (default is false). | - | [`SearchFilterBase`](#searchfilterbase).[`required`](#required-3) |  |
| <a id="resolvelabel"></a> `resolveLabel` | ((`key`, `abortSignal`) => `Promise`\<`string` \| `undefined`\>) \| `undefined` | `undefined` | Resolves the label for a value the user did not pick in this session - a key restored from a URL, say. Falls back to `search(String(key))` and matching on key when not supplied. | - | - |  |
| <a id="search"></a> `search` | (`input`, `abortSignal`) => `Promise`\<readonly [`SelectOption`](#selectoption)\<`T`\>[]\> | `undefined` | Looks up the options matching what the user typed. Abort when the signal fires. | - | - |  |
| <a id="type"></a> `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](#searchfilterbase).[`type`](#type-3) |  |
| <a id="value"></a> `value` | `T` \| `undefined` | `undefined` | Value to display/select in the input control. | - | [`SearchFilterBase`](#searchfilterbase).[`value`](#value-3) |  |

***

### DateSearchFilter

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
| <a id="formatvalue-1"></a> `formatValue` | ((`value`) => `unknown`) \| `undefined` | `undefined` | Optional function to format the value before displaying it in the input control. **Remarks** Takes `unknown`, not `T`: `T` in a function-parameter position on a property makes the class contravariant under `strictFunctionTypes`, so a filter of a concrete value type would stop being assignable to one of `unknown` and the filter arrays could not be typed. Narrow inside. | - | [`SearchFilterBase`](#searchfilterbase).[`formatValue`](#formatvalue-3) |  |
| <a id="key-1"></a> `key` | `string` | `undefined` | Unique search-filter input key. Also the key this filter's value takes in the emitted params. | - | [`SearchFilterBase`](#searchfilterbase).[`key`](#key-3) |  |
| <a id="label-1"></a> `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`label`](#label-3) |  |
| <a id="maxlength-1"></a> `maxLength` | `number` | `undefined` | Max text length accepted by a text filter (default is 256). | - | [`SearchFilterBase`](#searchfilterbase).[`maxLength`](#maxlength-3) |  |
| <a id="placeholder-1"></a> `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`placeholder`](#placeholder-3) |  |
| <a id="required-1"></a> `required` | `boolean` | `undefined` | Whether a value must be given before the search can run (default is false). | - | [`SearchFilterBase`](#searchfilterbase).[`required`](#required-3) |  |
| <a id="type-1"></a> `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](#searchfilterbase).[`type`](#type-3) |  |
| <a id="value-1"></a> `value` | `D` \| `undefined` | `undefined` | Value to display/select in the input control. | - | [`SearchFilterBase`](#searchfilterbase).[`value`](#value-3) |  |

***

### DateTimeSearchFilter

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
| <a id="formatvalue-2"></a> `formatValue` | ((`value`) => `unknown`) \| `undefined` | `undefined` | Optional function to format the value before displaying it in the input control. **Remarks** Takes `unknown`, not `T`: `T` in a function-parameter position on a property makes the class contravariant under `strictFunctionTypes`, so a filter of a concrete value type would stop being assignable to one of `unknown` and the filter arrays could not be typed. Narrow inside. | - | [`SearchFilterBase`](#searchfilterbase).[`formatValue`](#formatvalue-3) |  |
| <a id="key-2"></a> `key` | `string` | `undefined` | Unique search-filter input key. Also the key this filter's value takes in the emitted params. | - | [`SearchFilterBase`](#searchfilterbase).[`key`](#key-3) |  |
| <a id="label-2"></a> `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`label`](#label-3) |  |
| <a id="maxlength-2"></a> `maxLength` | `number` | `undefined` | Max text length accepted by a text filter (default is 256). | - | [`SearchFilterBase`](#searchfilterbase).[`maxLength`](#maxlength-3) |  |
| <a id="placeholder-2"></a> `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`placeholder`](#placeholder-3) |  |
| <a id="required-2"></a> `required` | `boolean` | `undefined` | Whether a value must be given before the search can run (default is false). | - | [`SearchFilterBase`](#searchfilterbase).[`required`](#required-3) |  |
| <a id="type-2"></a> `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](#searchfilterbase).[`type`](#type-3) |  |
| <a id="value-2"></a> `value` | `D` \| `undefined` | `undefined` | Value to display/select in the input control. | - | [`SearchFilterBase`](#searchfilterbase).[`value`](#value-3) |  |

***

### EntrySearchFilterComponent

Entry SearchFilter component.

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="renderedsearchfilters"></a> `renderedSearchFilters` | `readonly` | `Signal`\<[`SearchFilterBase`](#searchfilterbase)\<`unknown`\>[]\> | Read off the input rather than by iterating the field tree, which does not track its key set. |  |
| <a id="searchaction"></a> `searchAction` | `readonly` | `InputSignal`\<[`SearchFilterAction`](#searchfilteraction)\> | Runs the search. Return the server's messages to place them on their filters. |  |
| <a id="searchfilterchange"></a> `searchFilterChange` | `readonly` | `OutputEmitterRef`\<[`SearchFilterParams`](#searchfilterparams)\> | Emitted on every accepted search, for a caller that navigates rather than fetching here. |  |
| <a id="searchfilters"></a> `searchFilters` | `readonly` | `InputSignal`\<[`SearchFilterBase`](#searchfilterbase)\<`unknown`\>[]\> | Configuration of the search filters inputs that will be displayed in the search-filter component. |  |

#### Methods

##### clear()

> `protected` `readonly` **clear**(): `void`

Empties every filter and forgets which were touched, in one write.

###### Returns

`void`

###### Remarks

Built from the filters bound right now, never from a snapshot: `reset` replaces the
model wholesale, so a key missing from the value passed would drop out of the form.

***

### EntrySearchFilterConfig

Used to provide entry search filter configuration on module level.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="applybuttontext"></a> `applyButtonText` | `string` | Apply search filters button label (default 'Apply') |  |
| <a id="clearbuttontext"></a> `clearButtonText` | `string` | Clear search filters button label (default 'Clear') |  |
| <a id="maxlengthmessage"></a> `maxLengthMessage` | `string` | Message shown when a filter's value is longer than its maximum (default 'Value is too long') |  |
| <a id="noneselectedoptiontext"></a> `noneSelectedOptionText` | `string` | Label for 'none selected' select filter option |  |
| <a id="requiredmessage"></a> `requiredMessage` | `string` | Message shown under a required filter left empty (default 'This filter is required') |  |

***

### SearchFilterBase

Base Entry search filter input configuration.

#### Remarks

Configuration only. The form state lives in the search filter component model, and
nothing is written back onto these objects. To change a filter's value, hand the component a new
array of filters carrying the values you want.

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
| <a id="formatvalue-3"></a> `formatValue` | ((`value`) => `unknown`) \| `undefined` | Optional function to format the value before displaying it in the input control. **Remarks** Takes `unknown`, not `T`: `T` in a function-parameter position on a property makes the class contravariant under `strictFunctionTypes`, so a filter of a concrete value type would stop being assignable to one of `unknown` and the filter arrays could not be typed. Narrow inside. |  |
| <a id="key-3"></a> `key` | `string` | Unique search-filter input key. Also the key this filter's value takes in the emitted params. |  |
| <a id="label-3"></a> `label` | `string` | Label text to be displayed for the search-filter input control |  |
| <a id="maxlength-3"></a> `maxLength` | `number` | Max text length accepted by a text filter (default is 256). |  |
| <a id="placeholder-3"></a> `placeholder` | `string` | Placeholder text for search-filter input control |  |
| <a id="required-3"></a> `required` | `boolean` | Whether a value must be given before the search can run (default is false). |  |
| <a id="type-3"></a> `type` | `string` | Type of input control e.g. 'text' or 'email' |  |
| <a id="value-3"></a> `value` | `T` \| `undefined` | Value to display/select in the input control. |  |

***

### SelectOption

Model used to populate select or autocomplete options.

#### Type Parameters

##### T

`T`

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="groupname"></a> `groupName?` | `public` | `string` | Optional group name. Options sharing the same group name are rendered together under a group header. |  |
| <a id="key-4"></a> `key` | `public` | `T` | Key used as a value for selected option |  |
| <a id="label-4"></a> `label` | `public` | `string` | String value used as display label of select option |  |

***

### SelectSearchFilter

Search filter select input field configuration.

#### Remarks

Options are a signal, so a list that arrives later is bound rather than piped: pass a
`signal`, a `computed`, a `resource().value`, or `toSignal(source$)`. A plain array is accepted
and wrapped, so a fixed list needs no ceremony.

#### Extends

- [`SearchFilterBase`](#searchfilterbase)\<`T`\>

#### Type Parameters

##### T

`T`

#### Properties

| Property | Modifier | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="controltype-4"></a> `controlType` | `public` | `ControlType` | `ControlType.select` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](#searchfilterbase).[`controlType`](#controltype-3) | - |  |
| <a id="formatvalue-4"></a> `formatValue` | `public` | ((`value`) => `unknown`) \| `undefined` | `undefined` | Optional function to format the value before displaying it in the input control. **Remarks** Takes `unknown`, not `T`: `T` in a function-parameter position on a property makes the class contravariant under `strictFunctionTypes`, so a filter of a concrete value type would stop being assignable to one of `unknown` and the filter arrays could not be typed. Narrow inside. | - | [`SearchFilterBase`](#searchfilterbase).[`formatValue`](#formatvalue-3) |  |
| <a id="key-5"></a> `key` | `public` | `string` | `undefined` | Unique search-filter input key. Also the key this filter's value takes in the emitted params. | - | [`SearchFilterBase`](#searchfilterbase).[`key`](#key-3) |  |
| <a id="label-5"></a> `label` | `public` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`label`](#label-3) |  |
| <a id="maxlength-4"></a> `maxLength` | `public` | `number` | `undefined` | Max text length accepted by a text filter (default is 256). | - | [`SearchFilterBase`](#searchfilterbase).[`maxLength`](#maxlength-3) |  |
| <a id="multiselect"></a> `multiSelect` | `public` | `boolean` | `undefined` | Enables selection of multiple options (default is false). | - | - |  |
| <a id="options"></a> `options` | `readonly` | `Signal`\<readonly [`SelectOption`](#selectoption)\<`T`\>[]\> | `undefined` | The options to choose from (default is an empty list). | - | - |  |
| <a id="placeholder-4"></a> `placeholder` | `public` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`placeholder`](#placeholder-3) |  |
| <a id="required-4"></a> `required` | `public` | `boolean` | `undefined` | Whether a value must be given before the search can run (default is false). | - | [`SearchFilterBase`](#searchfilterbase).[`required`](#required-3) |  |
| <a id="shownoneoption"></a> `showNoneOption` | `public` | `boolean` | `undefined` | Whether a single-select filter offers a 'none selected' option as its first entry (default is true). | - | - |  |
| <a id="type-4"></a> `type` | `public` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](#searchfilterbase).[`type`](#type-3) |  |
| <a id="value-4"></a> `value` | `public` | `T` \| `undefined` | `undefined` | Value to display/select in the input control. | - | [`SearchFilterBase`](#searchfilterbase).[`value`](#value-3) |  |

***

### TextSearchFilter

Search filter text input filed configuration.

#### Extends

- [`SearchFilterBase`](#searchfilterbase)\<`string`\>

#### Properties

| Property | Type | Default value | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="controltype-5"></a> `controlType` | `ControlType` | `ControlType.text` | Control type to be overridden in implementing class, used to render the proper input type e.g. 'text-input' | [`SearchFilterBase`](#searchfilterbase).[`controlType`](#controltype-3) | - |  |
| <a id="formatvalue-5"></a> `formatValue` | ((`value`) => `unknown`) \| `undefined` | `undefined` | Optional function to format the value before displaying it in the input control. **Remarks** Takes `unknown`, not `T`: `T` in a function-parameter position on a property makes the class contravariant under `strictFunctionTypes`, so a filter of a concrete value type would stop being assignable to one of `unknown` and the filter arrays could not be typed. Narrow inside. | - | [`SearchFilterBase`](#searchfilterbase).[`formatValue`](#formatvalue-3) |  |
| <a id="key-6"></a> `key` | `string` | `undefined` | Unique search-filter input key. Also the key this filter's value takes in the emitted params. | - | [`SearchFilterBase`](#searchfilterbase).[`key`](#key-3) |  |
| <a id="label-6"></a> `label` | `string` | `undefined` | Label text to be displayed for the search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`label`](#label-3) |  |
| <a id="maxlength-5"></a> `maxLength` | `number` | `undefined` | Max text length accepted by a text filter (default is 256). | - | [`SearchFilterBase`](#searchfilterbase).[`maxLength`](#maxlength-3) |  |
| <a id="placeholder-5"></a> `placeholder` | `string` | `undefined` | Placeholder text for search-filter input control | - | [`SearchFilterBase`](#searchfilterbase).[`placeholder`](#placeholder-3) |  |
| <a id="required-5"></a> `required` | `boolean` | `undefined` | Whether a value must be given before the search can run (default is false). | - | [`SearchFilterBase`](#searchfilterbase).[`required`](#required-3) |  |
| <a id="type-5"></a> `type` | `string` | `undefined` | Type of input control e.g. 'text' or 'email' | - | [`SearchFilterBase`](#searchfilterbase).[`type`](#type-3) |  |
| <a id="value-5"></a> `value` | `string` \| `undefined` | `undefined` | Value to display/select in the input control. | - | [`SearchFilterBase`](#searchfilterbase).[`value`](#value-3) |  |

## Interfaces

### SearchFilterParams

SearchFilterParams are the same type as @angular/router type Params,
containing a collection of query URL parameters for easy integration.

***

### SearchFilterServerError

A server-side validation message, optionally aimed at one filter.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="key-7"></a> `key?` | `string` | The `SearchFilterBase.key` the message belongs to. Omit to show it above the filters. |  |

## Type Aliases

### SearchFilterAction

> **SearchFilterAction** = (`values`) => `Promise`\<readonly [`SearchFilterServerError`](#searchfilterservererror)[] \| `void`\>

Runs the search. Return the server's validation messages to place them on their filters, or
nothing when the search succeeded.

#### Parameters

##### values

[`SearchFilterParams`](#searchfilterparams)

#### Returns

`Promise`\<readonly [`SearchFilterServerError`](#searchfilterservererror)[] \| `void`\>

#### Remarks

Returned messages are submission errors: Angular routes each to its field and clears it
as soon as the user edits that filter.

***

### SearchFilterValue

> **SearchFilterValue** = `string` \| `number` \| `boolean` \| `Date` \| readonly `unknown`[] \| `null`

One search filter's value inside the form model.

#### Remarks

`undefined` is excluded deliberately. In signal forms a model key whose value is
`undefined` gets no field at all, and writing `undefined` into a live field destroys its node -
taking `touched`, `dirty` and any server error with it. `null` and `''` both keep the node.

***

### SearchFilterValues

> **SearchFilterValues** = `Record`\<`string`, [`SearchFilterValue`](#searchfiltervalue)\>

The search filter form's model: one entry per bound filter, keyed by `SearchFilterBase.key`.

***

### SelectSearchFilterOptions

> **SelectSearchFilterOptions**\<`T`\> = readonly [`SelectOption`](#selectoption)\<`T`\>[] \| `Signal`\<readonly [`SelectOption`](#selectoption)\<`T`\>[]\>

Either a fixed option list or a reactive one.

#### Type Parameters

##### T

`T`

## Functions

### provideEntrySearchFilterConfig()

> **provideEntrySearchFilterConfig**(`config`): `Provider`

Can be used to provide entry search filter configuration.

#### Parameters

##### config

`Partial`\<[`EntrySearchFilterConfig`](#entrysearchfilterconfig)\>

#### Returns

`Provider`
