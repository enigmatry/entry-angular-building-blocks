import { Overlay, OverlayConfig, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit, ChangeDetectionStrategy, Component,
  ElementRef, inject, input, OnDestroy,
  TemplateRef, viewChild, ViewContainerRef
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SpinnerOverlayContainer } from '../spinner-overlay-container';

const DEFAULT_DIAMETER = 30;

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
export class EntrySpinnerComponent implements AfterViewInit, OnDestroy {
  readonly color = input<ThemePalette>('primary');
  readonly diameter = input(DEFAULT_DIAMETER);
  readonly fullscreen = input(false);
  readonly hasBackgroundOverlay = input(true);

  private readonly templateRef = viewChild.required<TemplateRef<unknown>>('matSpinner');
  private overlayRef: OverlayRef;

  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly overlayContainer = inject(OverlayContainer);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // Signal queries have no `static` option, so the template ref is not readable in ngOnInit as it
  // was with `@ViewChild(..., { static: true })`. The overlay is created one hook later instead.
  ngAfterViewInit(): void {
    this.createOverlay();
    this.overlayRef.attach(new TemplatePortal(this.templateRef(), this.viewContainerRef));
  }

  ngOnDestroy(): void {
    this.disposeOverlayRef();
  }

  private readonly createOverlay = (): void => {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: this.hasBackgroundOverlay(),
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
    this.configureOverlayContainer();
    this.overlayRef = this.overlay.create(overlayConfig);
  };

  private readonly configureOverlayContainer = (): void => {
    let appendTo = this.elementRef.nativeElement;
    if (this.fullscreen()) {
      appendTo = document.body;
    }
    (this.overlayContainer as SpinnerOverlayContainer)
      .configure(appendTo, { fullscreen: this.fullscreen() });
  };

  private readonly disposeOverlayRef = (): void => {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    }
  };
}
