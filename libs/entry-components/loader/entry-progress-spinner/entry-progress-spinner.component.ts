import { Component, inject } from '@angular/core';
import { EntryLoadingService } from '../entry-loading.service';

@Component({
  selector: 'entry-progress-spinner',
  templateUrl: './entry-progress-spinner.component.html',
})
export class EntryProgressSpinnerComponent {
  loading$ = inject(EntryLoadingService).loading$;
}
