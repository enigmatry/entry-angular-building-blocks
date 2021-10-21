import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateInputWidth'
})
export class CalculateInputWidthPipe implements PipeTransform {

  transform(value: string, defaultMaxSize: number, maxSize: number, longestText: string): number {
    const dummy = document.createElement('div');
    dummy.innerText = (!value) ? longestText : value;
    dummy.style.position = 'absolute';
    dummy.style.visibility = 'hidden';
    dummy.style.width = 'fit-content';
    document.body.insertBefore(dummy, document.body.firstChild);
    const measuredWidth = dummy.clientWidth + 12;
    document.body.removeChild(dummy);
    return (!value) ? Math.min(measuredWidth, defaultMaxSize) :  Math.min(measuredWidth, maxSize);
  }
}
