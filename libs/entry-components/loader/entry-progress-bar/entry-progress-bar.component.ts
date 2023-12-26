import { Component, inject } from '@angular/core';
import { EntryLoadingService } from '../entry-loading.service';

@Component({
  selector: 'entry-progress-bar',
  templateUrl: './entry-progress-bar.component.html'
})
export class EntryProgressBarComponent {
  loading$ = inject(EntryLoadingService).loading$;
}