# button/public-api

## Classes

### EntryButtonConfig

Used to provide button configuration on module or application level.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="cancel"></a> `cancel` | `MatButtonConfig` | Cancel button configuration |  |
| <a id="submit"></a> `submit` | `MatButtonConfig` | Submit button configuration |  |

## Variables

### ENTRY\_BUTTON\_CONFIG

> `const` **ENTRY\_BUTTON\_CONFIG**: `InjectionToken`\<[`EntryButtonConfig`](#entrybuttonconfig)\>

Entry button config injection token.

Defaults:
- submit: type: 'flat', color: 'primary'
- cancel: type: 'basic', color: 'accent'

## Functions

### provideEntryButtonConfig()

> **provideEntryButtonConfig**(`config`): `Provider`

Can be used to provide custom button configuration.

#### Parameters

##### config

`Partial`\<[`EntryButtonConfig`](public-api.md#entrybuttonconfig)\>

#### Returns

`Provider`
