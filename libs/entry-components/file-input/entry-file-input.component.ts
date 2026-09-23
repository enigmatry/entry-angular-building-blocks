import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  afterNextRender, ChangeDetectionStrategy,
  Component, DestroyRef, effect, ElementRef, NgZone,
  Renderer2, computed,
  inject, input, model, output, viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { FormValueControl } from '@angular/forms/signals';
import { fromEvent } from 'rxjs';
import { FileInputValue } from './file-input-value.type';

@Component({
  standalone: false,
  selector: 'entry-file-input',
  templateUrl: './entry-file-input.component.html',
  styleUrl: './entry-file-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryFileInputComponent implements FormValueControl<FileInputValue> {
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  /** Current selection: one [File], a [FileList] when `multiple`, or `null`. */
  readonly value = model<FileInputValue>(null);

  /** Label for the select file button. Defaults to 'Choose file...' */
  readonly label = input('Choose file...');

  /** MatIcon for the select file button. Defaults to 'insert_drive_file' (optional) */
  readonly matIcon = input<string | undefined>('insert_drive_file');

  /** Same as 'accept' attribute in <input/> element. */
  readonly accept = input<string | undefined>(undefined);

  /** Same as 'multiple' attribute in <input/> element. */
  readonly multiple = input(false, { transform: (value: BooleanInput) => coerceBooleanProperty(value) });

  /**
   * Same as 'disabled' attribute in <input/> element. Bound by the forms API from the state of the
   * control or field, so set it directly only when no form is bound.
   */
  // `unknown` rather than `BooleanInput`, because a transform narrower than the one the control
  // contract declares is not assignable to it.
  readonly disabled = input(false, { transform: (value: unknown) => coerceBooleanProperty(value) });

  /**
   * Same as 'readonly' attribute in <input/> element. Bound from the field's own state under
   * `[formField]`, which is the only binding that carries one.
   */
  readonly readonly = input(false, { transform: (value: unknown) => coerceBooleanProperty(value) });

  /** Event emitted when a file is selected. Emits a [File | FileList] object. */
  readonly selectedFile = output<File | FileList>();

  /** Marks the bound control or field touched. Emitted on blur, and on a selection. */
  readonly touch = output<void>();

  private readonly fileButton = viewChild.required('fileButton', { read: ElementRef<HTMLElement> });

  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  /** The last value the element produced, held so a write coming back around is known as its echo. */
  private selectedFromElement: FileInputValue = null;

  /** Display label for the current selection: a file name, or a count when multiple. */
  protected readonly fileNames = computed(() => {
    const value = this.value();
    if (value instanceof File) {
      return value.name;
    }
    if (value instanceof FileList) {
      return `${value.length} files`;
    }
    return '';
  });

  constructor() {
    // A file input owns its selection and nothing may write one into it, so left alone it keeps files
    // the form no longer has - and the browser raises no `change` when one of those is picked again.
    effect(() => {
      if (!Object.is(this.value(), this.selectedFromElement)) {
        this.clearFileInput();
      }
    });

    // Signal queries have no `static` option, so the button is only readable after the first render.
    afterNextRender(() => {
      // Handle click event on custom file button and trigger click on native file input
      this.ngZone.runOutsideAngular(() => {
        fromEvent(this.fileButton().nativeElement, 'click')
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.fileInput()?.nativeElement.click();
          });
      });
    });
  }

  protected readonly onFileSelect = (event: Event): void => {
    const value = this.toValue((event.target as HTMLInputElement).files);

    this.selectedFromElement = value;
    this.value.set(value);
    this.touch.emit();

    if (value) {
      this.selectedFile.emit(value);
    }
  };

  readonly clear = (): void => {
    this.value.set(null);
    this.clearFileInput();
  };

  /** Returns the element to its pristine state, which a value-only write cannot do. */
  readonly reset = (): void => this.clearFileInput();

  /** Without this, `focusBoundControl()` falls back to focusing the host element, which is not focusable. */
  readonly focus = (options?: FocusOptions): void => this.fileButton().nativeElement.focus(options);

  private readonly toValue = (files: FileList | null): FileInputValue => {
    if (!files) {
      return null;
    }
    // `item` rather than an index read: indexing is typed `File`, but an empty list really yields undefined.
    return this.multiple() && files.length > 1 ? this.detach(files) : files.item(0);
  };

  // Clearing the element empties its own `FileList` in place, which would blank a value the form
  // still holds. A `DataTransfer` copy belongs to nobody and survives; a single `File` never suffers.
  private readonly detach = (files: FileList): FileList => {
    const transfer = new DataTransfer();
    for (const file of Array.from(files)) {
      transfer.items.add(file);
    }
    return transfer.files;
  };

  private readonly clearFileInput = (): void => {
    this.selectedFromElement = null;
    // Not `viewChild.required`: a consumer may call this before the first refresh, and throwing would leave a stale file name shown.
    const fileInput = this.fileInput();
    if (fileInput) {
      this.renderer.setProperty(fileInput.nativeElement, 'value', '');
    }
  };
}
