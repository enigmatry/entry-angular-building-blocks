# Module: button/public-api

## Classes

### EntryButtonConfig

Used to provide button configuration on module or application level.

#### Properties

| Property       | Type              | Description                 |
| :------------- | :---------------- | :-------------------------- |
| `cancelButton` | `MatButtonConfig` | Cancel button configuration |
| `submitButton` | `MatButtonConfig` | Submit button configuration |

## Variables

### ENTRY_BUTTON_CONFIG

> `const` **ENTRY_BUTTON_CONFIG**: `InjectionToken`\< [`EntryButtonConfig`](button_public_api.md#entrybuttonconfig) \>

Entry button config injection token. Can be used to provide custom button configuration.

Defaults:

- submitButton: type: 'flat', color: 'primary'
- cancelButton: type: 'basic', color: 'accent'
