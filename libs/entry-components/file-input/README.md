# Entry File Input

`EntryFileInputComponent` is an Angular component that provides a custom file input button with additional functionality

## Setup

Import the [EntryFileInputModule] in your NgModule:

```typescript
import { EntryFileInputModule } from '@enigmatry/entry-components/file-input';
@NgModule({
  imports: [
    EntryFileInputModule,
    ...
  ],
  ...
})
export class MyModule {}
```

## Usage

Use the entry-file-input component in your template:

```html
<entry-file-input 
 [label]="'Choose a file...'" 
 [matIcon]="'attachment'" 
 [accept]="'image/*'" 
 [multiple]="false" 
 [disabled]="false"
 [(ngModel)]="files"
 (selectedFile)="selectEvent($event)">
 </entry-file-input>
```

```typescript
export class Sample {

  files: File | FileList;

  selectEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      ...
    } else {
      ...
    }
  };
}
```

## API Summary

#### Inputs
- matIcon: string
  - MatIcon for the select file button. Defaults to 'insert_drive_file' (optional).
- multiple: boolean
  - Sets if multiple files can be selected at once in.
- accept: string
  - Sets files accepted when opening the file browser dialog. Same as "accept" attribute in `<input/>` element.
- disabled: boolean
  - Disables input and clears selected files.

#### Events

- selectedFile: function($event)
  - Emits a [File or FileList] object.

#### Styling

Button type and color can be styled by providing entry-button configuration. 