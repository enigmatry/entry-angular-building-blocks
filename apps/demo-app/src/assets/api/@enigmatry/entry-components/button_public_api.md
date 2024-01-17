# Module: button/public-api

## Classes

### EntryButtonConfig

Used to provide button configuration on module or application level.

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `cancel` | `MatButtonConfig` | Cancel button configuration |
| `submit` | `MatButtonConfig` | Submit button configuration |

## Variables

### ENTRY\_BUTTON\_CONFIG

> `const` **ENTRY\_BUTTON\_CONFIG**: `InjectionToken`\< [`EntryButtonConfig`](button_public_api.md#entrybuttonconfig) \>

Entry button config injection token.

Defaults:
- submit: type: 'flat', color: 'primary'
- cancel: type: 'basic', color: 'accent'

## Functions

### provideEntryButtonConfig

> **provideEntryButtonConfig**(`config`): `Provider`

Can be used to provide custom button configuration.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `config` | `Partial`\< [`EntryButtonConfig`](button_public_api.md#entrybuttonconfig) \> |

#### Returns

`Provider`
