import { Component, signal } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { timer } from 'rxjs';

@Component({
    selector: 'app-spinner-example',
    templateUrl: './spinner-example.component.html',
    standalone: false
})
export class SpinnerExampleComponent {
  readonly loading = signal(false);
  color: ThemePalette = 'primary';
  fullscreen = false;
  hasBackgroundOverlay = true;

  showSpinner() {
    this.loading.set(true);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    timer(3000).subscribe(_ => this.loading.set(false));
  }
}
