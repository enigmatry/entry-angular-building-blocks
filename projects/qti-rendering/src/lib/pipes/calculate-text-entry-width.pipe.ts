import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateTextEntryWidth'
})
export class CalculateTextEntryWidthPipe implements PipeTransform {

  transform(value: string, placeHolderText: string, correctValue: string, minSize: number): number {
    const textWidth = this.measureWidth(value ?? '');
    const placeholderWidth = this.measureWidth(placeHolderText);
    const correctValueWidth = this.measureWidth(correctValue);
    return Math.max(textWidth, placeholderWidth, correctValueWidth, minSize);
  }

  measureWidth(text: string) {
    const dummy = document.createElement('div');
    dummy.innerText = text;
    dummy.style.position = 'absolute';
    dummy.style.visibility = 'hidden';
    document.body.insertBefore(dummy, document.body.firstChild);
    const measuredWidth = dummy.clientWidth;
    document.body.removeChild(dummy);
    return measuredWidth;
  }

}
