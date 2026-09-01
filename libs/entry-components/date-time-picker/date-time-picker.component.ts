import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ErrorHandler,
   computed, effect, inject, input, output, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MatDateFormats } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME_FORMATS, EntryDateTimeAdapter, NgControlAccessorDirective,
  NoopControlValueAccessorDirective } from '@enigmatry/entry-components/common';
import { startWith } from 'rxjs';
import { ENTRY_DATE_TIME_PICKER_CONFIG, EntryDateTimePickerConfig } from './date-time-picker-config.model';
import { EntryTimePickerComponent } from './time-picker.component';

@Component({
    selector: 'entry-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    providers: [
        { provide: MAT_DATE_FORMATS, useFactory: () => inject(ENTRY_MAT_DATE_TIME_FORMATS) },
        { provide: DateAdapter, useClass: EntryDateTimeAdapter }
    ],
    // This component does not implement ControlValueAccessor. The no-op accessor below only
    // satisfies Angular's requirement that a [formControl]-bound element have an accessor, and the
    // control accessor then hands back the real control so this component can write to it directly.
    // Implementing the accessor properly here removes both host directives and the ngModel sync
    // inside NgControlAccessorDirective; that refactor is tracked separately.
    hostDirectives: [NoopControlValueAccessorDirective, NgControlAccessorDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
    host: {
        class: 'entry-date-time-picker'
    }
})
export class EntryDateTimePickerComponent<D> {
  readonly label = input('');
  readonly showSeconds = input<boolean | undefined>(undefined);
  readonly min = input<D | undefined>(undefined);
  readonly max = input<D | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly defaultTime = input<D | undefined>(undefined);
  readonly disabled = input(false);

  readonly dateTimeChanged = output<D>();

  private readonly ngControlAccessor = inject(NgControlAccessorDirective);
  private readonly dateTimeAdapter: EntryDateTimeAdapter<D, unknown> = inject(DateAdapter) as EntryDateTimeAdapter<D, unknown>;
  private readonly format: MatDateFormats = inject(ENTRY_MAT_DATE_TIME_FORMATS);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorHandler = inject(ErrorHandler);
  public config: EntryDateTimePickerConfig = inject(ENTRY_DATE_TIME_PICKER_CONFIG);

  // Control bound to component using FormsApi (ngModel, formControl, formControlName).
  // The accessor cannot know the value type; this component does, so it narrows here.
  get formControl(): FormControl<D> {
    return this.ngControlAccessor.control as FormControl<D>;
  }

  // Control that is connected to calendar
  calendarControl: FormControl<D | null | undefined> = new FormControl<D | undefined>(undefined);

  is12HourClock = this.dateTimeAdapter.is12HoursClock(this.format.display.dateInput);

  readonly timePicker = viewChild(EntryTimePickerComponent<D>);

  readonly minDate = computed(() => this.floorToDate(this.min()));

  readonly maxDate = computed(() => this.floorToDate(this.max()));

  constructor() {
    // Tracks `disabled` only: any other input would let an unrelated binding re-enable a control the consumer disabled.
    effect(() => this.setDisabled(this.disabled()));

    afterNextRender(() => {
      this.calendarControl.setValue(this.formControl.value, { emitEvent: false });
      this.mirrorDisabledState();
      this.mirrorValueChanges();
      this.applyCalendarSelection();
    });
  }

  private readonly mirrorDisabledState = (): void => {
    this.formControl.statusChanges
      // `startWith` seeds the current status: statusChanges does not replay, so a control disabled before this attached would be missed.
      .pipe(startWith(this.formControl.status), takeUntilDestroyed(this.destroyRef))
      .subscribe(status => {
        if (status === 'DISABLED') {
          this.calendarControl.disable({ emitEvent: false });
        } else {
          this.calendarControl.enable({ emitEvent: false });
        }
        // calendarControl is a FormControl, not a signal, so its disabled state does not mark the view
        this.changeDetectorRef.markForCheck();
      });
  };

  private readonly mirrorValueChanges = (): void => {
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.calendarControl.setValue(value, { emitEvent: false });
        this.dateTimeChanged.emit(value);
      });
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
        const dateTime = value ? this.dateTimeAdapter.clone(value) : value;
        if (dateTime && timePicker) {
          this.dateTimeAdapter.setTime(dateTime, timePicker.hours(), timePicker.minutes(), timePicker.seconds());
        }

        this.formControl.setValue(dateTime as D);
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
      });
  };

  private readonly floorToDate = (value: D | undefined): D | undefined => {
    if (!value) {
      return undefined;
    }
    const result = this.dateTimeAdapter.clone(value);
    this.dateTimeAdapter.setTime(result, 0, 0, 0);
    return result;
  };

  private readonly setDisabled = (disabled: boolean): void => {
    if (disabled && this.formControl.enabled) {
      this.formControl.disable();
      this.calendarControl.disable({ emitEvent: false });
    } else if (this.formControl.disabled) {
      this.formControl.enable();
      this.calendarControl.enable({ emitEvent: false });
    }
  };
}
