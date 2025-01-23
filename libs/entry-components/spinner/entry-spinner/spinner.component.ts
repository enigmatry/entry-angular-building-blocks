import { Overlay, OverlayConfig, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy, Component,
  ElementRef, Input, OnDestroy,
  OnInit, TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SpinnerOverlayContainer } from '../spinner-overlay-container';

@Component({
    selector: 'entry-spinner',
    templateUrl: './spinner.component.html',
    providers: [
        Overlay,
        {
            provide: OverlayContainer,
            useClass: SpinnerOverlayContainer
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EntrySpinnerComponent implements OnInit, OnDestroy {

  @Input() color: ThemePalette = 'primary';
  @Input() diameter = 30;
  @Input() fullscreen = false;
  @Input() hasBackgroundOverlay = true;

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
      hasBackdrop: this.hasBackgroundOverlay,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
    this.configureOverlayContainer();
    this.overlayRef = this.overlay.create(overlayConfig);
  }

  private configureOverlayContainer() {
    let appendTo = this.elementRef.nativeElement;
    if (this.fullscreen) {
      appendTo = document.body;
    }
    (this.overlayContainer as SpinnerOverlayContainer)
      .configure(appendTo, { fullscreen: this.fullscreen });
  }

  private disposeOverlayRef() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    }
  }
}
