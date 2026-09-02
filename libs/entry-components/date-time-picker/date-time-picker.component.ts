import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ErrorHandler,
   computed, effect, inject, input, model, output, viewChild } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import { MAT_DATE_FORMATS, DateAdapter, MatDateFormats } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME_FORMATS, EntryDateTimeAdapter } from '@enigmatry/entry-components/common';
import { skip } from 'rxjs';
import { ENTRY_DATE_TIME_PICKER_CONFIG, EntryDateTimePickerConfig } from './date-time-picker-config.model';
import { floorToDate, toValidationErrors, withTimeOfDay } from './date-time-picker.functions';
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

  /** @deprecated Bind `valueChange` instead. Emitted alongside it for the same changes. */
  readonly dateTimeChanged = output<D>();

  private readonly dateTimeAdapter: EntryDateTimeAdapter<D, unknown> = inject(DateAdapter) as EntryDateTimeAdapter<D, unknown>;
  private readonly format: MatDateFormats = inject(ENTRY_MAT_DATE_TIME_FORMATS);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorHandler = inject(ErrorHandler);
  public config: EntryDateTimePickerConfig = inject(ENTRY_DATE_TIME_PICKER_CONFIG);

  /** Control behind the visible field, which `MatDatepickerInput` needs to parse, format and validate typed text. */
  protected readonly displayControl = new FormControl<D | null | undefined>(undefined);

  /** Control behind the calendar, whose selection carries midnight until the time picker is merged in. */
  protected readonly calendarControl = new FormControl<D | null | undefined>(undefined);

  protected is12HourClock = this.dateTimeAdapter.is12HoursClock(this.format.display.dateInput);
  protected readonly timePicker = viewChild(EntryTimePickerComponent<D>);
  protected readonly minDate = computed(() => floorToDate(this.dateTimeAdapter, this.min()));
  protected readonly maxDate = computed(() => floorToDate(this.dateTimeAdapter, this.max()));

  private readonly fieldErrors = computed(() => toValidationErrors(this.errors()));

  constructor() {
    // Reports the field's errors as the display control's own, so the form field renders them and
    // Angular composes them with the parse errors MatDatepickerInput raises on unreadable text.
    this.displayControl.addValidators(() => this.fieldErrors());

    effect(() => this.writeToControls(this.value()));
    effect(() => this.applyDisabled(this.disabled()));
    effect(() => this.applyTouched(this.touched()));
    effect(() => {
      this.fieldErrors();
      this.displayControl.updateValueAndValidity({ emitEvent: false });
      this.changeDetectorRef.markForCheck();
    });

    // `skip(1)` drops the initial value, matching a bound control's `valueChanges`, which does not replay.
    toObservable(this.value)
      .pipe(skip(1), takeUntilDestroyed(this.destroyRef))
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      .subscribe(value => this.dateTimeChanged.emit(value as D));

    this.readTypedValue();
    this.applyCalendarSelection();
  }

  private readonly writeToControls = (value: D | null | undefined): void => {
    if (!Object.is(this.displayControl.value, value)) {
      this.displayControl.setValue(value, { emitEvent: false });
    }
    if (!Object.is(this.calendarControl.value, value)) {
      this.calendarControl.setValue(value, { emitEvent: false });
    }
  };

  private readonly applyDisabled = (disabled: boolean): void => {
    const apply = (control: FormControl<D | null | undefined>): void =>
      disabled ? control.disable({ emitEvent: false }) : control.enable({ emitEvent: false });
    apply(this.displayControl);
    apply(this.calendarControl);
    // The controls are not signals, so their disabled state does not mark the view.
    this.changeDetectorRef.markForCheck();
  };

  private readonly applyTouched = (touched: boolean): void => {
    if (touched) {
      this.displayControl.markAsTouched();
    } else {
      this.displayControl.markAsUntouched();
    }
    this.changeDetectorRef.markForCheck();
  };

  private readonly readTypedValue = (): void => {
    this.displayControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.value.set(value));
  };

  private readonly applyCalendarSelection = (): void => {
    this.calendarControl.valueChanges
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
          ? withTimeOfDay(this.dateTimeAdapter, value, {
            hours: timePicker.hours(), minutes: timePicker.minutes(), seconds: timePicker.seconds()
          })
          : value);
        this.touch.emit();
      });
  };
}
