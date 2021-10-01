
# Grid methods

Grid heavily depends on breakpoints utilities since there's not much sense in making grid without them. On the other hand, in rare occasions if you just need row styles with auto width, independent core grid utilities might be just enough. In majority of cases, this utility is already the part of full grid so there's no need to use it manually.

## Grid

This module has overridable breakpoints variable. Due to Sass limitations, there should be only one (wrapper) @use/@forward of this utility in your application in order to prevent side effects and to have easier work.
Breakpoints must be in the same format as variables inside src root folder.

@use scss-foundation/src/layout/grid;

- Full grid generation. It generates everything from core grid plus all column/offset classes using syntax from Bootstrap 5, classes like col-sm-4, offset-md-10.
```
@include grid.generate(); // or @include grid.generate($divisions);
```
Default grid (as in Bootstrap) has 12 columns, but you can change that by passing a positive number parameter (between 2 and 1000).

## Grid core

@use scss-foundation/src/layout/grid-core as grid;

 - Core generation creates styles for rows and auto width of content. You must pass prefixes for column and offset class names.
```
@include grid.generate($column-prefix, $offset-prefix);
```

- Reverse row generation. Integrated in full grid, but this can be also added independently if needed in your application. 
```
@include grid.generate-reverse-row($breakpoints);
```
Breakpoints are required parameter. Expected format of breakpoints is a map/dictionary with keys being unique and something descriptive to you (i.e. mobile) and value being an object defined with size (in pixels) and string description that will be seen in CSS output (i.e. sm).
In other words:
    **mobile: ( size: 576px, description: 'sm' )**
For more details, please check the format of breakpoint variable inside src root folder.
 
This method generates classes which helps you reverse order in row; i.e. if row had divs A, B, C and you apply reverse row class, order will be C, B, A. There are two options: 
1) .reverse-row-DESIRED_BREAKPOINT_DESCRIPTION
2) .reverse-dow-under-DESIRED_BREAKPOINT_DESCRIPTION
The first one helps you to reverse order starting from given breakpoint (DESIRED_BREAKPOINT_DESCRIPTION might be sm, md, xxl, depending on what you pass as a breakpoint description). The second one helps you to reverse order on all widths under certain breakpoint.
