/* eslint-disable max-lines */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  afterNextRender, ChangeDetectionStrategy,
  Component, DestroyRef, ElementRef, NgZone,
  Renderer2, computed, forwardRef,
  inject, input, linkedSignal, output, signal, viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl, ControlValueAccessor, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator
} from '@angular/forms';
import { fromEvent } from 'rxjs';

const providers = [
  {
    provide: NG_VALUE_ACCESSOR,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => EntryFileInputComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => EntryFileInputComponent),
    multi: true
  }
];

@Component({
  standalone: false,
  selector: 'entry-file-input',
  templateUrl: './entry-file-input.component.html',
  styleUrl: './entry-file-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers
})
export class EntryFileInputComponent implements ControlValueAccessor, Validator {
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

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
   * Same as 'disabled' attribute in <input/> element.
   */
  readonly disabled = input(false, { transform: (value: BooleanInput) => coerceBooleanProperty(value) });

  /**
   * Same as 'readonly' attribute in <input/> element.
   */
  readonly readonly = input(false, { transform: (value: BooleanInput) => coerceBooleanProperty(value) });

  /**
   * Size limit per file in KB (kilobytes)
   */
  readonly maxFileSizeInKb = input<number | undefined>(undefined);

  /**
   * Number of files allowed when multiple=true
   */
  readonly maxFileCount = input<number | undefined>(undefined);

  /**
   * Current selected [File | FileList] object.
   *
   * @remarks Writing this signal marks the view, which is why `writeValue` and `clear` no longer
   * need an explicit `ChangeDetectorRef.markForCheck()`.
   */
  readonly value = signal<File | FileList | undefined>(undefined);

  /**
   * Event emitted when a file is selected. Emits a [File | FileList] object.
   */
  readonly selectedFile = output<File | FileList>();

  /**
   * Effective disabled state. Derived from the `disabled` input but writable, because the forms API
   * drives it through `setDisabledState` too - the last writer wins and a new `disabled` binding
   * re-asserts itself, which is how the previous backing field behaved.
   */
  protected readonly isDisabled = linkedSignal(() => this.disabled());

  private readonly fileButton = viewChild.required('fileButton', { read: ElementRef<HTMLElement> });

  private readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

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
    // Signal queries have no `static` option, so the button is not readable in ngOnInit as it was
    // with `@ViewChild(..., { static: true })`. The listener is wired after the first render, before
    // any click can reach the button.
    afterNextRender(() => {
      // Handle click event on custom file button and trigger click on native file input
      this.ngZone.runOutsideAngular(() => {
        fromEvent(this.fileButton().nativeElement, 'click')
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.fileInput().nativeElement.click();
          });
      });
    });
  }

  readonly onFileSelect = (event: Event): void => {
    const fileInputEl = event.target as HTMLInputElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const files: FileList = fileInputEl.files!;

    const value = this.multiple()
      ? files.length > 1 ? files : files[0]
      : files[0];

    this.value.set(value);
    this.onChange(value);
    this.onTouched();

    if (value) {
      this.selectedFile.emit(value);
    }
  };

  readonly clear = (): void => {
    this.value.set(undefined);
    this.onChange(undefined);
    this.renderer.setProperty(this.fileInput().nativeElement, 'value', '');
  };

  // implements ControlValueAccessor interface

  onChange = (_: any) => {
    // set by registerOnChange
  };

  onTouched = () => {
    // set by registerOnTouched
  };

  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  // implements Validator interface

  validate(control: AbstractControl<File | FileList | undefined>): ValidationErrors | null {
    const isSizeLimitExceeded = this.isFileSizeLimitExceeded(control.value);
    const isCountLimitExceeded = this.isFileCountLimitExceeded(control.value);

    if (!isSizeLimitExceeded && !isCountLimitExceeded) {
      return null;
    }
    return {
      ...isSizeLimitExceeded ? { maxFileSize: true } : {},
      ...isCountLimitExceeded ? { maxFileCount: true } : {}
    };
  }

  private readonly isFileCountLimitExceeded = (files: File | FileList | undefined): boolean => {
    const isMultiple = this.multiple() && files instanceof FileList;
    const maxFileCount = this.maxFileCount();
    const actualFileCount = (files as FileList)?.length;

    return isMultiple && !!maxFileCount && actualFileCount > maxFileCount;
  };

  private readonly isFileSizeLimitExceeded = (files: File | FileList | undefined): boolean => {
    const maxFileSizeInKb = this.maxFileSizeInKb();
    if (!maxFileSizeInKb) {
      return false;
    }
    const kilobyte = 1024;
    const maxFileSizeInBytes = maxFileSizeInKb * kilobyte;

    if (files instanceof File) {
      return files.size > maxFileSizeInBytes;
    }
    if (files instanceof FileList) {
      return Array.from(files).some(file => file.size > maxFileSizeInBytes);
    }
    return false;
  };
}
