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
  @Input() hasBackdrop = true;
  @Input() appendTo: 'container' | 'body' | HTMLElement = 'container';

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

    this.appendToContainer(this.appendTo);
    this.overlayRef = this.overlay.create(overlayConfig);
    this.portalRef = new TemplatePortal(this.templateRef, this.viewContainerRef);
  }

  private appendToContainer(appendTo: 'container' | 'body' | HTMLElement) {
    let container: HTMLElement | undefined;

    if (appendTo === 'container') {
      // set container to component containing the <entry-spinner>
      container = this.elementRef.nativeElement.parentElement;
    } else if (appendTo === 'body') {
      // default cdk overlay container is body, no need to set it explicitly
      // container = document.body;
    }
    else if (appendTo instanceof HTMLElement) {
      container = appendTo;
    }

    (this.overlayContainer as SpinnerOverlayContainer)
      .setContainer(container);
  }

  private disposeOverlayRef() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    }
  }
}
