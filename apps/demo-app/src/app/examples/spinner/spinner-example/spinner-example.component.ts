import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { EntryButtonDirective } from '@enigmatry/entry-components/button';
import { EntrySpinnerComponent } from '@enigmatry/entry-components/spinner';
import { timer } from 'rxjs';

@Component({
    selector: 'app-spinner-example',
    templateUrl: './spinner-example.component.html',
    imports: [EntrySpinnerComponent, MatRadioGroup, MatRadioButton, MatButton, EntryButtonDirective]
})
export class SpinnerExampleComponent {
  readonly loading = signal(false);
  readonly color = signal<ThemePalette>('primary');
  readonly fullscreen = signal(false);
  readonly hasBackgroundOverlay = signal(true);

  showSpinner() {
    this.loading.set(true);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    timer(3000).subscribe(_ => this.loading.set(false));
  }
}
