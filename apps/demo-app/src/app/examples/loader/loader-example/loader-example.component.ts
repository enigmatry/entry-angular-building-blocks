import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-loader-example',
  templateUrl: './loader-example.component.html',
  styleUrls: ['./loader-example.component.scss']
})
export class LoaderExampleComponent {
  loading = false;
  appendTo: 'container' | 'body' = 'container';
  color: ThemePalette = 'primary';
  hasBackdrop = true;

  showSpinner() {
    this.loading = true;
    timer(3000)
      .subscribe(_ => this.loading = false);
  }
}
