import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class SpinnerOverlayContainer extends OverlayContainer implements OnDestroy {

  private keepContainerElement = false;

  constructor(@Inject(DOCUMENT) document: Document, platform: Platform) {
    super(document, platform);
  }

  setContainer(element: HTMLElement): void {
    this._containerElement = element;
    this.keepContainerElement = true;
  }

  ngOnDestroy(): void {
    // Overriding default destroy to prevent unwanted cleanup
    if (!this.keepContainerElement) {
      super.ngOnDestroy();
    }
  }
}
