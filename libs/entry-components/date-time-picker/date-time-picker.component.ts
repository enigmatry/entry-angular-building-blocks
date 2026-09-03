import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, ErrorHandler,
   computed, effect, inject, input, model, output, viewChild } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import { MAT_DATE_FORMATS, DateAdapter, MatDateFormats } from '@angular/material/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { ENTRY_MAT_DATE_TIME_FORMATS, EntryDateTimeAdapter } from '@enigmatry/entry-components/common';
import { skip } from 'rxjs';
import { ENTRY_DATE_TIME_PICKER_CONFIG, EntryDateTimePickerConfig } from './date-time-picker-config.model';
import { EntryDateTimePickerControls } from './date-time-picker-controls';
import { EntryTimePickerComponent } from './time-picker.component';

@Component({
    selector: 'entry-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    providers: [
        { provide: MAT_DATE_FORMATS, useFactory: () => inject(ENTRY_MAT_DATE_TIME_FORMATS) },
        { provide: DateAdapter, useClass: EntryDateTimeAdapter }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
    host: {
        class: 'entry-date-time-picker'
    }
})
export class EntryDateTimePickerComponent<D> implements FormValueControl<D | null | undefined> {
  /** The selected date and time. `null` is relayed rather than normalised, so a bound control keeps the emptiness it declared. */
  readonly value = model<D | null | undefined>(undefined);

  readonly label = input('');
  readonly showSeconds = input<boolean | undefined>(undefined);
  // `NonNullable<D>`, because the forms API types these as the field's non-nullish bound.
  readonly min = input<NonNullable<D> | undefined>(undefined);
  readonly max = input<NonNullable<D> | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly defaultTime = input<D | undefined>(undefined);

  // Bound by the forms API from the field's own state; set them directly only when no form is bound.
  readonly disabled = input(false);
  readonly touched = input(false);
  readonly required = input(false);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);

  readonly touch = output<void>();

  /** Reports stabilized values, so two writes inside one tick surface as one. `valueChange` covers only the picker's own writes. */
  readonly dateTimeChanged = output<D>();

  private readonly dateTimeAdapter: EntryDateTimeAdapter<D, unknown> = inject(DateAdapter) as EntryDateTimeAdapter<D, unknown>;
  private readonly format: MatDateFormats = inject(ENTRY_MAT_DATE_TIME_FORMATS);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorHandler = inject(ErrorHandler);
  public config: EntryDateTimePickerConfig = inject(ENTRY_DATE_TIME_PICKER_CONFIG);

  private readonly dateTimeInput = viewChild.required<ElementRef<HTMLInputElement>>('dateTimeInput');
  // Read off the visible field's own ref, because the calendar carries a second datepicker input.
  private readonly datepickerInput = viewChild('dateTimeInput', { read: MatDatepickerInput<D> });

  protected readonly controls = new EntryDateTimePickerControls<D>(() => this.datepickerInput());

  protected readonly is12HourClock = this.dateTimeAdapter.is12HoursClock(this.format.display.dateInput);
  protected readonly timePicker = viewChild(EntryTimePickerComponent<D>);
  protected readonly minDate = computed(() => this.dateTimeAdapter.startOfDay(this.min()));
  protected readonly maxDate = computed(() => this.dateTimeAdapter.startOfDay(this.max()));

  /** Without this, `focusBoundControl()` falls back to focusing the host element, which is not focusable. */
  readonly focus = (options?: FocusOptions): void => this.dateTimeInput().nativeElement.focus(options);

  /** Clears a failed parse and re-formats the visible text, which a value-only write cannot do. */
  readonly reset = (): void => this.controls.reset(this.value());

  constructor() {
    effect(() => this.controls.write(this.value()));
    // These copy signal state into non-signal controls, which severs the dependency tracking that would
    // otherwise dirty this view - an `effect()` schedules the view for traversal but never marks it for
    // refresh. `mat-error` visibility comes from `MatInput.ngDoCheck()` -> `updateErrorState()`, which
    // runs only when this view is checked, so without the mark the error never renders at all.
    effect(() => this.andMarkForCheck(() => this.controls.setDisabled(this.disabled())));
    effect(() => this.andMarkForCheck(() => this.controls.setTouched(this.touched())));
    effect(() => this.andMarkForCheck(() => this.controls.reportFieldErrors(this.errors())));

    // `skip(1)` drops the initial value, matching a bound control's `valueChanges`, which does not replay.
    toObservable(this.value)
      .pipe(skip(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.dateTimeChanged.emit(value as D));

    this.readTypedValue();
    this.applyCalendarSelection();
  }

  private readonly andMarkForCheck = (apply: () => void): void => {
    apply();
    this.changeDetectorRef.markForCheck();
  };

  private readonly readTypedValue = (): void => {
    this.controls.display.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.controls.typed(value);
        this.value.set(value);
      });
  };

  private readonly applyCalendarSelection = (): void => {
    this.controls.calendar.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        const timePicker = this.timePicker();
        if (value && !timePicker) {
          // Bail rather than commit the calendar's midnight over the time the user selected.
          this.errorHandler.handleError(
            new Error('entry-date-time-picker: time picker unavailable, keeping the previous value')
          );
          return;
        }
        timePicker?.to24HourClock();
        this.value.set(value && timePicker
          ? this.dateTimeAdapter.withTimeOfDay(
            value, timePicker.hours(), timePicker.minutes(), timePicker.seconds())
          : value);
        this.touch.emit();
      });
  };
}
