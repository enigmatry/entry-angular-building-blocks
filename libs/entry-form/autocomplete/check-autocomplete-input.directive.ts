import { AfterViewInit, DestroyRef, Directive, ElementRef, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, NgControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { findOptionByLabel, findOptionByValue } from './select-configuration.interface';
import { SelectOption } from './select-option.model';

@Directive({
    selector: '[entryCheckAutocompleteInput]',
    standalone: false
})
export class CheckAutocompleteInputDirective implements OnChanges, AfterViewInit {
  readonly options = input<SelectOption[]>([]);

  private readonly matAutocomplete = inject(MatAutocompleteTrigger, { host: true, self: true });
  private readonly ngControl = inject(NgControl);
  private readonly elemRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  get control(): AbstractControl | null {
    return this.ngControl.control;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.options()?.length) {
      this.applySelectedValue(this.control?.value);
    }
  }

  ngAfterViewInit(): void {
    this.matAutocomplete.panelClosingActions
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (!event?.source) {
          this.checkControlValue();
        }
      });
  }

  private checkControlValue(): void {
    const controlValue = this.control?.value;
    if (!controlValue) {
      return;
    }
    if (findOptionByValue(this.options(), controlValue)) {
      return;
    }

    const matchedOption = findOptionByLabel(this.options(), controlValue);

    if (matchedOption) {
      this.control.patchValue(matchedOption.value);
    } else {
      this.control.reset();
    }
  }

  private applySelectedValue = (value: any) => {
    const inputElement = this.elemRef.nativeElement as HTMLInputElement;
    inputElement.value = findOptionByValue(this.options(), value)?.label ?? '';
  };
}
