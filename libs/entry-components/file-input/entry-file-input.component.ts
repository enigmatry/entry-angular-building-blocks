/* eslint-disable max-lines */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  afterNextRender, ChangeDetectionStrategy,
  Component, DestroyRef, ElementRef, NgZone,
  Renderer2, computed, forwardRef,
  inject, input, linkedSignal, output, Signal, signal, viewChild
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

  private readonly selectedValue = signal<File | FileList | undefined>(undefined);

  /**
   * Current selected [File | FileList] object.
   *
   * @remarks Read-only on purpose. Writing it directly would move the value without notifying the
   * forms API, leaving the bound control stale - go through the control, or `clear()`. Writing the
   * signal internally marks the view, which is why `writeValue` and `clear` no longer need an
   * explicit `ChangeDetectorRef.markForCheck()`.
   */
  readonly value: Signal<File | FileList | undefined> = this.selectedValue.asReadonly();

  /**
   * Event emitted when a file is selected. Emits a [File | FileList] object.
   */
  readonly selectedFile = output<File | FileList>();

  /**
   * Derived from the `disabled` input but writable, because the forms API drives it through
   * `setDisabledState` too - the last writer wins and a new `disabled` binding re-asserts itself,
   * which is how the previous backing field behaved.
   */
  private readonly disabledState = linkedSignal(() => this.disabled());

  /**
   * Effective disabled state: the `disabled` input, or the forms API through `setDisabledState`.
   *
   * @remarks Exposed read-only. A writable signal here would let a caller disable the button and the
   * native input while the bound control stayed enabled and kept validating.
   */
  readonly effectiveDisabled: Signal<boolean> = this.disabledState.asReadonly();

  /** The visible button that proxies clicks to the hidden native file input. */
  readonly fileButton = viewChild.required('fileButton', { read: ElementRef<HTMLElement> });

  /** The hidden native file input that actually holds the selection. */
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
    // Signal queries have no `static` option, so the button is not readable in ngOnInit as it was
    // with `@ViewChild(..., { static: true })`. The listener is wired after the first render, before
    // any click can reach the button.
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
    const fileInputEl = event.target as HTMLInputElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const files: FileList = fileInputEl.files!;

    const value = this.multiple()
      ? files.length > 1 ? files : files[0]
      : files[0];

    this.selectedValue.set(value);
    this.onChange(value);
    this.onTouched();

    if (value) {
      this.selectedFile.emit(value);
    }
  };

  readonly clear = (): void => {
    this.selectedValue.set(undefined);
    this.onChange(undefined);
    // `fileInput` is deliberately not `viewChild.required`: this is public API a consumer may call
    // from their own ngOnInit, and a signal query is not resolved until the view is refreshed.
    // Throwing here would leave the value cleared and the form notified, but the native input still
    // showing the old file name.
    const fileInput = this.fileInput();
    if (fileInput) {
      this.renderer.setProperty(fileInput.nativeElement, 'value', '');
    }
  };

  // implements ControlValueAccessor interface

  onChange = (_: any) => {
    // set by registerOnChange
  };

  onTouched = () => {
    // set by registerOnTouched
  };

  writeValue(value: any): void {
    this.selectedValue.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
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
