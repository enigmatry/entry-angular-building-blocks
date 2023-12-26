import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class SpinnerOverlayContainer extends OverlayContainer implements OnDestroy {

  private _appendToElement: HTMLElement = this._document.body;
  private _fullscreen = false;

  constructor(@Inject(DOCUMENT) document: Document, platform: Platform) {
    super(document, platform);
  }

  setAppendTo(element: HTMLElement, fullscreen: boolean): void {
    this._appendToElement = element;
    this._fullscreen = fullscreen;
  }

  getContainerElement(): HTMLElement {
    if (!this._containerElement) {
      this.createContainer();
    }
    return this._containerElement;
  }

  ngOnDestroy() {
    this._containerElement?.remove();
  }

  private createContainer(): void {
    const containerClass = ['cdk-overlay-container', 'entry-spinner-overlay-container'];
    const position = this._fullscreen ? 'fixed' : 'absolute';

    const container = this._document.createElement('div');
    container.classList.add(...containerClass);
    container.style.position = position;

    this._appendToElement.appendChild(container);
    this._containerElement = container;
  }
}
