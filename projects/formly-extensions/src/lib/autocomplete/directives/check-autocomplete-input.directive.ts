import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { SelectOption } from '../select-option';

@Directive({
  selector: '[enigmatryCheckAutocompleteInput]'
})
export class CheckAutocompleteInputDirective {
  @Input() options: SelectOption[] = [];

  get control(): AbstractControl | null {
    return this.ngControl.control;
  }

  constructor(private ngControl: NgControl) { }

  @HostListener('blur') onBlur() {
    this.checkControlValue();
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
}
