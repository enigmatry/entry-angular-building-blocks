import { Component, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss']
})
export class FormExampleComponent implements OnDestroy {
  saving: boolean;

  requiredFields = {
    name: () => true,
    type: () => true
  };

  private destroy$ = new Subject<void>();

  onSubmitClick() {
    console.log('onClick triggered');
  }

  onSave() {
    console.log('onSave triggered');

    this.saving = true;
    timer(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.saving = false;
        console.log('save completed');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
