import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'entry-formly-date-time-picker',
  templateUrl: './formly-date-time-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyDateTimePickerComponent implements OnInit {

  formControl: FormControl;

  ngOnInit(): void {
  }

}
