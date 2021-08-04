import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MEDIA_SRC_PROVIDER } from '../constants';
import { QtiElement } from '../qti-element';
import { MediaSrcProvider } from '../services/media-src-provider.service';

@Component({
  templateUrl: './qti-item-body.component.html',
  styleUrls: ['./qti-item-body.component.scss']
})
export class QtiItemBodyComponent extends QtiElement implements OnInit {

  constructor(@Inject(MEDIA_SRC_PROVIDER) private mediaSrcProvider: MediaSrcProvider, elementRef: ElementRef<Element>) {
    super(elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const mediaFiles = this.querySelectorAll('img, source');
    mediaFiles.forEach(img => {
      const relativePath = img.getAttribute('src');
      img.removeAttribute('src');
      this.mediaSrcProvider.getSrc(relativePath, '').subscribe((newSrc) => {
        img.setAttribute('src', newSrc);
      });
    });
  }

}
