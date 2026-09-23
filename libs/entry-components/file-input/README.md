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

  files: FileInputValue;

  selectEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      ...
    } else {
      ...
    }
  };
}
```

## Form integration

The component implements
[`FormValueControl`](https://angular.dev/guide/forms/signals/custom-controls), so every flavour of
the forms API drives it: `[formControl]`, `formControlName`, `[(ngModel)]` and `[formField]`. It
provides no `ControlValueAccessor` — do not add one back, because Angular takes the accessor path
whenever one is present and the `value` model is then never written.

Without a form, bind the value directly:

```html
<entry-file-input label="Attachment" [(value)]="attachment" />
```

## Validation

The component does not validate its own value. A custom control cannot contribute errors to the
control or field it is bound to, so the size and count limits are rules you put on your own control.

For a reactive or template-driven form:

```typescript
import { maxFileCountValidator, maxFileSizeValidator } from '@enigmatry/entry-components/file-input';

form = new FormGroup({
  image: new FormControl<FileInputValue>(undefined, {
    validators: [Validators.required, maxFileSizeValidator(100), maxFileCountValidator(2)]
  })
});
```

For a signal form, the same two limits are schema rules:

```typescript
import { maxFileCount, maxFileSize } from '@enigmatry/entry-components/file-input';

readonly uploadForm = form(this.uploadModel, path => {
  required(path.attachments, { message: 'Select at least one file.' });
  maxFileSize(path.attachments, 100, { message: 'Every file has to be 100 KB or smaller.' });
  maxFileCount(path.attachments, 2, { message: 'Select at most two files.' });
});
```

Both report the error kinds `maxFileSize` and `maxFileCount`. A signal form's model may not include
`undefined`, so type the field `File | FileList | null` rather than `FileInputValue`.

## API Summary

#### Model

- value: `File | FileList | null | undefined`
  - The current selection, two-way bindable as `[(value)]`. The forms API writes it for you when
    the component is bound to a control or a field.

#### Inputs
- label: string
  - Label for the select file button. Defaults to 'Choose file...'.
- matIcon: string
  - MatIcon for the select file button. Defaults to 'insert_drive_file' (optional).
- multiple: boolean
  - Sets if multiple files can be selected at once in.
- accept: string
  - Sets files accepted when opening the file browser dialog. Same as "accept" attribute in `<input/>` element.
- disabled: boolean
  - Disables the button and the input. Bound by the forms API from the state of the control or
    field, so a binding of your own is overwritten there — disable the control instead.
- readonly: boolean
  - Disables the button while leaving the selection on screen. Also bound by the forms API.

#### Events

- selectedFile: function($event)
  - Emits a [File or FileList] object.
- touch: function()
  - Emitted when a selection is made, which is what marks the bound control or field touched.

#### Methods

- clear()
  - Empties the selection and the underlying element.
- reset()
  - Returns the element to its pristine state, which a value-only write cannot do. Called for you by
    `field().reset()`.

#### Styling

Button type and color can be styled by providing entry-button configuration.
