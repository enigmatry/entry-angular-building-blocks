import { Overlay, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy, Component, ElementRef, Input,
  OnDestroy,
  OnInit, TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SpinnerOverlayContainer } from '../spinner-overlay-container';

@Component({
  selector: 'entry-spinner',
  templateUrl: './entry-spinner.component.html',
  providers: [
    Overlay,
    {
      provide: OverlayContainer,
      useClass: SpinnerOverlayContainer
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntrySpinnerComponent implements OnInit, OnDestroy {

  @Input() color: ThemePalette = 'primary';
  @Input() diameter = 30;
  @Input() fullscreen = true;
  @Input() hasBackdrop = true;

  @ViewChild('matSpinner', { static: true }) private templateRef: TemplateRef<any>;
  private portalRef: TemplatePortal<any>;
  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private overlayContainer: OverlayContainer,
    private elementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    this.createOverlay();
    this.overlayRef.attach(this.portalRef);
  }

  ngOnDestroy(): void {
    this.disposeOverlayRef();
  }

  private createOverlay() {
    const overlayConfig = {
      hasBackdrop: this.hasBackdrop,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    };

    this.appendToContainer();
    this.overlayRef = this.overlay.create(overlayConfig);
    this.portalRef = new TemplatePortal(this.templateRef, this.viewContainerRef);
  }

  private appendToContainer() {
    // set container to component containing the <entry-spinner>
    const container = this.elementRef.nativeElement.parentElement;

    if (this.fullscreen) {
      // container = document.body;
    }

    (this.overlayContainer as SpinnerOverlayContainer)
      .setAppendTo(container, this.fullscreen);
  }

  private disposeOverlayRef() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    }
  }
}
