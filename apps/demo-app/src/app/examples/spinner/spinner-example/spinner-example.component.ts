import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { timer } from 'rxjs';

@Component({
    selector: 'app-spinner-example',
    templateUrl: './spinner-example.component.html',
    standalone: false
})
export class SpinnerExampleComponent {
  loading = false;
  color: ThemePalette = 'primary';
  fullscreen = false;
  hasBackgroundOverlay = true;

  showSpinner() {
    this.loading = true;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    timer(3000).subscribe(_ => this.loading = false);
  }
}
