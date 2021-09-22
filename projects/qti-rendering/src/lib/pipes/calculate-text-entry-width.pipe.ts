import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateTextEntryWidth'
})
export class CalculateTextEntryWidthPipe implements PipeTransform {

  transform(value: string, placeHolderText: string, minSize: number): number {
    let text = value ?? '';
    if (placeHolderText) {
      text = placeHolderText.length > text.length ? placeHolderText : text;
    }
    const dummy = document.createElement('div');
    dummy.innerText = text;
    dummy.style.position = 'absolute';
    dummy.style.visibility = 'hidden';
    document.body.insertBefore(dummy, document.body.firstChild);
    const measuredWidth = dummy.clientWidth;
    document.body.removeChild(dummy);
    return measuredWidth < minSize ? minSize : measuredWidth;
  }

}
