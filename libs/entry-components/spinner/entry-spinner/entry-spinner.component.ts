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
  @Input() fullscreen = false;
  @Input() hasBackdrop = true;
  @Input() appendTo: 'container' | 'body' = 'container';

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
    let container = this.elementRef.nativeElement;

    if (this.fullscreen && this.appendTo === 'body') {
      container = document.body;
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
