import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class SpinnerOverlayContainer extends OverlayContainer implements OnDestroy {

  private _appendTo: HTMLElement = this._document.body;
  private _options: { fullscreen: boolean };

  constructor(@Inject(DOCUMENT) document: Document, platform: Platform) {
    super(document, platform);
  }

  configure(appendTo: HTMLElement, options: { fullscreen: boolean }): void {
    this._appendTo = appendTo;
    this._options = options;
  }

  override getContainerElement(): HTMLElement {
    if (!this._containerElement) {
      this.createContainer();
    }
    return this._containerElement;
  }

  override ngOnDestroy() {
    this._containerElement?.remove();
  }

  private createContainer(): void {
    const containerClass = 'cdk-overlay-container';
    const { fullscreen } = this._options;

    const container = this._document.createElement('div');
    container.classList.add(containerClass);

    container.style.position = fullscreen ? 'fixed' : 'absolute';
    this._appendTo.appendChild(container);
    this._containerElement = container;
  }
}
