import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-loader-example',
  templateUrl: './loader-example.component.html'
})
export class LoaderExampleComponent {
  loading = false;
  color: ThemePalette = 'primary';
  fullscreen = false;
  hasBackdrop = true;

  showLoader() {
    this.loading = true;
    timer(3000).subscribe(_ => this.loading = false);
  }
}
