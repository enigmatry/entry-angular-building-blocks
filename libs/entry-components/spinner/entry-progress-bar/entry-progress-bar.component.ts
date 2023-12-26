import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { EntryLoadingService } from '../entry-loading.service';

@Component({
  selector: 'entry-progress-bar',
  templateUrl: './entry-progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryProgressBarComponent {
  loading$ = inject(EntryLoadingService).loading$;
}
