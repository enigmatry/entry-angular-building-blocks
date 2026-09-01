import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class SpinnerOverlayContainer extends OverlayContainer implements OnDestroy {
  private appendTo: HTMLElement = this._document.body;
  private options: { fullscreen: boolean } = { fullscreen: true };

  configure(appendTo: HTMLElement, options: { fullscreen: boolean }): void {
    this.appendTo = appendTo;
    this.options = options;
  }

  override getContainerElement(): HTMLElement {
    if (!this._containerElement) {
      this.createContainer();
    }
    const containerElement = this._containerElement;
    if (!containerElement) {
      throw new Error('Failed to create overlay container element.');
    }
    return containerElement;
  }

  override ngOnDestroy() {
    this._containerElement?.remove();
  }

  private createContainer(): void {
    const containerClass = 'cdk-overlay-container';
    const { fullscreen } = this.options;

    const container = this._document.createElement('div');
    container.classList.add(containerClass);

    container.style.position = fullscreen ? 'fixed' : 'absolute';
    this.appendTo.appendChild(container);
    this._containerElement = container;
  }
}
