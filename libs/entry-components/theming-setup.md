# Theming Setup Guide

## Overview

This guide explains how to set up your project to begin using theming. The Entry theme works hand-in-hand with [Angular Material](https://material.angular.io/). It allows you to configure only certain things for simplicity and quick setup.

### Prerequisites

1. Install required [`@enigmatry packages`](#required-packages)
2. Including [`generator`](#include-styles-generator) for theming setup
3. Remove Angular Material [`prebuilt themes`](#remove-prebuilt-themes)
4. Check further steps [`here`](#theming-configuration-sections)

## Required packages

Ensure that the latest version of the[`@enigmatry packages`](#enigmatry-packages) are installed:

- [`entry-components`](https://github.com/enigmatry/entry-angular-building-blocks/tree/master/libs/entry-components)
- [`entry-form`](https://github.com/enigmatry/entry-angular-building-blocks/tree/master/libs/entry-form)

### @enigmatry/entry-components

Reusable Entry components for Angular material. It comes with the default Roboto font. There are plenty of components that this library includes: button, dialog, file-input, search-filter, spinner, table, and many more. <br>
Visit components demo app to check what is currently supported [here](https://entry-demo.enigmatry.com/).

#### Installation

```ts
npm install @enigmatry/entry-components
```

### @enigmatry/entry-form
Form components and helper methods used by entry-code-generation.

#### Installation

```ts
npm install @enigmatry/entry-form
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

Call the generator in your SCSS files dedicated to theming in order to apply these styles.

```scss
@use 'entry-components/styles/generator';
```

## Remove prebuilt themes

In order to achieve optimal theming customization, it is crucial to eliminate all pre-existing Angular Material themes from the `angular.json` file, as illustrated in the example provided below.

```diff
"architect": {
  "options": {
    "styles": [
-     "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
    ]
  }
}
```


## Theming Configuration Sections

For further steps and advanced theming options, refer to our <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/configure-theming.md" target="_blank">**Theming Configuration guide**</a>. Key sections include:

- <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/configure-theming.md#create-custom-theme" target="_blank">**Create Custom Theme**</a>: Create your own theme
- <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/configure-theming.md#configuration-properties" target="_blank">**Configuration Properties**</a>: Customize your theme settings
- <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/configure-theming.md#fonts-prerequisitess" target="_blank">**Font Prerequisites**</a>
- <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/configure-theming.md#set-angular-material-typography" target="_blank">**Set Up Angular Material Typography**</a>: Instructions for Angular Material Typography
- <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/configure-theming.md#default-values-table" target="_blank">**Table of all configuration properties and default values**</a>