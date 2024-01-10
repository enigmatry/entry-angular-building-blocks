import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

/** Model used to populate select filter options. */
export interface SelectOption<T> {
  /** Key used as a value for selected option */
  key: T;
  /** String value used as display label of select option */
  label: string;
}

@Component({
  selector: 'entry-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class EntryTypeaheadComponent<T> implements OnInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() options: Observable<SelectOption<T>[]> = of([]);

  @Output() search = new EventEmitter<string>();

  searchField = new FormControl('');

  ngOnInit(): void {
    // TODO:
    this.searchField.valueChanges
      .pipe()
      .subscribe(value => this.search.emit(value));
  }
}
