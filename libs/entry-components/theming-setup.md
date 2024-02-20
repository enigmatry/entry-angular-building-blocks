# Theming Setup Guide

## Overview

This guide explains how to set up your project to begin using theming. The Entry theme works hand-in-hand with [Angular Material](https://material.angular.io/). It allows you to configure only certain things for simplicity and quick setup.

### Prerequisites

1. Install required [`@enigmatry packages`](#required-packages)
2. Including [`generator`](#include-styles-generator) for theming setup
3. Check further steps [`here`](#theming-configuration-sections)

## Required packages

Ensure that the latest version of the[`@enigmatry packages`](#enigmatry-packages) are installed:

- [`entry-components`](https://github.com/enigmatry/entry-angular-building-blocks/tree/master/libs/entry-components)
- [`entry-form`](https://github.com/enigmatry/entry-angular-building-blocks/tree/master/libs/entry-form)

#### Installation

```ts
npm install @enigmatry/entry-components @enigmatry/entry-form
```

## Include styles generator

[`Entry components library`](#required-packages) comes with a generator file. The generator includes multiple generator files for supported components (dialog, table, button, form...).

To enable the import of `@enigmatry` packages from any location within your project without the requirement of a relative path, it is necessary to make modifications to the `angular.json` configuration file.
Add the following snippet to the `stylePreprocessorOptions`:

```diff
"architect": {
  "options": {
    "stylePreprocessorOptions": {
      "includePaths": [
+        "node_modules/@enigmatry"
      ]
    }
  }
}
```

Call the generator in your SCSS files dedicated for theming in order to apply these styles and include default theme. 

```scss
@use 'entry-components/styles/generator';

@include generator.generate-from();
```

### Optional: Remove Angular Material themes

If the [Angular Material](https://material.angular.io/) library has been configured in your project, it is recommended to remove the prebuilt theme that comes with it from the `angular.json` file, as demonstrated in the following example:

```diff
"architect": {
  "options": {
    "styles": [
-     "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
    ]
  }
}
```

In case you have specified these themes in any other location within your styles, it is also recommended to remove them.

## Theming Configuration Sections

For further steps and advanced theming options, refer to our <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/theming-configuration.md" target="_blank">**Theming Configuration guide**</a>. Key sections include:

- <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/theming-configuration.md#create-custom-theme" target="_blank">**Create Custom Theme**</a>: Create your own theme
- <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/theming-configuration.md#configuration-properties" target="_blank">**Configuration Properties**</a>: Customize your theme settings
- <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/theming-configuration.md#fonts-prerequisites" target="_blank">**Font Prerequisites**</a>
- <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/theming-configuration.md#set-angular-material-typography" target="_blank">**Set Up Angular Material Typography**</a>: Instructions for Angular Material Typography
- <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/theming-configuration.md#default-values-table" target="_blank">**Table of all configuration properties and default values**</a>