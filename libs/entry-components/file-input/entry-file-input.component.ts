/* eslint-disable @typescript-eslint/member-ordering */
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component, ElementRef, EventEmitter, Input, NgZone,
  OnDestroy, OnInit, Output, Renderer2, ViewChild, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'entry-file-input',
  templateUrl: './entry-file-input.component.html',
  styleUrls: ['./entry-file-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFileInputComponent),
      multi: true,
    },
  ],
})
export class EntryFileInputComponent implements
  OnInit, OnDestroy, ControlValueAccessor {

  /**
   * Label for the select file button. Defaults to 'Choose file...'
   */
  @Input() label = 'Choose file...';

  /**
   * MatIcon for the select file button. Defaults to 'insert_drive_file' (optional)
   */
  @Input() matIcon?= 'insert_drive_file';

  /**
   * Same as 'accept' attribute in <input/> element.
   */
  @Input() accept?: string;

  /**
   * Same as 'multiple' attribute in <input/> element.
   */
  @Input()
  set multiple(multiple: BooleanInput) {
    this._multiple = coerceBooleanProperty(multiple);
  }
  get multiple(): boolean {
    return this._multiple;
  }
  private _multiple = false;

  /**
   * Same as 'disabled' attribute in <input/> element.
   */
  @Input()
  set disabled(disabled: BooleanInput) {
    this._disabled = coerceBooleanProperty(disabled);
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /**
   * Current selected [File | FileList] object.
   */
  value: File | FileList | undefined;

  /**
   * Event emitted when a file is selected. Emits a [File | FileList] object.
   */
  @Output() selectedFile = new EventEmitter<File | FileList>();


  @ViewChild('fileButton', { static: true, read: ElementRef })
  _fileButton!: ElementRef<HTMLElement>;

  @ViewChild('fileInput', { static: true })
  _fileInput!: ElementRef<HTMLInputElement>;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _ngZone: NgZone,
    private readonly _renderer: Renderer2) {
  }

  ngOnInit(): void {
    // Handle click event on custom file button and trigger click on native file input
    this._ngZone.runOutsideAngular(() => {
      fromEvent(this._fileButton.nativeElement, 'click')
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          this._fileInput.nativeElement.click();
        });
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  onFileSelect(event: Event): void {
    const fileInputEl = event.target as HTMLInputElement;
    const files: FileList = fileInputEl.files;

    const value = this._multiple
      ? files?.length > 1 ? files : files[0]
      : files[0];

    this.value = value;
    this.onChange(value);
    this.onTouched();

    if (value) {
      this.selectedFile.emit(value);
    }
  }

  clear(): void {
    this.value = undefined;
    this.onChange(undefined);
    this._renderer.setProperty(this._fileInput.nativeElement, 'value', '');
  }

  // ControlValueAccessor methods

  onChange = (_: any) => { };

  onTouched = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
