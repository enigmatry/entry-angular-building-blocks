import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUri'
})
export class SafeUriPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform = (value: string): SafeResourceUrl => this._sanitizer.bypassSecurityTrustResourceUrl(value);
}
