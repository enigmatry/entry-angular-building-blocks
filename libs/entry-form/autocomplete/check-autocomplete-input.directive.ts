import { AfterViewInit, Directive, ElementRef, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectOption } from './select-configuration.interface';

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
    if (this.options.find(option => option.value === controlValue)) {
      return;
    }

    const matchedOption = this.options
      .find(option => option.label.toLowerCase() === controlValue.toLowerCase());

    if (matchedOption) {
      this.control.patchValue(matchedOption.value);
    } else {
      this.control.reset();
    }
  }

  private applySelectedValue = (value: any) => {
    const inputElement = this.elemRef.nativeElement as HTMLInputElement;
    inputElement.value = this.options.find(option => option.value === value)?.label ?? '';
  };
}
