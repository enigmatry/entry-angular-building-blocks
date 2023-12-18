import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Subject, combineLatest } from 'rxjs';
import { EntryLoadingService } from '../entry-loading.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'entry-spinner',
  templateUrl: './entry-spinner.component.html'
})
export class EntrySpinnerComponent implements OnDestroy, OnInit {

  @Input() color: ThemePalette = 'primary';
  @Input() diameter = 20;
  @Input() backdropEnabled = true;

  @ViewChild('spinnerRef', { static: true })
  private spinnerRef: TemplateRef<any>;

  private overlayRef: OverlayRef = this.createOverlay();

  private _destroy$ = new Subject<void>();

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private loadingService: EntryLoadingService) {
  }

  ngOnInit(): void {
    combineLatest({
      enabled: this.loadingService.enabled$,
      loading: this.loadingService.loading$
    }).pipe(
      takeUntil(this._destroy$)
    ).subscribe(({ enabled, loading }) => {
      if (enabled && loading) {
        this.showSpinner();
      } else {
        this.hideSpinner();
      }
    });
  }

  showSpinner() {
    this.overlayRef.attach(new TemplatePortal(this.spinnerRef, this.viewContainerRef));
  }

  hideSpinner() {
    this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private createOverlay() {
    return this.overlay.create({
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true
    });
  }
}
