# Theming Configuration Guide

### Table of Contents

- [Overview](#top)
- [Prerequisites](#prerequisites)
  - [Angular Material Documentation](#angular-material-documentation)
- [Styles Configuration](#styles-configuration)
- [Create custom theme](#create-custom-theme)
- [Fonts Prerequisites](#fonts-prerequisites)
  - [Use default font](#1-use-default-font)
  - [Custom fonts](#2-custom-fonts)
  - [Set Angular Material typography](#set-angular-material-typography)  
  - [Configuring typography](#differences-between-configuring-typography)  
- [Configuration Properties](#configuration-properties)
- [Theme Configuration Approaches](#theme-configuration-approaches)
  - [Custom Configuration](#1-custom-configuration)
    - [General Configuration](#general-configuration)
    - [Tables Configuration](#tables-configuration)
    - [Dialogs Configuration](#dialogs-configuration)
  - [Native Angular Material Configuration](#2-native-angular-material-configuration)
- [Default values table](#default-values-table)

## Overview

The **entry-components** library comes with a generator which simplifies the project theme by eliminating the need for extensive custom styling. While the library comes with default settings, it provides the flexibility to be configured according to the unique requirements of each project. A wide range of properties can be leveraged to introduce varied style changes when configured appropriately. The guide provides a detailed walkthrough of this process.

## Prerequisites

Before diving into theming configurations, make sure to address the following prerequisites:


- Complete steps from <a href="https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/theming-setup.md" target="_blank">Theming Setup guide</a> before configuring theme
- Ensure that the latest version of the [`entry-components`](https://www.npmjs.com/package/@enigmatry/entry-components) library is installed
- Prepare custom fonts  if customers require them, follow the instructions [`here`](#2-preparing-custom-fonts)
- For a deeper understanding of theming concepts and customization options, refer to the [Angular Material documentation](#angular-material-documentation)

### Angular Material Documentation

To gain a comprehensive understanding of theming configurations, it is highly recommended to consult the official [Angular Material documentation](https://material.angular.io/). Familiarizing Material's theming and typography guides will provide crucial insights into the available customization options.

- [Theming Guide](https://material.angular.io/guide/theming)
- [Theming your own components](https://material.angular.io/guide/theming-your-components)
- [Typography Guide](https://material.angular.io/guide/typography)

## Styles Configuration

In summary, the generator:

- Includes multiple generator files for supported entry components (dialog, table, button, form...)
- Generates [Angular Material](https://material.angular.io/guide/theming) for customization of color palettes, typography, and density settings
- Sets up  default, boilerplate theme with predefined values
- Combines default theme and custom theme styles

```scss
@use 'entry-components/styles/generator';
```

## Create custom theme

Define the `$custom-theme` map that will be expanded with various customization options based on specific needs.

```scss
$custom-theme: ();
```

Include and apply the styles generated by the generate-from mixin in the 'generator' module, using the customization options provided in the $custom-theme map.

```scss
@include generator.generate-from($custom-theme);
```

Our theme is now an empty object, and the default library theme is used.

```scss
@use 'entry-components/styles/generator';

$custom-theme: (
);

@include generator.generate-from($custom-theme);
```

> **_NOTE:_**  In case you have an existing theme and wish to modify certain options, locate the usage of the theming generator within your codebase.

## Fonts Prerequisites

There are 2 possibilities of using fonts in theming:

### 1. Use default font

**Entry-components** library comes with the default font family. To utilize it, configuration in the `angular.json` file at the root of the app is necessary. The font is imported from the library's node modules as follows:  

```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "./node_modules/@enigmatry/entry-components/assets/",
    "output": "/assets/"
  }
],
```

### 2. Custom fonts

Ensure that the following steps are completed:

1. Place custom font files in the `assets/fonts/` folder of project.
2. Create a dedicated Sass file (e.g., `partials/core/fonts.scss`)
3. Use the `@font-face` rule in `fonts.scss` to define custom fonts with an absolute path.

```scss
@font-face {
  font: {
    family: 'Helvetica';
    weight: 400;
  }
  src: url('/assets/fonts/Helvetica.woff2') format('woff2'), url('/assets/fonts/Helvetica.woff') format('woff');
}
```

### Set Angular Material typography

Since Angular Material uses different typography levels, to read values from a theme it's needed to add those typography level cases to corresponding native elements. So the right font configurations will be applied. Check the full list here  [Material Typography Guide](https://material.angular.io/guide/typography). 

In another case, if we don't provide those classes for custom components, our typography configurations will not be applied. It depends on the situation and customer needs.

The first necessary step is to apply it to the whole body of the app, add `.mat-body` or `.mat-body-2` class to the body element in index.html file in app root. 

```html
<!-- Applying mat-body class to the root component in index.html -->
<body class="mat-body">
  <app-root></app-root>
</body>
```

In order for the expected styling to be implemented, there may be occasions where it is necessary to put adequate Angular Material classes.

```html
<!-- Example of adding material class -->
<section>
  <h1 class="mat-headline-1">Main header</h1>
</section>
```

Based on the project needs, we choose one of two configuration options.
By default, default-theme will be applied if our custom-theme object is empty. If fonts are not specified
body fonts will be used for everything.

### Differences between configuring typography

The configuration of typography for headers, paragraphs, and other elements exhibits slight differences depending on the chosen [configuration approach](#theme-configuration-approaches). Explore the following subsections for more details:
- [Configure typography for custom approach](#3-fonts)
- [Configure typography based Angular Material Typography](#1-typography-configuration)

## Configuration Properties

The new **custom theme map** should replace the library's default theme. The structure is nested and defines various aspects of a theme. It can be extended and customized for project needs by passing on different key parameters. The structure consists of three main sections: **general**, **tables**, and **dialogs**. Each section contains a specific configuration.

> **_NOTE:_**  Any property in the theming configuration can be skipped, and if omitted, the **default value** for that property will be used (unless it's specified differently, as for [fonts](#differences-between-configuring-typography)). This provides flexibility for developers to customize only the specific aspects of the theme that are relevant to their project. See table with default values [here](#default-values-table)

| Submap       | Description                                                             | Possible Options                      |
|--------------|-------------------------------------------------------------------------|----------------------------------------|
| **general**  | Influence the overall appearance and behavior of components. | `typography`, `fonts`, `spacing`, `inputs`, `buttons` |
| **tables**   | Customize table component styling.                                       | `cells`, `rows`, `contents`            |
| **dialogs**  | Set dialog font size.                                                   | `title`                                |

```scss
$custom-theme: (
  general: (
    // General configuration options go here
  ),
  tables: (
    // Table-related configuration options go here
  ),
  dialogs: (
    // Dialog-related configuration options go here
  ) 
);
```

## Theme Configuration Approaches

The theme can be configured in two ways, depending on the specific case, dependencies, and the structure of the project. It's crucial to note that it's not feasible to combine both methods; choose and stick with the one approach instead.

1. [Custom Configuration](#1-custom-configuration)
2. [The native Angular Material Configuration](#2-native-angular-material-configuration)

We highly recommend using the initial, **custom configuration** because it's straightforward, comprehensible, and easy to understand and maintain.
If there are specific needs that cannot be met with simple theming [the native Angular Material approach](#2-native-angular-material-configuration) is inevitable.

## 1. Custom Configuration

### General Configuration

The `general` section in the `$custom-theme` configuration contains settings that shape the overall look and behavior of the components.

It contains of following properties:
1. [Density](#1-density)
2. [Colors](#2-colors)
3. [Fonts](#3-fonts)
4. [Spacing](#4-spacing)
5. [Inputs](#5-inputs)
6. [Buttons](#6-buttons)
7. [Checkboxes](#7-checkboxes)
8. [Toggles](#8-toggles)

### 1. Density

The density property typically accepts values like **-1**, **0**  (default), and **1**, which correspond to different levels of density. Check for [more info](https://m2.material.io/design/layout/applying-density.html#usage):

- `-1`: Reduces the spacing and makes elements more compact.
- `0`: Default density according to the Material Design guidelines.
- `1`: Increases spacing, providing a more relaxed and open layout.

```scss
$custom-theme: (
  general: (
    density: 0
  )
);
```

### 2. Colors

Pass a single, hexadecimal color and theming will do the rest. It will create darker and lighter variations of that color, so we don't need to specify any more complex color palettes.
Defines various color properties:

- `primary`: Main color used in application, it sets the tone for the overall theme.
- `accent`: Highlight certain elements and create visual interest.
- `font`: Specifies the default font color.
- `disabled`: Style elements that are in a disabled state:
  - `foreground`: Text color for disabled elements.
  - `background`: Background color for disabled elements.

```scss
$custom-theme: (
  general: (
    density: 0,
    colors: (
      primary: #2581C4,
      accent: #EA518D,
      font: #323232,
      disabled: (
        foreground: rgb(0 0 0 / .38),
        background: rgb(0 0 0 / .12)
      )
    )
  )
);
```

### 3. Fonts

Allow customization of typography and font styles based on Angular Material typography levels. `body` property is the most important and **mandatory** to set because that one is **default** and font family will be applied on all headers and buttons. If we want to additionally customize some other typography elements and properties, we can include other font properties.

Each font related property in configuration can have: **family**, **size** and **letter-spacing** values.

- `body`: Defines typography for base body text.
  - `family`: Sets custom font family.
  - `size`: Sets custom font size.
  - `letter-spacing`: Sets custom letter spacing; if we leave default value or set it to `null` manually, Angular Material's default values will be applied.
- `buttons`: Typography for buttons and anchors.

```scss
$custom-theme: (
  general: (
    fonts: (
      body: (
        family: 'Helvetica',
        size: 20px,
        letter-spacing: 5px
      ),
      buttons: (
        size: 10px,
        letter-spacing: 2px
      )
    ),
  )
);
```

#### **OPTIONAL**

For customizing headers, check [this section](#adding-material-classes)

- `hero-titles`: Define typography for h1, h2, h3, h4 elements.
- `titles`: Typography for h5 and h6 material subtitles

> **_NOTE:_**  Properties from list above are only applied if we use this method. If we do it in a Native angular material way, the properties are different, based on Typography material guidelines. Check [this subsection](#1-typography-configuration) for that scenario: 

> **_NOTE:_**  Don't forget to check whether font is being applied.

```scss
$custom-theme: (
  general: (
    fonts: (
      body: (
        family: 'Helvetica',
        size: 20px,
        letter-spacing: normal
      ),
      buttons: (
        family: 'Montserrat',
        size: 10px,
        letter-spacing: 2px
      ),
      titles: (
        family: 'Open Sans',
        size: 25px,
        letter-spacing: 10px
      ),
      hero-titles: (
        family: 'Open Sans',
        size: 40px,
        letter-spacing: 10px
      )
    ),
  )
);
```

### 4. Spacing

The submap provides the necessary spacing information for styling the **entry form**, **search form button** and **form field**.

```scss
$custom-theme: (
  general: (
    spacing: (
      default: 15px
    ),
  )
);
```

### 5. Inputs

We utilize the background value within the input configuration to establish the background color for **form text fields**. By default, background properties have no color explicitly defined, allowing the default Material styling or any existing CSS rules to take effect.

```scss
$custom-theme: (
  general: (
    inputs: (
      background: #f4f4f4
    ),
  )
);
```

### 6. Buttons

Additional customization for buttons:

- `icon-size`:  sets the default size for icons on buttons when icons are present.
- `radio`:  Contains property for radio buttons.
  - `background`: sets the background color for the inner and outer circles of radio buttons.

```scss
$custom-theme: (
  general: (
    buttons: (
      icon-size: 48px,
      radio: (
        background: #333
      )
    )
  )
)
```

### 7. Checkboxes

Provides customization of checkboxes background and border color for **unchecked state**.

- `background`:  sets the background color for the checkboxes.
- `border-hover-color`: sets the border color of unchecked checkbox while in hover state.

```scss
$custom-theme: (
  general: (
    checkboxes: (
      background: blue,
      border-hover-color: darkblue
    )
  )
)
```

### 8. Toggles

Modifies the toggle components' appearance by defining background colors for the **on** and **off** states, making adjustments to track according to the lightness of the colors.

- `on`: Contains property for the toggle in its active state.
- `off`: Contains property for the toggle in its inactive state.
  - `background`: Sets the toggle's handler and track background color based on activated(on) or deactivated(off) state of toggle. If 'transparent' value is passed, it will be ignored and primary background will be applied.

```scss
$custom-theme: (
  general: (
    toggle: (
      on: (
        background: orange
      ),
      off: (  
        background: green
      ),
    ),
  )
)
```

### Tables Configuration

The `tables` section in the `$custom-theme` configuration handles how table components are styled and themed.

It contains of following properties:
1. [Header](#1-header)
2. [Cells](#2-cells)
3. [Rows](#3-rows)
4. [Contents](#4-contents)

### 1. Header

Contains property for styling the table header.

- `size`: determines the font size of the header cells in the table.

```scss
$custom-theme: (
  tables: (
    header: (
      font-size: 20px
    )
  )
)
```

### 2. Cells

Contains properties related to individual cells in a table:
- `edge-gap`: specifies control of both the left and right table paddings, affecting the **first and last cells** to achieve the desired spacing (4px by default).
- `padding`: allows adding top, right, bottom and left paddings for **all cells in table**. By default, there is no value.  It's worth mentioning that edge-gap padding will override padding values for the first and last table cell.

```scss
$custom-theme: (
  tables: (
    cells: (
      edge-gap: 10px,
      padding: 15px 30px 10px 35px
    )
  )
)
```

### 3. Rows

Handles the appearance of table rows:

- `odd-even-background`: sets the background color for odd and even rows.
  - `odd`: sets the background color for rows in odd positions.
  - `even`: sets the background color for rows in even positions
- `selected-color`: sets the text color of cells within a selected row.
- `selected-background`: sets the background color for selected row. If the value 'transparent' is provided, the background will be applied based on whether the row is odd or even.
- `disabled-color`: defines the background color for disabled rows.

```scss
$custom-theme: (
  tables: (
    rows: (
      odd-even-background: (
        odd: #F0F0F0, 
        even: #FFF,
      ),
      selected-color: #FFF,
      selected-background: null,
      disabled-color: #F5F5F5,
    ),
  )
);
```

### 4. Contents

Manages the styling of table content:

- `no-result`": contains properties for the appearance of a message displayed when there are no search results:
  - `font-size`: specifies the font size of the message.
  - `font-weight`: controls the font weight of the message.

```scss
$custom-theme: (
  tables: (
    header: (
      font-size: 20px
    )
    cells: (
      edge-gap: 4px,
      padding: null
    ),
    rows: (
       odd-even-background: (
        odd: #F0F0F0, 
        even: #FFF,
      ),
      selected-color: #FFF,
      selected-background: null,
      disabled-color: #F5F5F5,
    ),
    contents: (
      no-result: (
        font-size: 13px,
        font-weight: 500
      )
    )
  )
);
```

### Dialogs Configuration

The `dialogs` submap within `$custom-theme` focuses on configuring the appearance of dialog components.

It contains only [title property](#1-title), for now:

### 1. Title

Including properties related to the title of a dialog:

- `size` determines the font size of the dialog title.

```scss
$custom-theme: (
  dialogs: (
    title: (
      size: 20px
    )
  )
);
```

## 2. Native Angular Material Configuration

In this approach, we carefully set up every little detail within entry components. Angular Material offers a predefined color palette for application, covering a range of  primary, accent, and warn colors.
When a project necessitates many specific Angular Material overrides that we don't want to support with regular theming, this approach is necessary. It can also be useful in situations where we need more granular control over the variations of primary and accent colors, as well as their shadows.

All properties for native configuration are set to `null` in default theme, meaning that they will not be applied the other related properties will take presence unless we redeclare or customize them.

### General Configuration

It contains of following properties:
1. [Typography](#1-typography-configuration)
2. [Colors](#2-color-themes)


### 1. Typography Configuration

Typography configuration enables us to create a set of typographic styles based on the Angular Material Design specifications. These styles are then included in a custom theme, and the Sass directive generates corresponding CSS styles based on this theme. This setup allows for consistent and easily modifiable typography across a web project following Angular Material Design principles.

There are few steps to follow to implement this:

-In your dedicated file for theming styles add Sass map that defines various typographic styles for different elements. Each style includes properties like font size, line height, font weight, font family, and letter spacing.

```scss
$typography: (
  headline-1: (font-size: 96px, line-height: 96px, font-weight: 300, font-family: 'roboto, sans-serif', letter-spacing: -.015625em),
  headline-2: (font-size: 60px, line-height: 60px, font-weight: 300, font-family: 'roboto, sans-serif', letter-spacing: -.0083333333em), 
    // ... (include other styles)
  'font-family': 'Roboto, sans-serif'
);
```

Next, we define our own Sass map that includes the previously defined $typography map. It is part of a broader theme definition. It consists of a general submap, with a 
property `typography`. It's associating the typographic styles ($typography) with the broader theme ($custom-theme), making those styles part of the overall design theme for the project.  By default, it's set to `null`.

```scss
$custom-theme: (
  general: (
    typography: $typography
  )
);
```

### 2. Color Themes

By default, Angular Material expects colors palettes (primary, accent, warn) with darker and lighter variations. Primary and accent are mandatory.

```scss
$primary: (
  50 : #E6E6E6,
  100 : #C0C0C0,
  200 : #2B95DB,
  300 : #7FE2F3,
  400 : #B5D117,
  500 : hsl(78 78% 47%),
  600 : #C953EC,
  700 : #1A81C5,
  800 : #209E94,
  900 : #2FC955,
  A100 : #209E94,
  A200 : #1A81C5,
  A400 : #C953EC,
  A700 : #B5D117,
  contrast: (
    50 : #000,
    100 : #000,
    200 : #000,
    300 : #FFF,
    400 : #FFF,
    500 : #FFF,
    600 : #FFF,
    700 : #FFF,
    800 : #FFF,
    900 : #FFF,
    A100 : #000,
    A200 : #FFF,
    A400 : #FFF,
    A700 : #FFF,
  )
);

$accent: (
  // put here accent color values...
);


$custom-theme: (
  general: (
    colors: (
      primary-theme: $primary,
      accent-theme: $accent
    ),
    typography: $typography
  )
);
```

Don't forget to call the generator at the end of file:

```scss
@include generator.generate-from($custom-theme);
```

So, the final code should look like this:
```scss
$typography: (
  headline-1: (font-size: 96px, line-height: 96px, font-weight: 300, font-family: 'roboto, sans-serif', letter-spacing: -.015625em),
  headline-2: (font-size: 60px, line-height: 60px, font-weight: 300, font-family: 'roboto, sans-serif', letter-spacing: -.0083333333em), 
  headline-3: (font-size: 48px, line-height: 50px, font-weight: 400, font-family: 'roboto, sans-serif', letter-spacing: normal),
  headline-4: (font-size: 34px, line-height: 40px, font-weight: 400, font-family: 'roboto, sans-serif', letter-spacing: .0073529412em), 
  headline-5: (font-size: 32px, line-height: 32px, font-weight: 400, font-family: 'roboto, sans-serif', letter-spacing: normal), 
  headline-6: (font-size: 32px, line-height: 32px, font-weight: 500, font-family: 'roboto, sans-serif', letter-spacing: .0125em),
  subtitle-1: (font-size: 32px, line-height: 28px, font-weight: 400, font-family: 'roboto, sans-serif', letter-spacing: .009375em),
  subtitle-2: (font-size: 32px, line-height: 22px, font-weight: 500, font-family: 'roboto, sans-serif', letter-spacing: .0071428571em),
  body-1: (font-size: 16px, line-height: 24px, font-weight: 400, font-family: 'roboto, sans-serif', letter-spacing: .03125em), 
  body-2: (font-size: 14px, line-height: 20px, font-weight: 400, font-family: 'roboto, sans-serif', letter-spacing: .0178571429em), 
  caption: (font-size: 32px, line-height: 20px, font-weight: 400, font-family: 'roboto, sans-serif', letter-spacing: .0333333333em),
  button: (font-size: 24px, line-height: 36px, font-weight: 500, font-family: 'roboto, sans-serif', letter-spacing: .0892857143em), 
  overline: (font-size: 12px, line-height: 32px, font-weight: 500, font-family: 'roboto, sans-serif', letter-spacing: .1666666667em), 
  'font-family': 'Roboto, sans-serif'
);

$custom-theme: (
  general: (
    typography: $typography
  )
);

@include generator.generate-from($custom-theme);
```

## Default values table

The table below outlines the default values for all supported configuration properties. If a specific value is not explicitly defined in your project's configuration, the system will default to the values listed here.

| Category         | Property                        | Default Value                       |
|------------------|---------------------------------|-------------------------------------|
| **general**      | density                         | 0                                   |
|                  | colors/primary-theme            | null                                |
|                  | colors/accent-theme             | null                                |
|                  | colors/primary                  | #2581C4                             |
|                  | colors/accent                   | #EA518D                             |
|                  | colors/font                     | #323232                             |
|                  | disabled/foreground             | rgb(0 0 0 / .38)                    |
|                  | disabled/background             | rgb(0 0 0 / .12)                    |
|                  | typography                      | null                                |
|                  | fonts/family                    | ''                                  |
|                  | fonts/size                      | 0                                   |
|                  | fonts/letter-spacing            | null                                |
|                  | spacing/default                 | 15px                                |
|                  | inputs/background               | null                                |
|                  | buttons/icon-size               | 48px                                |
|                  | buttons/radio/background        | null                                |
|                  | checkboxes/background           | null                                |
|                  | checkboxes/border-hover-color   | null                                |
|                  | toggle/on/background            | null                                |
|                  | toggle/off/background           | null                                |
| **tables**       | header/font-size                | null                                |
|                  | cells/edge-gap                  | 4px                                 |
|                  | cells/padding                   | null                                |
|                  | rows/selected-color             | #FFF                                |
|                  | rows/selected-background        | null                                |
|                  | rows/disabled-color             | #F5F5F5                             |
|                  | rows/odd-even-background/odd    | #F0F0F0                             |
|                  | rows/odd-even-background/even   | #FFF                                |
|                  | no-result/font-size             | 13px                                |
|                  | no-result/font-weight           | 500                                 |
| **dialogs**      | title/size                      | 20px                                |

[Back to Top](#top)