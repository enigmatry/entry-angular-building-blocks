import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * A component used to display generic (form level) server side validation messages.
 * The messages are displayed as a list, each message in a new row.
 *
 * @example
 * ```html
 * <entry-form-errors [form]="myForm">
 * </entry-form-errors>
 * ```
 */
@Component({
    selector: 'entry-form-errors',
    template: `
    @if (form.errors) {
      <div>
        @for (error of form.errors['general']; track error) {
          <mat-error>
            <span class="mat-body-2">{{error}}</span>
          </mat-error>
        }
      </div>
    }
  `,
    standalone: false
})
export class EntryFormErrorsComponent implements OnChanges, OnDestroy {
  /** A form group for which the validation errors are being displayed. */
  @Input() form: UntypedFormGroup;

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private statusSubscription: Subscription | undefined;

  ngOnChanges(): void {
    this.statusSubscription?.unsubscribe();

    // `setServerSideValidationErrors` mutates the form in place, so the bound reference never
    // changes and no event in this template ever marks this component dirty. Angular 22 made
    // OnPush the default, so without this nothing re-renders the messages once they arrive.
    // Marking on every status emission is deliberate: the status frequently repeats the same
    // value ('INVALID' -> 'INVALID') while the error payload underneath changes, so anything
    // that compares values would go stale after the first message.
    this.statusSubscription = this.form?.statusChanges
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  ngOnDestroy(): void {
    this.statusSubscription?.unsubscribe();
  }
}
