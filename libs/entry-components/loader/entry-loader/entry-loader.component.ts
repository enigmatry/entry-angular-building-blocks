import { Overlay, OverlayConfig, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy, Component,
  ElementRef, Input, OnDestroy,
  OnInit, TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DynamicOverlayContainer } from '../dynamic-overlay-container';

@Component({
  selector: 'entry-loader',
  templateUrl: './entry-loader.component.html',
  providers: [
    Overlay,
    {
      provide: OverlayContainer,
      useClass: DynamicOverlayContainer
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryLoaderComponent implements OnInit, OnDestroy {

  @Input() color: ThemePalette = 'primary';
  @Input() diameter = 30;
  @Input() fullscreen = false;
  @Input() hasBackdrop = true;

  @ViewChild('matSpinner', { static: true })
  private templateRef: TemplateRef<any>;
  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private overlayContainer: OverlayContainer,
    private elementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    this.createOverlay();
    this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
  }

  ngOnDestroy(): void {
    this.disposeOverlayRef();
  }

  private createOverlay() {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: this.hasBackdrop,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
    this.configureOverlayContainer();
    this.overlayRef = this.overlay.create(overlayConfig);
  }

  private configureOverlayContainer() {
    let container = this.elementRef.nativeElement;
    if (this.fullscreen) {
      container = document.body;
    }
    (this.overlayContainer as DynamicOverlayContainer)
      .configureOverlayContainer(container, { fullscreen: this.fullscreen });
  }

  private disposeOverlayRef() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    }
  }
}
