import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { CorrectStatus } from '../models/correct-status.enum';

@Component({
  selector: 'enigmatry-qti-feedback',
  templateUrl: './qti-feedback.component.html',
  styleUrls: ['./qti-feedback.component.scss']
})
export class QtiFeedbackComponent implements OnInit {

  @Input()
  get content(): string { return this._content.value; }
  set content(content: string) {
    this._content.next(content);
  }
  private _content = new BehaviorSubject<string>(null);

  @Input() correctStatus: CorrectStatus;

  constructor(private elementRef: ElementRef<Element>) { }

  get incorrect(): boolean {
    return this.correctStatus === CorrectStatus.Incorrect;
  }

  get correct(): boolean {
    return this.correctStatus === CorrectStatus.Correct;
  }

  get title(): string {
    switch (this.correctStatus) {
      case CorrectStatus.Correct:
        return 'Correct!';
      case CorrectStatus.PartiallyCorrect:
        return 'Bijna goed';
      case CorrectStatus.Incorrect:
        return 'Helaas...';
      default: return '';
    }
  }

  get hasCorrectStatus(): boolean {
    return Boolean(this.correctStatus);
  }

  ngOnInit(): void {
    this._content.pipe(debounceTime(100), tap(() => this.scrollIntoView()))
      .subscribe();
  }

  scrollIntoView() {
    if (this.hasCorrectStatus) {
      this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
