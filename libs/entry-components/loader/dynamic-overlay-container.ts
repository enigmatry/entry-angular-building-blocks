import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';

export interface OverlayContainerOptions {
  fullscreen: boolean;
  offsetTop?: string;
  offsetLeft?: string;
}

@Injectable()
export class DynamicOverlayContainer extends OverlayContainer implements OnDestroy {

  private _appendTo: HTMLElement = this._document.body;
  private _options: OverlayContainerOptions;

  constructor(@Inject(DOCUMENT) document: Document, platform: Platform) {
    super(document, platform);
  }

  configureOverlayContainer(appendTo: HTMLElement, options: OverlayContainerOptions): void {
    this._appendTo = appendTo;
    this._options = options;
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
    const containerClass = 'cdk-overlay-container';
    const { fullscreen, offsetTop, offsetLeft } = this._options;

    const container = this._document.createElement('div');
    container.classList.add(containerClass);

    container.style.position = fullscreen ? 'fixed' : 'absolute';
    if (offsetTop) { container.style.top = offsetTop; }
    if (offsetLeft) { container.style.left = offsetLeft; }

    this._appendTo.appendChild(container);
    this._containerElement = container;
  }
}
