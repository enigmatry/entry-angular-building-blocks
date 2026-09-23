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

  /** Current selection: one [File], a [FileList] when `multiple`, or nothing. */
  readonly value = model<FileInputValue>(undefined);

  /**
   * Label for the select file button. Defaults to 'Choose file...'
   */
  readonly label = input('Choose file...');

  /**
   * MatIcon for the select file button. Defaults to 'insert_drive_file' (optional)
   */
  readonly matIcon = input<string | undefined>('insert_drive_file');

  /**
   * Same as 'accept' attribute in <input/> element.
   */
  readonly accept = input<string | undefined>(undefined);

  /**
   * Same as 'multiple' attribute in <input/> element.
   */
  readonly multiple = input(false, { transform: (value: BooleanInput) => coerceBooleanProperty(value) });

  /**
   * Same as 'disabled' attribute in <input/> element. Bound by the forms API from the field's own
   * state, so set it directly only when no form is bound.
   */
  // `unknown`, not `BooleanInput`: this transform has to satisfy the one the control contract
  // declares, and a parameter type narrower than its `unknown` is not assignable to it.
  readonly disabled = input(false, { transform: (value: unknown) => coerceBooleanProperty(value) });

  /**
   * Same as 'readonly' attribute in <input/> element. Bound by the forms API from the field's own state.
   */
  readonly readonly = input(false, { transform: (value: unknown) => coerceBooleanProperty(value) });

  /**
   * Event emitted when a file is selected. Emits a [File | FileList] object.
   */
  readonly selectedFile = output<File | FileList>();

  /** Marks the bound field touched, which the forms API listens for. */
  readonly touch = output<void>();

  readonly fileButton = viewChild.required('fileButton', { read: ElementRef<HTMLElement> });

  readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  /** Display label for the current selection: a file name, or a count when multiple. */
  readonly fileNames = computed(() => {
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
    // The element keeps the files it was given, so a value written away elsewhere - a form reset, a
    // `setValue(undefined)` - would leave the old selection in place and swallow a re-pick of it.
    effect(() => {
      if (!this.value()) {
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

  readonly onFileSelect = (event: Event): void => {
    const value = this.toValue((event.target as HTMLInputElement).files);

    this.value.set(value);
    this.touch.emit();

    if (value) {
      this.selectedFile.emit(value);
    }
  };

  readonly clear = (): void => {
    this.value.set(undefined);
    this.clearFileInput();
  };

  /** Returns the element to its pristine state, which a value-only write cannot do. */
  readonly reset = (): void => this.clearFileInput();

  private readonly toValue = (files: FileList | null): File | FileList | undefined => {
    if (!files) {
      return undefined;
    }
    // `item` rather than an index read: indexing is typed `File`, but an empty list really yields undefined.
    return this.multiple() && files.length > 1 ? files : files.item(0) ?? undefined;
  };

  private readonly clearFileInput = (): void => {
    // Not `viewChild.required`: a consumer may call this before the first refresh, and throwing would leave a stale file name shown.
    const fileInput = this.fileInput();
    if (fileInput) {
      this.renderer.setProperty(fileInput.nativeElement, 'value', '');
    }
  };
}
