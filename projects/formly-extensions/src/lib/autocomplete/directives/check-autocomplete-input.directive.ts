import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { SelectOption } from '../select-option';

@Directive({
  selector: '[enigmatryCheckAutocompleteInput]'
})
export class CheckAutocompleteInputDirective implements OnChanges {
  @Input() options: SelectOption[] = [];

  get control(): AbstractControl | null {
    return this.ngControl.control;
  }

  constructor(private ngControl: NgControl, private elemRef: ElementRef) { }

  @HostListener('blur') onBlur() {
    this.checkControlValue();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.options?.length) {
      this.applySelectedValue(this.control.value);
    }
  }

  private checkControlValue(): void {
    const controlValue = this.control?.value;
    if (!controlValue) {
      return;
    }
    if (this.options.find(option => option.value === controlValue)) {
      return;
    }

    const matchedOption = this.options.find(option => option.label === controlValue);
    if (matchedOption) {
      this.control.patchValue(matchedOption.value);
    } else {
      this.control.patchValue('');
    }
  }

  private applySelectedValue = (value: any) => {
    const inputElement = this.elemRef.nativeElement as HTMLInputElement;
    inputElement.value = this.options.find(option => option.value === value)?.label ?? '';
  };
}
