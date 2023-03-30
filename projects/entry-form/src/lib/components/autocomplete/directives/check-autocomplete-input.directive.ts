import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { SelectOption } from '../../../interfaces';

@Directive({
  selector: '[entryCheckAutocompleteInput]'
})
export class CheckAutocompleteInputDirective implements OnChanges {
  @Input() options: SelectOption[] = [];

  constructor(private ngControl: NgControl, private elemRef: ElementRef) { }

  get control(): AbstractControl | null {
    return this.ngControl.control;
  }

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

    const matchedOption = this.options
      .find(option => option.label.toLowerCase() === controlValue.toLowerCase());
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
