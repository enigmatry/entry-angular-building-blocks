import { Directive, HostListener, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const buttons = 'button[type=submit],button[entry-submit-button]';

@Directive({
  selector: buttons,
  standalone: true
})
export class PreventMultipleClicksDirective implements OnDestroy {

  private _disabled = false;
  private _debounceTime = 1000; // 1000ms = one second
  private _clicks = new Subject<void>();
  private _subscription: Subscription;

  constructor() {
    // Enable after debounceTime has passed since last click
    this._subscription = this._clicks
      .pipe(
        debounceTime(this._debounceTime)
      ).subscribe(() => {
        this._disabled = false;
      });
  }

  @HostListener('click', ['$event'])
  clickListener(event: Event): void {
    this._clicks.next();

    if (this._disabled) {
      // When disabled, cancel the click event
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    } else {
      // When enabled, disable for subsequent clicks
      this._disabled = true;
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
