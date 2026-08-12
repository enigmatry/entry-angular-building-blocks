import { AfterViewInit, Directive, ElementRef, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Subject, takeUntil } from 'rxjs';
import { findOptionByLabel, findOptionByValue } from './select-configuration.interface';
import { SelectOption } from './select-option.model';

@Directive({
    selector: '[entryCheckAutocompleteInput]',
    standalone: false
})
export class CheckAutocompleteInputDirective implements OnChanges, AfterViewInit, OnDestroy {
  @Input() options: SelectOption[] = [];
  private destroy$ = new Subject<void>();

  private readonly matAutocomplete = inject(MatAutocompleteTrigger, { host: true, self: true });
  private readonly ngControl = inject(NgControl);
  private readonly elemRef = inject(ElementRef);

  get control(): AbstractControl | null {
    return this.ngControl.control;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.options?.length) {
      this.applySelectedValue(this.control?.value);
    }
  }

  ngAfterViewInit(): void {
    this.matAutocomplete.panelClosingActions
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (!event?.source) {
          this.checkControlValue();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkControlValue(): void {
    const controlValue = this.control?.value;
    if (!controlValue) {
      return;
    }
    if (findOptionByValue(this.options, controlValue)) {
      return;
    }

    const matchedOption = findOptionByLabel(this.options, controlValue);

    if (matchedOption) {
      this.control.patchValue(matchedOption.value);
    } else {
      this.control.reset();
    }
  }

  private applySelectedValue = (value: any) => {
    const inputElement = this.elemRef.nativeElement as HTMLInputElement;
    inputElement.value = findOptionByValue(this.options, value)?.label ?? '';
  };
}
