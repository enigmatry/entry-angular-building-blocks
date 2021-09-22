import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateInputWidth'
})
export class CalculateInputWidthPipe implements PipeTransform {

  transform(value: string, defaultSize: number, maxSize: number, longestText: string): number {
    let text = value;
    if (!value) {
      text = longestText;
    }
    const dummy = document.createElement('div');
    dummy.innerText = text;
    dummy.style.position = 'absolute';
    dummy.style.visibility = 'hidden';
    document.body.insertBefore(dummy, document.body.firstChild);
    const measuredWidth = dummy.clientWidth;
    document.body.removeChild(dummy);
    if (!value) {
      return Math.min(measuredWidth + 50, defaultSize);
    } else {
      return Math.min(measuredWidth + 50, maxSize)
    }
  }

}
