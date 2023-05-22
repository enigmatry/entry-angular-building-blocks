import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'entry-header',
  templateUrl: './entry-header.component.html',
  styleUrls: ['./entry-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryHeaderComponent {
  @Input() title: string;
}
